import { Image, ScrollView, View, Text } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Feather from '@expo/vector-icons/Feather';
import { FontFamilies } from '@/helpers/FontFamiles';
import { normalize } from '@/helpers/useScaling';

export default function HomeScreen() {
  return (
    <>
      <View
        style={{
          paddingTop: normalize(64),
          paddingHorizontal: normalize(20),
          paddingBottom: normalize(16),
          backgroundColor: "#F8F7F7",
        }}
      >
        <Image
          source={require('../../assets/images/cathay-logo.png')}
          style={{
            position: "absolute",
            top: normalize(64),
            alignSelf: "center",
          }}
        />
        <View
          style={{
            paddingTop: normalize(8),
            flexDirection: "row",
            justifyContent: "space-between",
            alignSelf: "flex-end",
            gap: normalize(24),
          }}
        >
          <SimpleLineIcons name="bell" size={normalize(24)} color="black" />
          <Feather name="menu" size={normalize(24)} color="black" />
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
            paddingTop: normalize(16),
            paddingHorizontal: normalize(20),
            paddingBottom: normalize(24),
            gap: normalize(8),
          }}
        >
          <Text
            style={{
              fontSize: normalize(24),
              lineHeight: normalize(22),
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
                width: normalize(13.33),
                height: normalize(16),
                alignSelf: "center",
              }}
            />
            <Text
              style={{
                fontFamily: FontFamilies.GTWalsheimBold,
                fontSize: normalize(16),
                lineHeight: normalize(22),
              }}
            >
              156,188
            </Text>
            <Text
              style={{
                fontFamily: FontFamilies.GTWalsheimUltraLight,
                fontSize: normalize(16),
                color: "#8E96A4"
              }}
            >
              |
            </Text>
            <Text
              style={{
                fontFamily: FontFamilies.GTWalsheimRegular,
                fontSize: normalize(14),
                lineHeight: normalize(22),
                color: "#444A54"
              }}
            >
              Status points
            </Text>
            <Text
              style={{
                fontFamily: FontFamilies.GTWalsheimBold,
                fontSize: normalize(16),
                lineHeight: normalize(22),
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