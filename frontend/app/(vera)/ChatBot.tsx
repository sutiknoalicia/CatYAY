import { normalize } from "@/helpers/useScaling";
import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from "react-native";

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState([
    { type: "bot", text: "We have searched all flights from 10 Nov to 14 Dec. Unfortunately, we cannot locate any available flights." },
    { type: "user", text: "What about a flight from Jakarta to Hong Kong?" },
    { type: "bot", text: "Based on your previous enquiry, I'll check the flight status from Jakarta (CGK) to Hong Kong (HKG) - No date specified." },
    { type: "user", text: "For tomorrow, it’s urgent" },
    { type: "bot", text: "You are searching the flight from CGK to HKG on Thu 07 Nov 2024. There are 2 flights in total." },
  ]);
  const [input, setInput] = useState("");
  
  const scrollViewRef = useRef<ScrollView>(null);

  const sendMessage = () => {
    if (input.trim().length === 0) return;
    setMessages((prevMessages) => [...prevMessages, { type: "user", text: input }]);
    setInput("");
    // Here you can add bot response logic or API calls to generate bot responses
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
                backgroundColor: message.type === "user" ? "#DCF8C6" : "#f0f0f0",
              }}
            >
              <Text style={{ fontSize: 16, color: "#333" }}>{message.text}</Text>
            </View>
          ))}
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            padding: 8,
            borderTopWidth: 1,
            marginBottom: 24,
            borderTopColor: "#ddd",
            alignItems: "center",
          }}
        >
          <TextInput
            style={{
              flex: 1,
              paddingVertical: 8,
              paddingHorizontal: 12,
              backgroundColor: "#f0f0f0",
              borderRadius: 20,
              fontSize: 16,
            }}
            placeholder="Type your message here"
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity
            onPress={sendMessage}
            style={{
              marginLeft: 8,
              backgroundColor: "#006564",
              paddingVertical: 10,
              paddingHorizontal: 20,
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
