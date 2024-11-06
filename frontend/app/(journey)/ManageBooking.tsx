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
import JourneySegment from "../(suggest)/JourneySegment";

export default function ManageBooking() {
  const journeySegments = [
    {
      from: {
        code: "CGK",
        name: "Soekarno-Hatta Int'l",
        terminal: "Terminal 3",
      },
      to: {
        code: "HKG",
        name: "Hong Kong Int'l (HKG)",
        terminal: "Terminal 1",
      },
      departureTime: "08:10",
      arrivalTime: "14:15",
      duration: "5h 15m",
      transportType: "plane" as const,
      carbonEmissions: 180,
      flightNumber: "CX718",
    },
    {
      from: { code: "HKG", name: "HKIA Port", terminal: "Gate 30" },
      to: { code: "FYG", name: "Airport Ferry Terminal", terminal: "Gate 21" },
      departureTime: "16:20",
      arrivalTime: "17:10",
      duration: "50m",
      transportType: "ferry" as const,
      carbonEmissions: 15,
    },
  ];

  const transits = journeySegments.map((ticket) => ({
    from: ticket.from.code,
    to: ticket.to.code,
    transportType:
      ticket.transportType === "plane" ? "flight" : ticket.transportType,
  }));

  const destinations: WeatherInfo[] = Array.from(
    new Set(
      journeySegments.reduce((locations, ticket) => {
        locations.push(ticket.from.code);
        locations.push(ticket.to.code);
        return locations;
      }, [] as string[])
    )
  ).map((location) => {
    const mockWeatherData = {
      CGK: { temperature: 27, condition: "sunny" as const },
      HKG: { temperature: 23, condition: "rainy" as const },
      LHR: { temperature: 18, condition: "cloudy" as const },
      FYG: { temperature: 25, condition: "rainy" as const },
    };

    return {
      location,
      ...mockWeatherData[location as keyof typeof mockWeatherData],
    };
  });

  return (
      <ScrollView
        style={{ paddingHorizontal: normalize(20), paddingTop: normalize(24), backgroundColor: "#F8F7F7" }}
      >
        <Text
          style={{
            fontSize: normalize(24),
            color: "black",
          }}
        >
          You've arrived in Hong Kong.
        </Text>
        < TransitRoute transits={transits} position={"HKG"} />
        <View style={{
          backgroundColor: "white",
          marginBottom: 16,
          borderRadius: 14,
          paddingHorizontal: 20,
          paddingBottom: 24,
          paddingTop: 16,
          shadowColor: "#000",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 3,
        }}
        >
          <Text style={{
            color: "#444A54",
            fontSize: normalize(14),
          }}
          >
            Fri 01 Nov 2024 {""} | {""} CX718
          </Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text
              style={{
                fontFamily: FontFamilies.GTWalsheimBold,
                color: "#006564",
                fontSize: normalize(16),
              }}
            >
              Jakarta
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 16,
                fontFamily: FontFamilies.GTWalsheimRegular,
              }}
            >
              {" "}
              to{" "}
            </Text>
            <Text
              style={{
                fontFamily: FontFamilies.GTWalsheimBold,
                color: "#006564",
                fontSize: 16,
              }}
            >
              Shenzhen
            </Text>
          </View>

          {journeySegments.map((segment, index) => (
            <JourneySegment key={index} {...segment} />
          ))}
          <Text style={{
            position: "absolute",
            bottom: 146,
            left: 120,
            fontSize: 12,
            color: "#303436",
            fontFamily: FontFamilies.GTWalsheimRegular,
            textAlign: "center",
          }}
          >
            Transit:{" "}
            <Text style={{ fontFamily: FontFamilies.GTWalsheimBold }}>
              2h 5m{" "}
            </Text>
            <Text>at </Text>
            <Text style={{ fontFamily: FontFamilies.GTWalsheimBold }}>HKG</Text>
          </Text>
        </View>
        <Text
          style={{
            fontSize: normalize(24),
            color: "black",
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
        <View style={{ paddingBottom: normalize(16) }}>
          <WeatherCard destinations={destinations} />
        </View>
      </ScrollView>
  );
}
