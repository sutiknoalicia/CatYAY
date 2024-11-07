import { FontFamilies } from "@/helpers/FontFamiles";
import { normalize } from "@/helpers/useScaling";
import { router } from "expo-router";
import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from "react-native";

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi, I'm Vera - your virtual assistant. How may I help you today?" },
    { type: "bot", text: "Simply share your desired destination, and I'll provide you with the most efficient routes, highlighting options with the lowest carbon emissions and the most affordable prices." },
  ]);
  const [input, setInput] = useState("");
  const [destination, setDestination] = useState<string | null>(null);
  const [origin, setOrigin] = useState<string | null>(null);
  const [awaitingOrigin, setAwaitingOrigin] = useState(false);
  const [awaitingDestination, setAwaitingDestination] = useState(true);

  const scrollViewRef = useRef<ScrollView>(null);

  const locationMap: { [key: string]: string } = {
    "shenzhen": "SZX",
    "szx": "SZX",
    "fyg": "FYG",
    "jakarta": "CGK",
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

  const sendMessage = () => {
    if (input.trim().length === 0) return;

    const userInput = input.trim();
    setMessages((prevMessages) => [...prevMessages, { type: "user", text: userInput }]);
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
          { type: "bot", text: `Great! You're heading to ${standardizedLocation}. Where are you departing from?` },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "bot", text: `I didn't recognize that destination. Please enter a valid location.` },
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
          { type: "bot", text: `I didn't recognize that origin. Please enter a valid location.` },
        ]);
      }
    } else {
      // Handle other inputs or reset the conversation
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "bot", text: `I'm here to help with your travel plans. Please enter your destination or origin.` },
      ]);
    }

    setInput("");
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90} // Adjust this value if needed for correct positioning
    >
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ paddingHorizontal: normalize(16), paddingBottom: normalize(12) }}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag" // Dismisses the keyboard when scrolling
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
                backgroundColor: message.type === "user" ? "#006564" : "#f0f0f0",
              }}
            >
              <Text style={{ fontSize: normalize(16), color: message.type === "user" ? "#FFFFFF" : "#000000" }}>
                {message.text}
              </Text>
              {message.cta && (
                <TouchableOpacity
                  onPress={() => {
                    // Use the specified navigation path if available
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
            marginBottom: normalize(24),
            borderTopColor: "#ddd",
            alignItems: "center",
          }}
        >
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
            onSubmitEditing={sendMessage} // Allow sending message with the keyboard's submit button
            returnKeyType="send"
          />
          <TouchableOpacity
            onPress={sendMessage}
            style={{
              marginLeft: 8,
              width: "20%",
              alignItems: "center",
              backgroundColor: "#006564",
              paddingVertical: normalize(8),
              paddingHorizontal: normalize(12),
              borderRadius: 20,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>SEND</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
