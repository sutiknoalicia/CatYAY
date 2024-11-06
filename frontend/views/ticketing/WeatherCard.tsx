import { View, Text, Image, ImageSourcePropType } from "react-native";
import { FontFamilies } from "@/helpers/FontFamiles";

export type WeatherInfo = {
  location: string;
  temperature: number;
  condition: "sunny" | "rainy" | "cloudy";
};

interface WeatherCardProps {
  destinations: WeatherInfo[];
}

const weatherImages: Record<WeatherInfo["condition"], ImageSourcePropType> = {
  sunny: require("@/assets/images/sunny.png"),
  rainy: require("@/assets/images/rainy.png"),
  cloudy: require("@/assets/images/cloudy.png"),
};

const getWeatherIcon = (
  condition: WeatherInfo["condition"]
): ImageSourcePropType => {
  return weatherImages[condition] || weatherImages.sunny;
};

export default function WeatherCard({ destinations }: WeatherCardProps) {
  return (
    <View
      style={{
        padding: 32,
        backgroundColor: "#fff",
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {destinations.map((dest, index) => (
          <View
            key={dest.location}
            style={{
              alignItems:
                index === 0
                  ? "flex-start"
                  : index === destinations.length - 1
                  ? "flex-end"
                  : "center",
              flex: 1,
            }}
          >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text
                style={{
                  color: "#006564",
                  fontSize: 16,
                  fontFamily: FontFamilies.GTWalsheimBold,
                }}
              >
                {dest.location}
              </Text>
              <Image
                source={getWeatherIcon(dest.condition)}
                style={{
                  width: 24,
                  height: 24,
                  marginVertical: 8,
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: FontFamilies.GTWalsheimBold,
                  color: "#303436",
                }}
              >
                {dest.temperature}°C
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
