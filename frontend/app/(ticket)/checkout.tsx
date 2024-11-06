import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import { normalize } from "@/helpers/useScaling";

export default function CheckoutScreen() {
  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <ScrollView style={{ backgroundColor: "#F8F7F7" }}>
        <View style={{ backgroundColor: "#fff", marginBottom: normalize(16) }}>
          <View style={{ marginHorizontal: 20, marginTop: normalize(20) }}>
            <Text
              style={{
                fontSize: normalize(20),
                color: "rgba(68, 74, 84, 0.74)",
                marginBottom: 8,
              }}
            >
              Departing flight
            </Text>
          </View>
          <View style={{ backgroundColor: "#e5eff0" }}>
            <Text
              style={{
                marginHorizontal: 20,
                color: "#006564",
                paddingVertical: normalize(8),
                fontSize: normalize(16),
              }}
            >
              Economy{" "}
              <Text style={{ fontWeight: "bold", fontSize: normalize(16) }}>
                Light
              </Text>
            </Text>
          </View>
          <View style={{ marginHorizontal: 20, marginVertical: normalize(16) }}>
            <Text style={{ color: "#006564" }}>Economy | Class N</Text>
            <View
              style={{
                marginTop: normalize(8),
                marginBottom: normalize(4),
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  borderRightWidth: 0.75,
                  paddingRight: 8,
                  marginRight: 8,
                  borderColor: "rgba(68, 74, 84, 0.6)",
                }}
              >
                <Text style={{ fontSize: normalize(16), color: "#444a54" }}>
                  Thu 07 Nov 2024
                </Text>
              </View>
              <View>
                <Text style={{ color: "#444a54" }}>CX257</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: normalize(16),
                    color: "#444a54",
                    fontWeight: "bold",
                  }}
                >
                  HKG
                </Text>
                <Text
                  style={{
                    fontSize: normalize(16),
                    color: "#444a54",
                    marginHorizontal: 8,
                  }}
                >
                  08:10
                </Text>
                <Ionicons
                  name="airplane-sharp"
                  size={normalize(16)}
                  color="#006564"
                />
                <Text
                  style={{
                    fontSize: normalize(16),
                    color: "#444a54",
                    fontWeight: "bold",
                    marginLeft: 8,
                  }}
                >
                  LHR
                </Text>
                <Text
                  style={{
                    fontSize: normalize(16),
                    color: "#444a54",
                    marginLeft: 8,
                  }}
                >
                  15:00
                </Text>
              </View>
              <Ionicons
                name="chevron-up"
                size={normalize(18)}
                color="#006564"
              />
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: "#fff", marginBottom: normalize(16) }}>
          <View style={{ marginTop: normalize(20), marginHorizontal: 20 }}>
            <Text
              style={{
                fontSize: normalize(20),
                color: "rgba(68, 74, 84, 0.74)",
                marginBottom: normalize(8),
              }}
            >
              Returning flight
            </Text>
          </View>
          <View style={{ backgroundColor: "#e5eff0" }}>
            <Text
              style={{
                marginHorizontal: 20,
                color: "#006564",
                paddingVertical: normalize(8),
                fontSize: normalize(16),
              }}
            >
              Economy{" "}
              <Text style={{ fontWeight: "bold", fontSize: normalize(16) }}>
                Light
              </Text>
            </Text>
          </View>
          <View style={{ marginHorizontal: 20, marginVertical: normalize(16) }}>
            <Text style={{ color: "#006564" }}>Economy | Class N</Text>
            <View
              style={{
                marginTop: normalize(8),
                marginBottom: normalize(4),
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  borderRightWidth: 0.75,
                  paddingRight: 8,
                  marginRight: 8,
                  borderColor: "rgba(68, 74, 84, 0.6)",
                }}
              >
                <Text style={{ fontSize: normalize(16), color: "#444a54" }}>
                  Thu 14 Nov 2024
                </Text>
              </View>
              <View>
                <Text style={{ color: "#444a54" }}>CX252</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: normalize(16),
                    color: "#444a54",
                    fontWeight: "bold",
                  }}
                >
                  LHR
                </Text>
                <Text
                  style={{
                    fontSize: normalize(16),
                    color: "#444a54",
                    marginHorizontal: 8,
                  }}
                >
                  11:00
                </Text>
                <Ionicons
                  name="airplane-sharp"
                  size={normalize(16)}
                  color="#006564"
                />
                <Text
                  style={{
                    fontSize: normalize(16),
                    color: "#444a54",
                    fontWeight: "bold",
                    marginLeft: 8,
                  }}
                >
                  HKG
                </Text>
                <Text
                  style={{
                    fontSize: normalize(16),
                    color: "#444a54",
                    marginLeft: 8,
                  }}
                >
                  07:40
                </Text>
                <Text
                  style={{
                    fontSize: normalize(12),
                    color: "#444a54",
                    marginLeft: 2,
                    top: -4,
                  }}
                >
                  +1
                </Text>
              </View>
              <Ionicons
                name="chevron-up"
                size={normalize(18)}
                color="#006564"
              />
            </View>
          </View>
        </View>
        {/* Passengers */}
        <View style={{ marginBottom: normalize(16) }}>
          <Text
            style={{
              fontSize: normalize(20),
              color: "rgba(68, 74, 84, 0.74)",
              marginBottom: normalize(16),
              marginHorizontal: 20,
            }}
          >
            Passengers
          </Text>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              paddingVertical: normalize(16),
              backgroundColor: "#fff",
              gap: 8,
              alignItems: "center",
            }}
          >
            <Ionicons
              name="person-circle-outline"
              size={normalize(32)}
              color={"#444A54"}
            />
            <Text style={{ fontSize: normalize(20), color: "#444A54" }}>
              Mr Anggawijaya Howard
            </Text>
          </View>
        </View>
        {/* Payment Breakdown */}
        <View>
          <Text
            style={{
              fontSize: normalize(20),
              color: "rgba(68, 74, 84, 0.74)",
              marginBottom: normalize(16),
              marginHorizontal: 20,
            }}
          >
            Payment breakdown
          </Text>
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: normalize(24),
              backgroundColor: "#fff",
            }}
          >
            {/* Total Fare */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: normalize(16),
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: normalize(24), color: "#444A54" }}>
                Total fare
              </Text>
              <Text style={{ fontSize: normalize(20), color: "#444A54" }}>
                HKD<Text style={{ fontWeight: "bold" }}>6,364.00</Text>
              </Text>
            </View>

            {/* Air Transportation Fee */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: normalize(8),
              }}
            >
              <Text style={{ color: "#444A54", fontSize: normalize(16) }}>
                Air transportation fee
              </Text>
              <Text style={{ color: "#444A54", fontSize: normalize(16) }}>
                HKD4,608.00
              </Text>
            </View>

            {/* Other Charges */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: normalize(16),
              }}
            >
              <Text style={{ color: "#444A54", fontSize: normalize(16) }}>
                Other Charges and Fees
              </Text>
              <Text style={{ color: "#444A54", fontSize: normalize(16) }}>
                HKD1,756.00
              </Text>
            </View>

            {/* View Price Breakdown Button */}
            <Text style={{ color: "#006564", fontSize: normalize(16) }}>
              View price breakdown
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          width: "100%",
          backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: normalize(16),
            borderTopWidth: 1,
            borderTopColor: "#E5E5E5",
          }}
        >
          <Text style={{ fontSize: normalize(20), color: "#444A54" }}>
            Total fare
          </Text>
          <Text style={{ fontSize: normalize(20), color: "#444A54" }}>
            HKD<Text style={{ fontWeight: "bold" }}>6,364.00</Text>
          </Text>
        </View>

        <View style={{ paddingHorizontal: 20, paddingBottom: 32 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#006564",
              paddingVertical: 16,
              borderRadius: 4,
              alignItems: "center",
            }}
            onPress={() => router.push("../(ticket)/success")}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: normalize(16),
                fontWeight: "500",
              }}
            >
              Pay now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
