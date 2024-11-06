import { Image, Text, View } from "react-native";
import { normalize } from "@/helpers/useScaling";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

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
        <Ionicons
          name="airplane-sharp"
          size={normalize(20)}
          color="#006564"
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
        <FontAwesome
          name="calendar"
          size={normalize(20)}
          color="#006564"
          style={{ marginRight: 16 }}
        />
        <Text style={{ fontSize: normalize(16) }}>{date}</Text>
      </View>
    </View>
  );
}
