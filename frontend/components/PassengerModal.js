import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";

const PassengerModal = ({ isVisible, onClose, onConfirm }) => {
  const [cabinClass, setCabinClass] = useState("经济舱");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const handleConfirm = () => {
    onConfirm({ cabinClass, adults, children, infants });
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
            选择舱位及乘客数量
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: cabinClass === "经济舱" ? "#006E6D" : "#eee",
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 5,
              }}
              onPress={() => setCabinClass("经济舱")}
            >
              <Text
                style={{
                  color: cabinClass === "经济舱" ? "white" : "black",
                  fontSize: 18,
                }}
              >
                经济舱
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor:
                  cabinClass === "特选经济舱" ? "#006E6D" : "#eee",
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 5,
              }}
              onPress={() => setCabinClass("特选经济舱")}
            >
              <Text
                style={{
                  color: cabinClass === "特选经济舱" ? "white" : "black",
                  fontSize: 18,
                }}
              >
                特选经济舱
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: cabinClass === "公务舱" ? "#006E6D" : "#eee",
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 5,
              }}
              onPress={() => setCabinClass("公务舱")}
            >
              <Text
                style={{
                  color: cabinClass === "公务舱" ? "white" : "black",
                  fontSize: 18,
                }}
              >
                公务舱
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 18 }}>成人（>12岁）</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#eee",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
                onPress={() => setAdults(Math.max(adults - 1, 1))}
              >
                <Text style={{ fontSize: 18 }}>-</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 18, marginHorizontal: 10 }}>
                {adults}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "#eee",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
                onPress={() => setAdults(adults + 1)}
              >
                <Text style={{ fontSize: 18 }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 18 }}>儿童（2-11岁）</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#eee",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
                onPress={() => setChildren(Math.max(children - 1, 0))}
              >
                <Text style={{ fontSize: 18 }}>-</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 18, marginHorizontal: 10 }}>
                {children}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "#eee",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
                onPress={() => setChildren(children + 1)}
              >
                <Text style={{ fontSize: 18 }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 18 }}>婴儿（未满2岁）</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#eee",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
                onPress={() => setInfants(Math.max(infants - 1, 0))}
              >
                <Text style={{ fontSize: 18 }}>-</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 18, marginHorizontal: 10 }}>
                {infants}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "#eee",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
                onPress={() => setInfants(infants + 1)}
              >
                <Text style={{ fontSize: 18 }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#006E6D",
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 5,
              }}
              onPress={handleConfirm}
            >
              <Text style={{ color: "white", fontSize: 18 }}>确定</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PassengerModal;
