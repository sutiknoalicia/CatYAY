import { Image, TouchableOpacity, View, Text } from "react-native";

type TicketSortingProps = {
  isPriceSorted: boolean;
  onPriceSort: () => void;
};

export function TicketSorting({
  isPriceSorted,
  onPriceSort,
}: TicketSortingProps) {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#fff",
          paddingVertical: 16,
          paddingHorizontal: 24,
          marginBottom: 20,
        }}
      >
        <View
          style={{
            flex: 9,
            justifyContent: "center",
            alignItems: "center",
            borderRightWidth: 0.75,
            borderRightColor: "rgba(68, 74, 84, 0.3)",
            marginRight: 24,
          }}
        >
          <TouchableOpacity onPress={onPriceSort}>
            <Text
              style={{
                color: isPriceSorted ? "#006564" : "rgba(68, 74, 84, 0.6)",
              }}
            >
              Price low to high
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity>
            <Image source={require("@/assets/images/filter-fill.png")} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
