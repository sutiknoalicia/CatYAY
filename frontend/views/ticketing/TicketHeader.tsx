// TicketHeader.tsx
import { Image, Text, View } from "react-native";

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
    <View style={{ marginHorizontal: 20, marginVertical: 32 }}>
      <Text
        style={{
          fontSize: 24,
          color: "rgba(68, 74, 84, 0.74)",
          marginBottom: 32,
        }}
      >
        Select {type} service
      </Text>
      <View
        style={{
          flexDirection: "row",
          marginBottom: 8,
          alignItems: "center",
        }}
      >
        <Image
          source={require("@/assets/images/plane-jade.png")}
          style={{ marginRight: 16 }}
        />
        <Text style={{ fontSize: 16 }}>
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
        <Text style={{ fontSize: 16 }}>{date}</Text>
      </View>
    </View>
  );
}
