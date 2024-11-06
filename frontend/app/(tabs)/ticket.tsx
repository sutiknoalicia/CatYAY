import { TicketCard } from "@/views/ticketing/TicketCard";
import { View } from "react-native";

export default function TicketScreen() {
  const flightTicket = {
    transportType: "plane" as "plane",
    identifier: "CX 5624",
    duration: "5h",
    departureTime: "10:01",
    departureLocation: "CGK",
    arrivalTime: "15:01",
    arrivalLocation: "HKG",
    carbonEmissions: 8,
    class: "Economy",
    currency: "IDR",
    price: 160000.0,
    onSelect: () => console.log("Flight selected"),
    onViewDetails: () => console.log("Flight details viewed"),
  };

  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 100,
        flex: 1,
        backgroundColor: "#fff",
        gap: 20,
      }}
    >
      <TicketCard {...flightTicket} />
    </View>
  );
}
