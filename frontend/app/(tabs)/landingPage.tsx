import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Modal,
  FlatList,
  TextInput,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import PassengerModal from "../../components/PassengerModal.js";
import { useRouter } from "expo-router";
import Carousel from "react-native-reanimated-carousel";

const DiscountCodeModal = ({ visible, onClose, onConfirm }) => {
  const [discountCode, setDiscountCode] = useState("");

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            height: "21%",
            width: "100%",
            backgroundColor: "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 24,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>
            使用优惠代码
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 16,
              paddingHorizontal: 12,
            }}
            placeholder="请输入优惠代码"
            value={discountCode}
            onChangeText={(text) => setDiscountCode(text)}
          />
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity onPress={onClose} style={{ marginRight: 16 }}>
              <Text style={{ fontSize: 18, color: "#006E6D" }}>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onConfirm(discountCode)}>
              <Text style={{ fontSize: 18, color: "#006E6D" }}>确定</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const airports = [
  { code: "HKG", name: "香港" },
  { code: "MFM", name: "澳门" },
  { code: "CAN", name: "广州" },
  { code: "SZX", name: "深圳" },
  { code: "ZUH", name: "珠海" },
  { code: "FUO", name: "佛山" },
  { code: "HUZ", name: "惠州" },
  { code: "DNG", name: "东莞" },
  { code: "ZSO", name: "中山" },
  { code: "JMO", name: "江门" },
  { code: "ZHQ", name: "肇庆" },
];

const AirportSelectionModal = ({
  visible,
  onClose,
  onSelect,
  selectedAirport,
}) => (
  <Modal visible={visible} animationType="slide" transparent>
    <View
      style={{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <View
        style={{
          height: "60%",
          width: "100%",
          backgroundColor: "white",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <View
          style={{
            padding: 24,
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>选择出发地</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={{ fontSize: 18, color: "#006E6D" }}>取消</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={airports}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onSelect(item)}
              style={{
                paddingVertical: 16,
                paddingHorizontal: 24,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: item.code === selectedAirport ? "#006E6D" : "black",
                  flex: 1,
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: item.code === selectedAirport ? "#006E6D" : "black",
                  fontWeight: "bold",
                }}
              >
                {item.code}
              </Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => (
            <View style={{ height: 2, backgroundColor: "#eee" }} />
          )}
        />
      </View>
    </View>
  </Modal>
);

export default function FlightBookingScreen() {
  const [fromAirport, setFromAirport] = useState(null);
  const [toAirport, setToAirport] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSelection, setCurrentSelection] = useState(null);
  const [tripType, setTripType] = useState("single");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDepartureDate, setSelectedDepartureDate] = useState(null);
  const [selectedReturnDate, setSelectedReturnDate] = useState(null);
  const [currentDateSelection, setCurrentDateSelection] = useState(null);
  const [cabinClass, setCabinClass] = useState("经济舱");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [isPassengerModalVisible, setPassengerModalVisible] = useState(false);
  const [isDiscountCodeModalVisible, setDiscountCodeModalVisible] =
    useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const router = useRouter();

  const handleDiscountCodeConfirm = (code) => {
    setDiscountCode(code);
    setDiscountCodeModalVisible(false);
  };

  const showDatePicker = (dateType) => {
    setCurrentDateSelection(dateType);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    if (currentDateSelection === "departure") {
      setSelectedDepartureDate(date);
    } else if (currentDateSelection === "return") {
      setSelectedReturnDate(date);
    }
    hideDatePicker();
  };

  const handleAirportPress = (selection) => {
    setCurrentSelection(selection);
    setModalVisible(true);
  };

  const handleAirportSelect = (airport) => {
    if (currentSelection === "from") {
      setFromAirport(airport);
    } else if (currentSelection === "to") {
      setToAirport(airport);
    }
    setModalVisible(false);
  };

  const { width } = Dimensions.get("window");
  const carouselImages = [
    require("../../assets/images/Cathay-Pacific-Cabin-Crew.jpg"),
    require("../../assets/images/cathay-wing-tip.jpg"),
    require("../../assets/images/cathay-promotion.jpg"),
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        {/* Hero Section with Carousel */}
        <View style={{ height: 280 }}>
          <Carousel
            loop
            width={width}
            height={280}
            autoPlay={false}
            data={carouselImages}
            renderItem={({ index }) => {
              const image = carouselImages[index];
              return (
                <Image
                  source={typeof image === "string" ? { uri: image } : image}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  resizeMode="cover"
                />
              );
            }}
          />
        </View>

        {/* Login Section */}
        <View
          style={{
            backgroundColor: "white",
            margin: 16,
            padding: 16,
            borderRadius: 8,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            elevation: 4,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <AntDesign name="user" size={24} color="#666" />
            <Text style={{ color: "#666" }}>微信用户，您好</Text>
          </View>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "#006E6D",
              paddingVertical: 6,
              paddingHorizontal: 12,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: "#006E6D" }}>登录/注册</Text>
          </TouchableOpacity>
        </View>

        {/* Booking Form */}
        <View
          style={{
            backgroundColor: "white",
            margin: 16,
            padding: 16,
            borderRadius: 8,
            elevation: 4,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}
        >
          <View style={{ flexDirection: "row", marginBottom: 24 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                paddingVertical: 12,
                alignItems: "center",
                borderBottomWidth: 2,
                borderBottomColor:
                  tripType === "single" ? "#006E6D" : "transparent",
                marginRight: 8,
              }}
              onPress={() => setTripType("single")}
            >
              <Text
                style={{
                  color: tripType === "single" ? "#006E6D" : "#666",
                  fontSize: 16,
                }}
              >
                单程
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                paddingVertical: 12,
                alignItems: "center",
                borderBottomWidth: 2,
                borderBottomColor:
                  tripType === "multiple" ? "#006E6D" : "transparent",
                marginLeft: 8,
              }}
              onPress={() => setTripType("multiple")}
            >
              <Text
                style={{
                  color: tripType === "multiple" ? "#006E6D" : "#666",
                  fontSize: 16,
                }}
              >
                多程
              </Text>
            </TouchableOpacity>
          </View>
          {/* From and To */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 24,
              marginHorizontal: 12,
            }}
          >
            {/* From */}
            <TouchableOpacity
              onPress={() => handleAirportPress("from")}
              style={{ flex: 1 }}
            >
              <Text style={{ color: "#666", marginBottom: 8 }}>出发地</Text>
              <Text style={{ fontSize: 18 }}>
                {fromAirport
                  ? `${fromAirport.name} (${fromAirport.code})`
                  : "请选择"}
              </Text>
            </TouchableOpacity>

            {/* Swap Button */}
            <TouchableOpacity
              style={{
                backgroundColor: "#006E6D",
                padding: 8,
                borderRadius: 20,
                marginLeft: 40,
                marginHorizontal: 24,
              }}
              onPress={() => {
                setFromAirport(toAirport);
                setToAirport(fromAirport);
              }}
            >
              <MaterialCommunityIcons
                name="swap-vertical"
                size={24}
                color="white"
              />
            </TouchableOpacity>

            {/* To */}
            <TouchableOpacity
              onPress={() => handleAirportPress("to")}
              style={{ flex: 1, alignItems: "flex-end" }}
            >
              <Text
                style={{ color: "#666", marginBottom: 8, textAlign: "right" }}
              >
                目的地
              </Text>
              <Text style={{ fontSize: 18, textAlign: "right" }}>
                {toAirport ? `${toAirport.name}` : "请选择"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Date */}
          <View style={{ flexDirection: "row", marginBottom: 24 }}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <TouchableOpacity onPress={() => showDatePicker("departure")}>
                <Text
                  style={{
                    color: "#666",
                    marginBottom: 4,
                    marginHorizontal: 12,
                    fontSize: 12,
                  }}
                >
                  出发日期
                </Text>
                <Text style={{ fontSize: 16, marginHorizontal: 12 }}>
                  {selectedDepartureDate
                    ? selectedDepartureDate.toLocaleDateString()
                    : "请选择"}
                </Text>
              </TouchableOpacity>
            </View>
            {tripType === "multiple" && (
              <View style={{ flex: 1, marginLeft: 8 }}>
                <TouchableOpacity onPress={() => showDatePicker("return")}>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text
                      style={{
                        color: "#666",
                        marginBottom: 4,
                        marginHorizontal: 12,
                        fontSize: 12,
                      }}
                    >
                      返回日期
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        marginHorizontal: 12,
                      }}
                    >
                      {selectedReturnDate
                        ? selectedReturnDate.toLocaleDateString()
                        : "请选择"}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Passengers */}
          <TouchableOpacity onPress={() => setPassengerModalVisible(true)}>
            <Text
              style={{ color: "#666", marginBottom: 8, marginHorizontal: 12 }}
            >
              舱位和乘客
            </Text>
            <Text style={{ fontSize: 18, marginHorizontal: 12 }}>
              {cabinClass}，{adults} 成人 {children} 儿童 {infants} 婴儿
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 16,
              marginHorizontal: 12,
            }}
            onPress={() => setDiscountCodeModalVisible(true)}
          >
            <Text style={{ color: "#006E6D", marginRight: 8 }}>
              使用优惠代码
            </Text>
            <AntDesign name="right" size={16} color="#006E6D" />
          </TouchableOpacity>

          {/* Search Button */}
          <View style={{ marginTop: 12 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#2C4B44",
                padding: 16,
                borderRadius: 4,
                alignItems: "center",
                marginHorizontal: 12,
              }}
              onPress={() => router.push("/(tabs)/ticket")}
            >
              <Text style={{ color: "white", fontSize: 12 }}>搜索</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <AirportSelectionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={handleAirportSelect}
        selectedAirport={
          currentSelection === "from"
            ? fromAirport?.code || null
            : currentSelection === "to"
            ? toAirport?.code || null
            : null
        }
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
        locale="zh-CN"
        confirmTextIOS="确定"
        cancelTextIOS="取消"
      />
      <PassengerModal
        isVisible={isPassengerModalVisible}
        onClose={() => setPassengerModalVisible(false)}
        onConfirm={({ cabinClass, adults, children, infants }) => {
          // Update the state with the selected values
          setCabinClass(cabinClass);
          setAdults(adults);
          setChildren(children);
          setInfants(infants);
          setPassengerModalVisible(false);
        }}
      />
      <DiscountCodeModal
        visible={isDiscountCodeModalVisible}
        onClose={() => setDiscountCodeModalVisible(false)}
        onConfirm={handleDiscountCodeConfirm}
      />
    </View>
  );
}