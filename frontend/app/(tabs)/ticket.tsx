import { TicketCard } from "@/views/ticketing/TicketCard";
import { TransportFilters } from "@/views/ticketing/TransportFilters";
import { SafeAreaView, View, Text } from "react-native";
import { useState } from "react";

export default function TicketScreen() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const allTickets = [
    {
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
    },
  ];

  const transportFilters = [
    { id: "all", name: "All" },
    { id: "ferry", name: "Ferry" },
    { id: "rail", name: "High Speed Rail" },
    { id: "bus", name: "Bus + MTR" },
    { id: "flight", name: "Flight" },
    { id: "train", name: "Train" },
  ];

  const filterToTransportType: Record<string, string> = {
    ferry: "ferry",
    rail: "rail",
    bus: "bus",
    flight: "plane",
    train: "train",
  };

  const handleFilterSelect = (filterId: string) => {
    setSelectedFilter(filterId);
  };

  const filteredTickets = allTickets.filter((ticket) => {
    if (selectedFilter === "all") {
      return true;
    }
    return ticket.transportType === filterToTransportType[selectedFilter];
  });

  return (
    <SafeAreaView style={{ backgroundColor: "#F8F7F7", flex: 1 }}>
      <View style={{ paddingTop: 12 }}>
        <TransportFilters
          filters={transportFilters}
          onFilterSelect={handleFilterSelect}
        />
        <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
          {filteredTickets.map((ticket, index) => (
            <TicketCard key={index} {...ticket} />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
