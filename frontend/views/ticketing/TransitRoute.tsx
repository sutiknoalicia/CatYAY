// TransitRoute.tsx
import { FontFamilies } from "@/helpers/FontFamiles";
import React from "react";
import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  StyleSheet,
} from "react-native";

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
  const getTransportImage = (type: TransportType): ImageSourcePropType => {
    switch (type) {
      case "flight":
        return require("@/assets/images/plane-grey.png");
      case "ferry":
        return require("@/assets/images/ferry-grey.png");
      case "train":
        return require("@/assets/images/train-grey.png");
      case "bus":
        return require("@/assets/images/bus-grey.png");
      default:
        return require("@/assets/images/circle-grey.png");
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
                  <Image
                    source={require("@/assets/images/pin-grey.png")}
                    style={styles.icon}
                  />
                ) : (
                  <Image
                    source={getTransportImage(transits[index].transportType)}
                    style={styles.icon}
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
    width: 40,
    alignItems: "center",
  },
  icon: {
    width: 40,
    height: 40,
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
    width: 40,
    alignItems: "center",
  },
  text: {
    fontFamily: FontFamilies.GTWalsheimBold,
    color: "#E5E6E7",
    fontSize: 16,
    textAlign: "center",
  },
});
