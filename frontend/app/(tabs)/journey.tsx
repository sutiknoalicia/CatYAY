import { FontFamilies } from "@/helpers/FontFamiles";
import { TicketCard } from "@/views/ticketing/TicketCard";
import { TransitRoute } from "@/views/ticketing/TransitRoute";
import WeatherCard from "@/views/ticketing/WeatherCard";
import { ScrollView, Text, View } from "react-native";

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
      price: 260000.0,
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
      price: 360000000.0,
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
    // This is mock weather data - in a real app, you'd fetch this from an API
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
    <ScrollView style={{ backgroundColor: "#F8F7F7" }}>
      <View style={{ marginHorizontal: 20 }}>
        <Text
          style={{
            fontSize: 24,
            fontFamily: FontFamilies.GTWalsheimRegular,
            marginTop: 124,
            color: "#303436",
          }}
        >
          View your Journey
        </Text>
        <TransitRoute transits={transits} />
        {selectedTickets.map((ticket, index) => (
          <TicketCard
            key={index}
            {...ticket}
            variant="journey"
            style={{ marginBottom: 16 }}
          />
        ))}
        <Text
          style={{
            fontSize: 24,
            fontFamily: FontFamilies.GTWalsheimRegular,
            marginTop: 16,
            color: "#303436",
          }}
        >
          Weather Updates
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontFamily: FontFamilies.GTWalsheimMedium,
            marginVertical: 8,
            color: "#B0B2B3",
          }}
        >
          01 Nov
        </Text>
        <View>
          <WeatherCard destinations={destinations} />
        </View>
      </View>
    </ScrollView>
  );
}
