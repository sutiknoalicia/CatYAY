import BackButton from "@/components/navigation/BackButton";
import { Stack } from "expo-router";
import "react-native-reanimated";

export default function QuizzesLayout() {

  return (
    <Stack>
      <Stack.Screen
        name="ChatBot"
        options={{
          title: "Vera",
          headerShown: true,
          headerTitleAlign: "center",
          headerLeft: () => (
            <BackButton/>
          ),
        }}
      />
    </Stack>
  );
}
