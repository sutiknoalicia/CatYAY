import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";
import { FontFamilies } from "@/helpers/FontFamiles";
import { normalize } from "@/helpers/useScaling";

type TicketCardProps = {
  transportType: "plane" | "ferry" | "train";
  identifier: string;
  duration: string;
  departureTime: string;
  departureLocation: string;
  arrivalTime: string;
  arrivalLocation: string;
  carbonEmissions: number;
  class: string;
  currency: string;
  price: number;
  onSelect?: () => void;
  onViewDetails?: () => void;
  style?: StyleProp<ViewStyle>;
  variant?: "journey" | "ticket";
};

export function TicketCard({
  transportType,
  identifier,
  duration,
  departureTime,
  departureLocation,
  arrivalTime,
  arrivalLocation,
  carbonEmissions,
  class: transportClass,
  currency,
  price,
  onSelect,
  onViewDetails,
  style,
  variant = "ticket",
}: TicketCardProps) {
  const getJourneyImage = (type: any) => {
    switch (type) {
      case "flight":
        return require("@/assets/images/plane-journey.png");
      case "ferry":
        return require("@/assets/images/ferry-journey.png");
      case "train":
        return require("@/assets/images/train-journey.png");
      default:
        return require("@/assets/images/plane-journey.png");
    }
  };

  return (
    <View
      style={[
        {
          flexDirection: "row",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 20,
        },
        style,
      ]}
    >
      <View
        style={{
          flex: 7,
          backgroundColor: "#fff",
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
          paddingVertical: 8,
          paddingHorizontal: 20,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              color: "rgba(68, 74, 84, 0.8)",
              fontSize: normalize(10),
              alignItems: "flex-start",
            }}
          >
            {identifier}
          </Text>
          <Text
            style={{
              color: "rgba(68, 74, 84, 0.8)",
              fontSize: normalize(10),
              alignItems: "flex-end",
            }}
          >
            {duration}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 20,
          }}
        >
          <View>
            <Text style={{ fontSize: normalize(18), marginBottom: 4 }}>
              {departureTime}
            </Text>
            <Text
              style={{
                fontSize: normalize(18),
                color: "#006564",
                fontFamily: FontFamilies.GTWalsheimBold,
              }}
            >
              {departureLocation}
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Image source={getJourneyImage(transportType)} />
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={{ fontSize: normalize(18), marginBottom: 4 }}>
              {arrivalTime}
            </Text>
            <Text
              style={{
                fontSize: normalize(18),
                color: "#006564",
                fontFamily: FontFamilies.GTWalsheimBold,
              }}
            >
              {arrivalLocation}
            </Text>
          </View>
        </View>
        <View>
          <Text style={{ color: "#5E967E", fontSize: normalize(10) }}>
            Carbon emissions: {carbonEmissions}kg C
            <Text>
              O
              <Text
                style={{ fontSize: normalize(8), lineHeight: normalize(8) }}
              >
                2
              </Text>
            </Text>
          </Text>
          <TouchableOpacity
            style={{ flexDirection: "row", gap: 4 }}
            onPress={onViewDetails}
          >
            <Text
              style={{
                color: "#116F9A",
                fontSize: normalize(10),
                fontWeight: "bold",
              }}
            >
              View Details
            </Text>
            <Image
              source={require("@/assets/images/chevron-up.png")}
              style={{
                justifyContent: "center",
                width: normalize(16),
                height: normalize(16),
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flex: 3,
          backgroundColor: "#006564",
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
          paddingVertical: variant === "journey" ? 8 : 16,
          paddingHorizontal: 8,
          justifyContent: variant === "journey" ? "center" : "space-between",
          alignItems: "center",
          gap: variant === "journey" ? 4 : 8,
        }}
      >
        <Text style={{ color: "#E6E7E8", fontSize: normalize(8) }}>
          {transportClass}
        </Text>
        {variant === "ticket" && (
          <Text style={{ color: "#E6E7E8", fontSize: normalize(10) }}>
            From
          </Text>
        )}
        <Text style={{ color: "#fff", fontSize: normalize(12) }}>
          {currency}
        </Text>
        <Text
          style={{
            color: "#fff",
            fontSize: normalize(14),
            fontWeight: "bold",
            textAlign: "center",
            paddingHorizontal: 4,
          }}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          +{price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </Text>
        {variant === "ticket" && (
          <TouchableOpacity
            style={{
              borderRadius: 4,
              borderWidth: 0.75,
              borderColor: "#fff",
              paddingHorizontal: 16,
              paddingVertical: 8,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={onSelect}
          >
            <Text style={{ fontSize: normalize(10), color: "#fff" }}>
              Select
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
