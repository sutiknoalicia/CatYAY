import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Feather, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { normalize } from "@/helpers/useScaling";
import { FontFamilies } from "@/helpers/FontFamiles";

const SuggestHeader = ({ name }: { name: string }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.greeting}>Hello {name}!</Text>
      <View style={styles.optimalRoute}>
        <Text style={styles.routeLabel}>Suggested journey</Text>
        <View style={styles.optimalBadge}>
          <Text style={styles.optimalText}>Optimal route</Text>
        </View>
      </View>
    </View>
  );
};

interface JourneySegmentProps {
  from: {
    code: string;
    name: string;
    terminal: string;
  };
  to: {
    code: string;
    name: string;
    terminal: string;
  };
  departureTime: string;
  arrivalTime: string;
  transportType: "plane" | "ferry";
  carbonEmissions: number;
}

const JourneySegment = (props: JourneySegmentProps) => {
  return (
    <View style={styles.segment}>
      <View style={styles.timeColumn1}>
        <Text style={styles.code}>{props.from.code}</Text>
        <Text style={styles.time}>{props.departureTime}</Text>
        <Text style={styles.name1}>{props.from.name}</Text>
        <Text style={styles.terminal}>{props.from.terminal}</Text>
      </View>

      <View style={styles.connectionLine}>
        {props.transportType === "plane" ? (
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontFamily: FontFamilies.GTWalsheimRegular,
                fontSize: 12,
              }}
            >
              5h 15m
            </Text>
            <Image source={require("@/assets/images/plane-journey.png")} />
          </View>
        ) : (
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontFamily: FontFamilies.GTWalsheimRegular,
                fontSize: 12,
              }}
            >
              50m
            </Text>
            <Image source={require("@/assets/images/ferry-journey.png")} />
          </View>
        )}
      </View>

      <View style={styles.timeColumn2}>
        <Text style={styles.code}>{props.to.code}</Text>
        <Text style={styles.time}>{props.arrivalTime}</Text>
        <Text style={styles.name2}>{props.to.name}</Text>
        <Text style={styles.terminal}>{props.to.terminal}</Text>
      </View>

      <Text style={styles.emissions}>
        Carbon emissions: {props.carbonEmissions}kg CO₂
      </Text>
    </View>
  );
};

const SmartSuggestions = () => {
  return (
    <View style={styles.suggestions}>
      <Text style={styles.suggestionsTitle}>Smart suggestions</Text>
      <View style={styles.suggestionBox}>
        <View style={styles.weatherAlert}>
          <Ionicons name="rainy" size={24} color="#006064" />
          <Text style={styles.weatherText}>
            <Text
              style={{
                fontFamily: FontFamilies.GTWalsheimBold,
                color: "#006564",
              }}
            >
              Heavy rain{" "}
            </Text>
            <Text>expected at arrival in </Text>
            <Text
              style={{
                fontFamily: FontFamilies.GTWalsheimBold,
                color: "#006564",
              }}
            >
              Hong Kong
            </Text>
            <Text> and </Text>
            <Text
              style={{
                fontFamily: FontFamilies.GTWalsheimBold,
                color: "#006564",
              }}
            >
              Shenzhen
            </Text>
            <Text>.</Text>
          </Text>
        </View>
        <Text style={styles.umbrellaText}>
          Forgot to bring an umbrella? Protect yourself from getting wet during
          your journey.
        </Text>
        <TouchableOpacity style={styles.transferButton}>
          <Text style={styles.proceedText}>Book Premium Transfer Service</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.helpText}>Need help with your trip?</Text>
    </View>
  );
};

export default function SuggestScreen() {
  const router = useRouter();
  function handleMenuPress(): void {
    console.log("notifications pressed");
  }
  function handleNotificationPress(): void {
    console.log("menu pressed");
  }

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

  const handleProceed = () => {
    router.push("/ticket");
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#F8F7F7", flex: 1 }}>
      <View
        style={{
          paddingTop: normalize(0),
          paddingHorizontal: normalize(20),
          paddingBottom: normalize(12),
          backgroundColor: "#F8F7F7",
        }}
      >
        <Image
          source={require("../../assets/images/cathay-logo.png")}
          style={{
            position: "absolute",
            top: normalize(0),
            alignSelf: "center",
          }}
        />
        <View
          style={{
            paddingTop: normalize(8),
            flexDirection: "row",
            justifyContent: "space-between",
            alignSelf: "flex-end",
            gap: normalize(24),
          }}
        >
          <TouchableOpacity onPress={handleNotificationPress}>
            <SimpleLineIcons name="bell" size={normalize(24)} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleMenuPress}>
            <Feather name="menu" size={normalize(24)} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <SuggestHeader name="Mr Howard" />

        <View style={styles.journeyCard}>
          <Text style={styles.date}>
            Fri 01 Nov 2024 {""} | {""} CX718
          </Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text
              style={{
                fontFamily: FontFamilies.GTWalsheimBold,
                color: "#006564",
                fontSize: 16,
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
          <Text style={styles.transferTime}>
            Transit:{" "}
            <Text style={{ fontFamily: FontFamilies.GTWalsheimBold }}>
              2h 5m{" "}
            </Text>
            <Text>at </Text>
            <Text style={{ fontFamily: FontFamilies.GTWalsheimBold }}>HKG</Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.proceedButton}>
          <Text style={styles.proceedText}>Proceed with this Journey</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.alternativeButton}
          onPress={handleProceed}
        >
          <Text style={styles.alternativeText}>Or</Text>
          <Text style={styles.alternativeText}>
            View Alternative Routes{" "}
            <Feather name="chevron-right" size={14} color="black" />
          </Text>
        </TouchableOpacity>
        <SmartSuggestions />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
  },
  greeting: {
    fontSize: normalize(24),
    lineHeight: normalize(22),
    marginBottom: 8,
    fontWeight: "600",
    fontFamily: FontFamilies.GTWalsheimRegular,
  },
  optimalRoute: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  routeLabel: {
    fontSize: normalize(20),
    lineHeight: normalize(22),
    fontFamily: FontFamilies.GTWalsheimRegular,
    color: "#303436",
  },
  optimalBadge: {
    backgroundColor: "rgba(94, 150, 126, 0.25)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
  },
  optimalText: {
    color: "#006564",
    fontSize: normalize(16),
    paddingHorizontal: 4,
    fontFamily: FontFamilies.GTWalsheimRegular,
  },
  journeyCard: {
    backgroundColor: "white",
    marginHorizontal: 16,
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
  },
  date: {
    color: "#444A54",
    fontSize: 14,
  },
  segment: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 14,
    gap: 16,
  },
  timeColumn1: {
    flex: 1,
  },
  timeColumn2: {
    flex: 1,
    alignItems: "flex-end",
  },
  time: {
    fontSize: 24,
    fontWeight: "600",
    fontFamily: FontFamilies.GTWalsheimRegular,
  },
  code: {
    fontSize: 14,
    color: "#006564",
    fontFamily: FontFamilies.GTWalsheimBold,
  },
  name1: {
    fontSize: 12,
    color: "#444A54",
    fontFamily: FontFamilies.GTWalsheimRegular,
  },
  name2: {
    fontSize: 12,
    color: "#444A54",
    fontFamily: FontFamilies.GTWalsheimRegular,
    textAlign: "right",
  },
  terminal: {
    fontSize: 12,
    color: "#999",
    marginBottom: 20,
    fontFamily: FontFamilies.GTWalsheimRegular,
  },
  connectionLine: {
    width: 150,
    alignItems: "center",
    flexDirection: "column",
    marginBottom: 20,
    fontFamily: FontFamilies.GTWalsheimRegular,
  },
  emissions: {
    position: "absolute",
    bottom: -2,
    left: 0,
    fontSize: 12,
    color: "#5E967E",
    fontFamily: FontFamilies.GTWalsheimRegular,
  },
  transferTime: {
    position: "absolute",
    bottom: 146,
    left: 120,
    fontSize: 12,
    color: "#303436",
    fontFamily: FontFamilies.GTWalsheimRegular,
    textAlign: "center",
  },
  proceedButton: {
    backgroundColor: "#367D79",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
    marginHorizontal: 16,
  },
  proceedText: {
    color: "white",
    fontSize: normalize(16),
    fontWeight: "600",
    fontFamily: FontFamilies.GTWalsheimBold,
  },
  alternativeButton: {
    padding: 16,
    alignItems: "center",
  },
  alternativeText: {
    color: "#444A54",
    fontSize: normalize(16),
    paddingVertical: 4,
    fontFamily: FontFamilies.GTWalsheimRegular,
  },
  suggestions: {
    padding: 20,
  },
  suggestionsTitle: {
    fontSize: normalize(20),
    fontWeight: "600",
    color: "#303436",
    marginBottom: 16,
    fontFamily: FontFamilies.GTWalsheimRegular,
  },
  suggestionBox: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  weatherAlert: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  weatherText: {
    fontSize: normalize(14),
    color: "#303436",
    fontFamily: FontFamilies.GTWalsheimRegular,
  },
  umbrellaText: {
    fontSize: normalize(12),
    marginTop: 12,
    paddingHorizontal: 2,
    color: "#303436",
    fontFamily: FontFamilies.GTWalsheimLight,
  },
  transferButton: {
    backgroundColor: "#367D79",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  transferText: {
    color: "#006064",
    fontSize: 16,
  },
  helpText: {
    fontSize: normalize(14),
    color: "#0F7490",
    marginTop: 14,
    textAlign: "center",
    fontFamily: FontFamilies.GTWalsheimRegular,
  },
});
