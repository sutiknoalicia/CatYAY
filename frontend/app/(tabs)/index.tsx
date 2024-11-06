import { Image, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Feather from '@expo/vector-icons/Feather';
import { FontFamilies } from '@/helpers/FontFamiles';
import { normalize } from '@/helpers/useScaling';
import Button from '@/components/button';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useWindowDimensions } from 'react-native';
import PromoDestinationCard from '@/components/PromoDestinationCard';
import { useState } from 'react';
import VeraModal from '@/components/VeraModal';
import VeraSvg from '@/assets/svgs/vera-svg';
import { router } from 'expo-router';

export default function HomeScreen() {

  const [veraOpen, setVeraOpen] = useState(true);
  const {height: screenHeight} = useWindowDimensions();

  function handleMenuPress(): void {
    console.log("notifications pressed")
  }

  function handleNotificationPress(): void {
    console.log("menu pressed")
  }

  function handleVeraPress() : void {
    setVeraOpen(true);
  }

  function handleVeraBot(): void {
    setVeraOpen(false);
    router.push("/(vera)/ChatBot")
  }

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
          <TouchableOpacity
            onPress={handleNotificationPress}
          >
            <SimpleLineIcons name="bell" size={normalize(24)} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleMenuPress}
          >
            <Feather name="menu" size={normalize(24)} color="black" />
          </TouchableOpacity>
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
        <View
          style={{
            width: "100%",
            height: normalize(204),
          }}
        >
          <View
            style={{
              width: "100%",
              height: normalize(142),
            }}
          >
            <Image
              source={require("../../assets/images/cathay-wing-tip.jpg")}
              style={{
                width: "100%",
                height: "100%",
                aspectRatio: 550 / 170,
              }}
            />
            <View
              style={{
                position: "absolute",
                top: 76,
                flexDirection: "row",
                marginBottom: 8,
                marginHorizontal: normalize(20),
                gap: 16,
              }}
            >
              <Button
                title="Book a trip"
                theme="light"
                containerStyles={{
                  flex: 1,
                  borderRadius: 8,
                  borderColor: "rgba(0, 0, 0, 0.08)",
                  borderSize: 1,
                  shadowColor: "rgba(0, 0, 0, 0.05)",
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 1,
                  shadowRadius: 4,
                  elevation: 8,
                  height: screenHeight * 0.1,
                  padding: 12,
                }}
                onPress={() => console.log("Booking pressed")}
              >
                <View
                  style={{
                    flexDirection: "column",
                    alignSelf: "center",
                    alignItems: "center",
                    gap: normalize(8),
                    flexWrap: "wrap",
                  }}
                >
                  <Ionicons name="airplane-sharp" size={24} color="#006564" />
                  <Text
                    style={{
                      fontFamily: FontFamilies.GTWalsheimRegular,
                      fontSize: normalize(16),
                      lineHeight: normalize(16),
                      maxWidth: "100%",
                    }}
                  >
                    Book a trip
                  </Text>
                </View>
              </Button>
              <Button
                title="Manage Booking"
                theme="light"
                containerStyles={{
                  flex: 1,
                  borderRadius: 8,
                  borderColor: "rgba(0, 0, 0, 0.08)",
                  borderSize: 1,
                  shadowColor: "rgba(0, 0, 0, 0.05)",
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 1,
                  shadowRadius: 4,
                  elevation: 8,
                  height: screenHeight * 0.1,
                  padding: 12,
                }}
                onPress={() => console.log("Manage Booking Pressed")}
              >
                <View
                  style={{
                    flexDirection: "column",
                    alignSelf: "center",
                    alignItems: "center",
                    gap: normalize(8),
                    flexWrap: "wrap",
                  }}
                >
                  <MaterialIcons name="format-list-bulleted-add" size={24} color="#006564" />
                  <Text
                    style={{
                      fontFamily: FontFamilies.GTWalsheimRegular,
                      fontSize: normalize(16),
                      lineHeight: normalize(16),
                      maxWidth: "100%",
                    }}
                  >
                    Manage booking
                  </Text>
                </View>
              </Button>
            </View>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: normalize(460),
            backgroundColor: "#F0F4F1",
          }}
        >
          <View 
            style={{
              justifyContent: "space-between",
              paddingVertical: normalize(32),
              paddingHorizontal: normalize(20),
              gap: normalize(12)
            }}
          >
            <Text
              style={{
                fontSize: normalize(22),
                fontFamily: FontFamilies.GTWalsheimRegular,
              }}
            >Our latest offers
            </Text>
            <View 
              style={{
                flexDirection: "row",
                gap: normalize(4)
              }}
            >
              <Text
                style={{
                  fontSize: normalize(16),
                  fontFamily: FontFamilies.GTWalsheimRegular,
                }}
              >From:  
              </Text>
              <Text
                style={{
                  fontSize: normalize(16),
                  fontFamily: FontFamilies.GTWalsheimBold,
                  color: "#006564"
                }}
              >Hong Kong 
              </Text>
            </View>
          </View>
          <PromoDestinationCard
            data={
              [
                {destination: "Taipei", class: "Economy", price: "1,659", imageUrl: require("../../assets/images/singapore-picture.jpeg")}, 
                {destination: "Kaohsiung", class: "Economy", price: "1,559", imageUrl: require("../../assets/images/singapore-picture.jpeg")}, 
                {destination: "Singapore", class: "Economy", price: "2,323", imageUrl: require("../../assets/images/singapore-picture.jpeg")}, 
                {destination: "Seoul", class: "Economy", price: "2,128", imageUrl: require("../../assets/images/singapore-picture.jpeg")}, 
                {destination: "Christchurch", class: "Economy", price: "8,771", imageUrl: require("../../assets/images/singapore-picture.jpeg")}, 
                {destination: "Tokyo", class: "Economy", price: "2,920", imageUrl: require("../../assets/images/singapore-picture.jpeg")}, 
                {destination: "Osaka", class: "Economy", price: "2,697", imageUrl: require("../../assets/images/singapore-picture.jpeg")}, 
              ]
            }
          />
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          right: normalize(32),
          bottom: normalize(32),
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}
      >
        <TouchableOpacity
          onPress={handleVeraPress}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <VeraSvg/>
          </View>
        </TouchableOpacity>
      </View>
      <VeraModal first_name={"Howard"} open={veraOpen} setOpen={setVeraOpen} onPress={handleVeraBot} />
    </>
  );
}