import { TicketCard } from "@/components/TicketCard";
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

  const trainTicket = {
    transportType: "train" as "train",
    identifier: "TR 203",
    duration: "2h 30m",
    departureTime: "09:00",
    departureLocation: "LDN",
    arrivalTime: "11:30",
    arrivalLocation: "MNC",
    carbonEmissions: 2,
    class: "Standard",
    currency: "IDR",
    price: 75000.0,
    onSelect: () => console.log("Train selected"),
    onViewDetails: () => console.log("Train details viewed"),
  };

  const ferryTicket = {
    transportType: "ferry" as "ferry",
    identifier: "FR 108",
    duration: "45m",
    departureTime: "14:00",
    departureLocation: "HKI",
    arrivalTime: "14:45",
    arrivalLocation: "MCU",
    carbonEmissions: 5,
    class: "Standard",
    currency: "IDR",
    price: 50000.0,
    onSelect: () => console.log("Ferry selected"),
    onViewDetails: () => console.log("Ferry details viewed"),
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
      <TicketCard {...trainTicket} />
      <TicketCard {...ferryTicket} />
    </View>
  );
}
