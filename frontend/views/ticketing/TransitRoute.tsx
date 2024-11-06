// TransitRoute.tsx
import { FontFamilies } from "@/helpers/FontFamiles";
import React from "react";
import { View, Text, Image, ImageSourcePropType } from "react-native";

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

  // Create an array of all unique locations in order
  const locations = transits.reduce((acc: string[], transit, index) => {
    if (index === 0) {
      acc.push(transit.from);
    }
    acc.push(transit.to);
    return acc;
  }, []);

  return (
    <View style={{ marginVertical: 20 }}>
      <View style={{ flexDirection: "column", paddingHorizontal: 16 }}>
        {/* Icons and Lines */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
          }}
        >
          {locations.map((_, index) => (
            <React.Fragment key={`transport-${index}`}>
              <View style={{ width: 40, alignItems: "center" }}>
                {index === locations.length - 1 ? (
                  <Image
                    source={require("@/assets/images/pin-grey.png")}
                    style={{ width: 40, height: 40 }}
                  />
                ) : (
                  <Image
                    source={getTransportImage(transits[index].transportType)}
                    style={{ width: 40, height: 40 }}
                  />
                )}
              </View>
              {index < locations.length - 1 && (
                <View
                  style={{
                    flex: 1,
                    height: 3,
                    backgroundColor: "#E5E6E7",
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </View>

        {/* Text Labels */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 8,
          }}
        >
          {locations.map((location, index) => (
            <Text
              key={`location-${index}`}
              style={{
                fontFamily: FontFamilies.GTWalsheimBold,
                color: "#E5E6E7",
                fontSize: 16,
              }}
            >
              {location}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}
