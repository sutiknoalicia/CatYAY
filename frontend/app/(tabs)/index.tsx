import { Image, ScrollView, View, Text } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Feather from '@expo/vector-icons/Feather';
import { FontFamilies } from '@/helpers/FontFamiles';

export default function HomeScreen() {
  return (
    <>
      <View
        style={{
          paddingTop: 64,
          paddingHorizontal: 20,
          paddingBottom: 16,
          backgroundColor: "#F8F7F7",
        }}
      >
        <Image
          source={require('../../assets/images/cathay-logo.png')}
          style={{
            position: "absolute",
            top: 64,
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
      <ScrollView
        style={{
          backgroundColor: "#F8F7F7",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            paddingTop: 16,
            paddingHorizontal: 20,
            paddingBottom: 24,
            gap: 8,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              lineHeight: 22,
              fontFamily: FontFamilies.GTWalsheimRegular,
            }}
          >Hello Mr Howard!
          </Text>
          <View
            style={{
              flexDirection: "row",
              // justifyContent: "space-between",
              gap: 4,
            }}
          >
            <Image
              source={require("../../assets/images/asia-miles.png")}
              style={{
                width: 13.33,
                height: 16,
                alignSelf: "center",
              }}
            />
            <Text
              style={{
                fontFamily: FontFamilies.GTWalsheimBold,
                fontSize: 16,
                lineHeight: 22,
              }}
            >
              156,188
            </Text>
            <Text
              style={{
                fontFamily: FontFamilies.GTWalsheimUltraLight,
                fontSize: 16,
                color: "#8E96A4"
              }}
            >
              |
            </Text>
            <Text
              style={{
                fontFamily: FontFamilies.GTWalsheimRegular,
                fontSize: 14,
                lineHeight: 22,
                color: "#444A54"
              }}
            >
              Status points
            </Text>
            <Text
              style={{
                fontFamily: FontFamilies.GTWalsheimBold,
                fontSize: 16,
                lineHeight: 22,
              }}
            >
              532
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}