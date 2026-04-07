import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import MessageBubble from './MessageBubble';
import InputBar from './InputBar';

export default function ChatView({ scrollToBottom, scrollViewRef, sendMessage, messages, setInputBarText, inputBarText }) {
  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.messages}
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() => scrollToBottom()}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg, index) => (
          <MessageBubble
            key={index}
            direction={msg.direction}
            text={msg.text}
          />
        ))}
      </ScrollView>

      <InputBar
        onSendPressed={sendMessage}
        onSizeChange={() => scrollToBottom(false)}
        onChangeText={setInputBarText}
        text={inputBarText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1208',
  },
  messages: {
    flex: 1,
    backgroundColor: '#1a1208',
  },
  messagesContent: {
    paddingTop: 16,
    paddingBottom: 8,
  },
});