import { View, Text, Image, ImageSourcePropType } from "react-native";
import { FontFamilies } from "@/helpers/FontFamiles";
import { normalize } from "@/helpers/useScaling";

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
  const isTwoDestinations = destinations.length === 2;

  return (
    <View
      style={{
        paddingVertical: normalize(24),
        paddingHorizontal: 24,
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
              alignItems: isTwoDestinations
                ? "center"
                : index === 0
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
                  fontSize: normalize(16),
                  fontFamily: FontFamilies.GTWalsheimBold,
                }}
              >
                {dest.location}
              </Text>
              <Image
                source={getWeatherIcon(dest.condition)}
                style={{
                  width: normalize(24),
                  height: normalize(24),
                  marginVertical: normalize(8),
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: normalize(16),
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
