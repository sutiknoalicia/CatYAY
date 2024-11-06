import { Image, StyleSheet, Platform, ScrollView, View, Text } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Feather from '@expo/vector-icons/Feather';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FontFamilies } from '@/helpers/FontFamiles';

export default function HomeScreen() {
  return (
    <ScrollView
      style={{
        backgroundColor: "#F8F7F7",
        paddingTop: 64,
      }}
    >
      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        <Image
          source={require('../../assets/images/cathay-logo.png')}
          style={{
            position: "absolute",
            alignSelf: "center",
          }}
        />
        <View
          style={{
            paddingTop: 8,
            flexDirection: "row",
            justifyContent: "space-between",
            alignSelf: "flex-end",
            gap: 24,
          }}
        >
          <SimpleLineIcons name="bell" size={24} color="black" />
          <Feather name="menu" size={24} color="black" />
        </View>
      </View>
      <View
        style={{
          paddingVertical: 32,
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            lineHeight: 22,
            fontFamily: FontFamilies.SofiaProRegular,
          }}
        >Hello Mr Howard!</Text>
      </View>
    </ScrollView>
  );
}