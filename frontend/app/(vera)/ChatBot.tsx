import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { normalize } from "@/helpers/useScaling";
import { router } from "expo-router";
import * as Speech from "expo-speech";
import { FontAwesome } from "@expo/vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hi, I'm Vera - your virtual assistant. How may I help you today?",
    },
    {
      type: "bot",
      text: "Simply share your desired destination, and I'll provide you with the most efficient routes, highlighting options with the lowest carbon emissions and the most affordable prices.",
    },
  ]);
  const [input, setInput] = useState("");
  const [destination, setDestination] = useState<string | null>(null);
  const [origin, setOrigin] = useState<string | null>(null);
  const [awaitingOrigin, setAwaitingOrigin] = useState(false);
  const [awaitingDestination, setAwaitingDestination] = useState(true);

  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);

  const locationMap: { [key: string]: string } = {
    shenzhen: "SZX",
    szx: "SZX",
    fyg: "FYG",
    jakarta: "CGK",
    // Add more mappings as needed
  };

  const normalizeLocation = (input: string): string | null => {
    const lowerInput = input.toLowerCase();

    for (const key in locationMap) {
      if (lowerInput.includes(key)) {
        return locationMap[key];
      }
    }

    return null;
  };

  const handleSkyPierQuery = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        type: "bot",
        text: "Sure! I can help you navigate to the Sky Pier.",
        cta: true,
        ctaText: "Navigate to Sky Pier",
        navigationPath: "/(tabs)/navigation",
      },
    ]);
  };

  const API_KEY = "0Ws2MAmAseTl39JZLohswZZgWLCxpZ1K";
  const COOKIE =
    "_abck=497F8B9FAD32E46E1EA9455520DB2D9F~-1~YAAQHZZUaDfCggKTAQAAvkkkBAzoa46wRy6pX5AKeBz1jKH0X+gqNXIdO0v/4BZQcUklSwWE/YYgPIbCY4dNpdG7d4TvYLz2qJRfozxXAJXmvcf4uISDKmK8eNebxkb3OvoZkYC95rsEO98NnDsKsv64w2Qusa/EWH8CpoPXBzGDRp70YaR+zr8VY5q7oQHicKQFzq4cApuJGR59Txk5owYbxWHZrUijBoIlMG82msFubotcpM2fssH+BXh6HlR0lxdIvV45cSLDzI63QcCO86r8AE5VdXfzRf9KxgYXdOaD3c7PBr5e08cJ8wt6U8ehVVgTQCPwaqAjqXKuUwNwQ4F5a3D0/8Nym545Rx2FYM9WRJnK5NjVmdY3mxZFseBHkE3i7P8I11hlhNiU9bbLxYEW7yQFrW00X29xCW15wFBd~-1~-1~-1; ak_bmsc=3308EBAAE345CF06F2915C33842A9BC2~000000000000000000000000000000~YAAQHZZUaDjCggKTAQAAvkkkBBmvYJHJwsCImLXZWmQWA/f3Y1okAFXEroCy3/nybk4RK3LElUFxahuhSk+2p9pCsvufdBqAbbWNmLtRT5QV6goUhH7gCQkHX7bNccmsmHIkYUdVM5uCUVhM7komT51XgKViYbNrAo1UB33Jkq6ASTX7ruleJjGpuDSipM4b7uOsW2OCP15EhDXHeB4T2yVAmAuUxNymvZGnjHRYSV6ycEDjnlSirBwU6frLwoi27J8NeeG3VeDgONRsOkroIJakaGPgram1c6ydiVYaXUMIOtXgRiryXG4xaURM4M0HTRydu+VRnbLOssRY9jePkisO8YDTKxMQz/SVKhbO4+JO/Q==; bm_sv=5210684E127923621A4202EA7DC77994~YAAQLBQgF8kaBQKTAQAAsEglBBm2Ezk/Qsp4CqdrRBo6eE6pcDxaZ0MKFSLAoFJLDG+x/6+p4cm4KQwGI0BPKrkZDIDMKbMQNLr9D6spol0r+jlqvoNCirDWlRmJjuQumOGUXuEa7AOHoRHcqmCaG2DDHJKjQS6sj0xsKeasR8eUV5NDvFkhUQGfli0sYPcstqEIBnprCS7LDTyMU56/VwlIoOAUMZGJbQeHMgO7pMW0OIwWO2bFDa80CRRuM1gnitNQv9uklQ==~1; bm_sz=8B1A0AF877B5236EA00A0282FB556097~YAAQHZZUaDnCggKTAQAAvkkkBBkkdeT403QLrdpQxy2p4lH8m4DTJg0rB5ytxTafhJdgKob4RtLjW7MJ/OmiBqVtgX8F6Gsj7L1KBHFrubYC3OoTDFA5TiBIgaFrZiT/sEvr0CJo24X/cusIThnh9AcWfa/UUy+BpxTbOlEhUZfS1I1FYxBO3VdRoSXDkJ74rvs+sy7vG/ZXOY1qvStZyd9ANyEKc81iPhF6HNU8h9O8yLdtcq0LzzXXtis96AbZfZqp2qY/8yiQIAe1CAF/8bzzkG91g1J4S8P8mYe65e6Oi4b3v/Wkb/mwikXtxSgllIEYTfcvwAh1hU4WPAWvUlYaCa4omdAZ6YqM9hPTD8HmYse3OQ==~3290420~4337975; 8bac6ca36dd7fb6e1a5df804509d965c=0c86393222528be065d396c1cb85b093; 91d1e5aa2d49f01a98ca619ad658207a=8a1d967d5717d68ece76a567f1b31bb0"; // Replace with your actual cookie
  const API_ENDPOINT =
    "https://developers.cathaypacific.com/hackathon-apigw/hackathon-middleware/v1/vertex-ai/google-gemini";

  const sendMessage = async () => {
    if (input.trim().length === 0) return;

    const userInput = input.trim();
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", text: userInput },
    ]);
    setInput("");

    const standardizedLocation = normalizeLocation(userInput);
    const lowerInput = userInput.toLowerCase();

    // Check for specific keyword "sky pier"
    if (lowerInput.includes("sky pier")) {
      handleSkyPierQuery();
    } else if (awaitingDestination) {
      if (standardizedLocation) {
        setDestination(standardizedLocation);
        setAwaitingDestination(false);
        setAwaitingOrigin(true);

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: "bot",
            text: `Great! You're heading to ${standardizedLocation}. Where are you departing from?`,
          },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: "bot",
            text: `I didn't recognize that destination. Please enter a valid location.`,
          },
        ]);
      }
    } else if (awaitingOrigin) {
      if (standardizedLocation) {
        setOrigin(standardizedLocation);
        setAwaitingOrigin(false);

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: "bot",
            text: `I've found the most optimal route from ${standardizedLocation} to ${destination} with the least carbon emissions and the cheapest fare.`,
            cta: true,
            ctaText: "View Suggested Journey",
            navigationPath: "/(tabs)", // Use existing navigation path
          },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: "bot",
            text: `I didn't recognize that origin. Please enter a valid location.`,
          },
        ]);
      }
    } else {
      // Use Gemini API as fallback
      setLoading(true);
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("apiKey", API_KEY);
        myHeaders.append("Cookie", COOKIE);

        const raw = JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: userInput,
                },
              ],
            },
          ],
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow" as RequestRedirect,
        };

        const response = await fetch(API_ENDPOINT, requestOptions);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const botText = data.candidates[0].content.parts[0].text;

        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "bot", text: botText },
        ]);
        setLoading(false);

        if (botText && !isSpeaking) {
          Speech.speak(botText);
          setIsSpeaking(true);
        }
      } catch (error: any) {
        console.error("Error:", error.message);
        setLoading(false);
        showMessage({
          message: "Error sending message",
          description: error.message,
          type: "danger",
          icon: "danger",
          duration: 5000,
        });
      }
    }
  };

  const toggleSpeech = () => {
    console.log("isSpeaking", isSpeaking);
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    } else {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage.text) {
        Speech.speak(lastMessage.text);
        setIsSpeaking(true);
      }
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{
            paddingHorizontal: normalize(16),
            paddingBottom: normalize(12),
          }}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {messages.map((message, index) => (
            <View
              key={index}
              style={{
                padding: 8,
                marginVertical: normalize(6),
                borderRadius: 8,
                maxWidth: "80%",
                alignSelf: message.type === "user" ? "flex-end" : "flex-start",
                backgroundColor:
                  message.type === "user" ? "#006564" : "#f0f0f0",
              }}
            >
              <Text
                style={{
                  fontSize: normalize(16),
                  color: message.type === "user" ? "#FFFFFF" : "#000000",
                }}
              >
                {message.text}
              </Text>
              {message.cta && (
                <TouchableOpacity
                  onPress={() => {
                    const path = (message as any).navigationPath || "/(tabs)";
                    router.push({
                      pathname: path,
                      params: { origin, destination },
                    });
                  }}
                  style={{
                    marginTop: 10,
                    backgroundColor: "#006564",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 20,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "600" }}>
                    {message.ctaText || "View Suggested Journey"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            padding: normalize(12),
            borderTopWidth: 1,
            borderTopColor: "#ddd",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={toggleSpeech}>
            {isSpeaking ? (
              <FontAwesome
                name="microphone-slash"
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
            ) : (
              <FontAwesome
                name="microphone"
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
            )}
          </TouchableOpacity>
          <TextInput
            style={{
              flex: 1,
              paddingVertical: normalize(8),
              paddingHorizontal: normalize(12),
              backgroundColor: "#f0f0f0",
              borderRadius: 20,
              fontSize: normalize(16),
            }}
            placeholder="Type your message here"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />
          <TouchableOpacity
            onPress={sendMessage}
            style={{
              marginLeft: 8,
              alignItems: "center",
              backgroundColor: "#006564",
              paddingVertical: normalize(8),
              paddingHorizontal: normalize(12),
              borderRadius: 20,
            }}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={{ color: "#fff", fontWeight: "600" }}>SEND</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <FlashMessage position="top" />
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
