import { useRouter } from "expo-router";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F7F7" }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {/* Success Icon */}
        <View
          style={{
            backgroundColor: "#E5EFF0",
            borderRadius: 50,
            padding: 16,
            marginBottom: 24,
          }}
        >
          <Ionicons name="checkmark-circle" size={64} color="#006564" />
        </View>

        {/* Success Message */}
        <Text
          style={{
            fontSize: 24,
            color: "#444A54",
            fontWeight: "600",
            marginBottom: 12,
          }}
        >
          Payment successful
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#666",
            textAlign: "center",
            marginBottom: 32,
            paddingHorizontal: 40,
          }}
        >
          Your booking has been confirmed. A confirmation email has been sent to
          your email address.
        </Text>

        {/* Booking Reference */}
        <View
          style={{
            backgroundColor: "#fff",
            padding: 16,
            borderRadius: 8,
            marginBottom: 32,
            width: "80%",
          }}
        >
          <Text style={{ color: "#666", marginBottom: 8 }}>
            Booking reference
          </Text>
          <Text style={{ fontSize: 24, color: "#444A54", fontWeight: "600" }}>
            ABCD123
          </Text>
        </View>

        {/* View Booking Button */}
        <TouchableOpacity
          style={{
            backgroundColor: "#006564",
            paddingVertical: 16,
            paddingHorizontal: 32,
            borderRadius: 4,
            width: "80%",
            alignItems: "center",
          }}
          onPress={() => router.replace("/")}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}>
            View booking
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
