import { Image, Text, View } from "react-native";
import { normalize } from "@/helpers/useScaling";

type TicketHeaderProps = {
  type: "departing" | "return";
  departure: string;
  arrival: string;
  date: string;
};

export function TicketHeader({
  type,
  departure,
  arrival,
  date,
}: TicketHeaderProps) {
  return (
    <View style={{ marginHorizontal: 20, marginVertical: normalize(32) }}>
      <Text
        style={{
          fontSize: normalize(24),
          color: "rgba(68, 74, 84, 0.74)",
          marginBottom: normalize(32),
        }}
      >
        Select {type} service
      </Text>
      <View
        style={{
          flexDirection: "row",
          marginBottom: normalize(8),
          alignItems: "center",
        }}
      >
        <Image
          source={require("@/assets/images/plane-jade.png")}
          style={{ marginRight: 16 }}
        />
        <Text style={{ fontSize: normalize(16) }}>
          {departure} to {arrival}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={require("@/assets/images/calendar-jade.png")}
          style={{ marginRight: 16 }}
        />
        <Text style={{ fontSize: normalize(16) }}>{date}</Text>
      </View>
    </View>
  );
}
