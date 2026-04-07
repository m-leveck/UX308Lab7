import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AMBER = '#c4823c';
const CREAM = '#f5e6cc';

export default function MessageBubble({ direction, text }) {
  const isLeft = direction === 'left';

  return (
    <View style={[styles.row, isLeft ? styles.rowLeft : styles.rowRight]}>
      {isLeft && <View style={styles.avatar}><Text style={styles.avatarText}>☕</Text></View>}
      <View style={[styles.bubble, isLeft ? styles.bubbleLeft : styles.bubbleRight]}>
        <Text style={[styles.text, isLeft ? styles.textLeft : styles.textRight]}>
          {text}
        </Text>
      </View>
      {!isLeft && <View style={styles.spacer} />}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 4,
    paddingHorizontal: 12,
  },
  rowLeft: {
    justifyContent: 'flex-start',
  },
  rowRight: {
    justifyContent: 'flex-end',
  },

  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(196,130,60,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(196,130,60,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginBottom: 2,
  },
  avatarText: {
    fontSize: 13,
  },

  bubble: {
    maxWidth: '75%',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bubbleLeft: {
    backgroundColor: '#0a0602',
    borderWidth: 1,
    borderColor: 'rgba(196,130,60,0.18)',
    borderBottomLeftRadius: 4,
  },
  bubbleRight: {
    backgroundColor: AMBER,
    borderBottomRightRadius: 4,
  },

  text: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '300',
  },
  textLeft: {
    color: 'rgba(245,230,204,0.9)',
  },
  textRight: {
    color: '#fff',
  },

  spacer: {
    width: 36,
  },
});