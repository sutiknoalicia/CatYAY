import { TicketCard } from "@/views/ticketing/TicketCard";
import { TransportFilters } from "@/views/ticketing/TransportFilters";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { useState } from "react";
import { TicketSorting } from "@/views/ticketing/TicketSorting";
import { TicketHeader } from "@/views/ticketing/TicketHeader";
import { normalize } from "@/helpers/useScaling";
import { router } from "expo-router";

export default function TicketScreen() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isPriceSorted, setIsPriceSorted] = useState(false);

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
      price: 260000.0,
      onSelect: () => router.push("/(ticket)/journey"),
      onViewDetails: () => console.log("Flight details viewed"),
    },
    {
      transportType: "plane" as "plane",
      identifier: "CX 5624",
      duration: "5h",
      departureTime: "12:01",
      departureLocation: "CGK",
      arrivalTime: "16:01",
      arrivalLocation: "HKG",
      carbonEmissions: 8,
      class: "Economy",
      currency: "IDR",
      price: 190000.0,
      onSelect: () => router.push("/(ticket)/journey"),
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

  const handlePriceSort = () => {
    setIsPriceSorted(!isPriceSorted);
  };

  const filteredTickets = allTickets
    .filter((ticket) => {
      if (selectedFilter === "all") {
        return true;
      }
      return ticket.transportType === filterToTransportType[selectedFilter];
    })
    .sort((a, b) => {
      if (isPriceSorted) {
        return a.price - b.price;
      }
      return 0;
    });

  const ticketCounts = allTickets.reduce((acc, ticket) => {
    acc[ticket.transportType] = (acc[ticket.transportType] || 0) + 1;
    acc.total = (acc.total || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getDisplayCount = (filterId: string) => {
    if (filterId === "all") {
      return ticketCounts.total || 0;
    }
    const transportType = filterToTransportType[filterId];
    return ticketCounts[transportType] || 0;
  };

  const handleFilterSelect = (filterId: string) => {
    setSelectedFilter(filterId);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#F8F7F7", flex: 1 }}>
      <ScrollView style={{ paddingTop: 16 }}>
        <TicketHeader
          type="departing"
          departure="Hong Kong"
          arrival="Shenzhen"
          date="Fri 01 Nov 2024"
        />
        <TicketSorting
          isPriceSorted={isPriceSorted}
          onPriceSort={handlePriceSort}
        />
        <Text
          style={{
            marginBottom: normalize(20),
            paddingHorizontal: 20,
            fontWeight: "300",
            fontSize: normalize(14),
          }}
        >
          Price displayed is the fare per adult including taxes/fees/charges.
        </Text>
        <View>
          <TransportFilters
            filters={transportFilters}
            onFilterSelect={handleFilterSelect}
          />
          <View style={{ paddingVertical: normalize(16) }}>
            <Text
              style={{
                marginBottom: 12,
                fontWeight: "300",
                paddingHorizontal: 20,
                fontSize: normalize(14), // Added normalize
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: normalize(14), // Added normalize
                }}
              >
                {getDisplayCount(selectedFilter)}
              </Text>
              {` ${
                selectedFilter === "all"
                  ? getDisplayCount(selectedFilter) === 1
                    ? "ticket"
                    : "tickets"
                  : selectedFilter === "rail"
                  ? getDisplayCount(selectedFilter) === 1
                    ? "high speed rail"
                    : "high speed rails"
                  : selectedFilter === "bus"
                  ? getDisplayCount(selectedFilter) === 1
                    ? "bus"
                    : "buses"
                  : selectedFilter === "ferry"
                  ? getDisplayCount(selectedFilter) === 1
                    ? "ferry"
                    : "ferries"
                  : getDisplayCount(selectedFilter) === 1
                  ? selectedFilter
                  : `${selectedFilter}s`
              } found`}
            </Text>

            {filteredTickets.map((ticket, index) => (
              <TicketCard
                key={index}
                {...ticket}
                variant="ticket"
                style={{ marginHorizontal: 20, marginBottom: 16 }}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
