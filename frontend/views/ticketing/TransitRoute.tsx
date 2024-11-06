import { FontFamilies } from "@/helpers/FontFamiles";
import { normalize } from "@/helpers/useScaling";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

type TransportType = "flight" | "ferry" | "train" | "bus";

type Transit = {
  from: string;
  to: string;
  transportType: TransportType;
};

type TransitRouteProps = {
  transits: Transit[];
};

export function TransitRoute({ transits }: TransitRouteProps) {
  const getTransportIcon = (type: TransportType): string => {
    switch (type) {
      case "flight":
        return "airplane-sharp";
      case "ferry":
        return "boat";
      case "train":
        return "train";
      case "bus":
        return "bus";
      default:
        return "ellipse";
    }
  };

  const locations = transits.reduce((acc: string[], transit, index) => {
    if (index === 0) {
      acc.push(transit.from);
    }
    acc.push(transit.to);
    return acc;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.routeContainer}>
        <View style={styles.iconsRow}>
          {locations.map((_, index) => (
            <React.Fragment key={`transport-${index}`}>
              <View style={styles.iconWrapper}>
                {index === locations.length - 1 ? (
                  <Ionicons name="pin" size={normalize(36)} color="#E5E6E7" />
                ) : (
                  <Ionicons
                    name={getTransportIcon(transits[index].transportType)}
                    size={normalize(36)}
                    color="#E5E6E7"
                  />
                )}
              </View>
              {index < locations.length - 1 && <View style={styles.line} />}
            </React.Fragment>
          ))}
        </View>

        <View style={styles.textRow}>
          {locations.map((location, index) => (
            <View key={`location-${index}`} style={styles.textWrapper}>
              <Text style={styles.text}>{location}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  routeContainer: {
    flexDirection: "column",
  },
  iconsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  iconWrapper: {
    width: normalize(36),
    alignItems: "center",
  },
  line: {
    flex: 1,
    height: 3,
    backgroundColor: "#E5E6E7",
  },
  textRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  textWrapper: {
    width: normalize(36),
    alignItems: "center",
  },
  text: {
    fontFamily: FontFamilies.GTWalsheimBold,
    color: "#E5E6E7",
    fontSize: normalize(14),
    textAlign: "center",
  },
});
