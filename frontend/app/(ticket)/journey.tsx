import { FontFamilies } from "@/helpers/FontFamiles";
import { normalize } from "@/helpers/useScaling";
import { TicketCard } from "@/views/ticketing/TicketCard";
import { TransitRoute } from "@/views/ticketing/TransitRoute";
import WeatherCard from "@/views/ticketing/WeatherCard";
import { router } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function JourneyScreen() {
  const selectedTickets = [
    {
      transportType: "plane",
      identifier: "CX 5624",
      duration: "5h",
      departureTime: "10:01",
      departureLocation: "CGK",
      arrivalTime: "15:01",
      arrivalLocation: "HKG",
      carbonEmissions: 8,
      class: "Economy",
      currency: "IDR",
      price: 8600000.0,
      onViewDetails: () => console.log("Flight details viewed"),
    },
    {
      transportType: "ferry",
      identifier: "CX 9324",
      duration: "15h 13m",
      departureTime: "15:01",
      departureLocation: "HKG",
      arrivalTime: "22:14",
      arrivalLocation: "LHR",
      carbonEmissions: 8,
      class: "Economy",
      currency: "IDR",
      price: 26000000.0,
      onViewDetails: () => console.log("Flight details viewed"),
    },
  ];

  const transits = selectedTickets.map((ticket) => ({
    from: ticket.departureLocation,
    to: ticket.arrivalLocation,
    transportType:
      ticket.transportType === "plane" ? "flight" : ticket.transportType,
  }));

  const destinations: WeatherInfo[] = Array.from(
    new Set(
      selectedTickets.reduce((locations, ticket) => {
        locations.push(ticket.departureLocation);
        locations.push(ticket.arrivalLocation);
        return locations;
      }, [] as string[])
    )
  ).map((location) => {
    const mockWeatherData = {
      CGK: { temperature: 27, condition: "sunny" as const },
      HKG: { temperature: 23, condition: "rainy" as const },
      LHR: { temperature: 18, condition: "cloudy" as const },
    };

    return {
      location,
      ...mockWeatherData[location as keyof typeof mockWeatherData],
    };
  });

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <ScrollView
        style={{ paddingTop: normalize(24), backgroundColor: "#F8F7F7" }}
      >
        <View style={{ marginHorizontal: 20, marginBottom: normalize(32) }}>
          <Text
            style={{
              fontSize: normalize(24),
              color: "rgba(68, 74, 84, 0.74)",
            }}
          >
            View your journey
          </Text>
          <TransitRoute transits={transits} />
          {selectedTickets.map((ticket, index) => (
            <TicketCard
              key={index}
              {...ticket}
              variant="journey"
              style={{ marginBottom: normalize(16) }}
            />
          ))}
          <Text
            style={{
              fontSize: normalize(24),
              color: "rgba(68, 74, 84, 0.74)",
              marginTop: normalize(16),
            }}
          >
            Weather updates
          </Text>
          <Text
            style={{
              fontSize: normalize(20),
              marginVertical: normalize(8),
              color: "#B0B2B3",
            }}
          >
            01 Nov
          </Text>
          <View style={{ marginBottom: normalize(16) }}>
            <WeatherCard destinations={destinations} />
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          width: "100%",
          paddingHorizontal: 20,
          paddingTop: 16,
          borderTopWidth: 1,
          borderTopColor: "#E5E5E5",
          backgroundColor: "#fff",
          paddingBottom: 32,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#006564",
            paddingVertical: 16,
            borderRadius: 4,
            alignItems: "center",
          }}
          onPress={() => router.push("../(ticket)/checkout")}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: normalize(16),
              fontWeight: "500",
            }}
          >
            Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
