import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

const { width } = Dimensions.get('window');

const AMBER = '#c4823c';
const AMBER_LIGHT = '#f0c06a';
const CREAM = '#f5e6cc';
const DARK_BG = '#1a1208';
const DARK_SURFACE = '#0a0602';

const CHIPS = [
  { label: '☕  Popular picks',      prompt: "What's your most popular coffee?" },
  { label: '✦  Seasonal specials',   prompt: 'Do you have any seasonal specials?' },
  { label: '📋  Place an order',     prompt: "I'd like to place an order" },
  { label: '🥐  Food menu',          prompt: 'What food do you serve?' },
];

export default function WelcomeView({ scrollToBottom, sendMessage, setInputBarText, inputBarText }) {
  // Orb float animation
  const orbY = useRef(new Animated.Value(0)).current;
  // Pulsing rings
  const ring1 = useRef(new Animated.Value(1)).current;
  const ring2 = useRef(new Animated.Value(1)).current;
  const ring3 = useRef(new Animated.Value(1)).current;
  // Status dot blink
  const dotOpacity = useRef(new Animated.Value(1)).current;
  // Staggered fade-ups
  const eyebrowAnim   = useRef(new Animated.Value(0)).current;
  const headlineAnim  = useRef(new Animated.Value(0)).current;
  const subtitleAnim  = useRef(new Animated.Value(0)).current;
  const chipsAnim     = useRef(new Animated.Value(0)).current;
  const statusAnim    = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Orb float
    Animated.loop(
      Animated.sequence([
        Animated.timing(orbY, { toValue: -8, duration: 3000, useNativeDriver: true }),
        Animated.timing(orbY, { toValue: 0,  duration: 3000, useNativeDriver: true }),
      ])
    ).start();

    // Pulse rings with staggered delays
    const makeRingLoop = (anim, delay) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, { toValue: 1.04, duration: 2000, useNativeDriver: true }),
          Animated.timing(anim, { toValue: 1,    duration: 2000, useNativeDriver: true }),
        ])
      );
    makeRingLoop(ring1, 0).start();
    makeRingLoop(ring2, 600).start();
    makeRingLoop(ring3, 1200).start();

    // Status dot blink
    Animated.loop(
      Animated.sequence([
        Animated.timing(dotOpacity, { toValue: 0.25, duration: 1000, useNativeDriver: true }),
        Animated.timing(dotOpacity, { toValue: 1,    duration: 1000, useNativeDriver: true }),
      ])
    ).start();

    // Staggered content fade-up
    const fadeUp = (anim, delay) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 700,
        delay,
        useNativeDriver: true,
      });

    Animated.parallel([
      fadeUp(eyebrowAnim,  200),
      fadeUp(headlineAnim, 400),
      fadeUp(subtitleAnim, 600),
      fadeUp(chipsAnim,    800),
      fadeUp(statusAnim,  1000),
    ]).start();
  }, []);

  const fadeUpStyle = (anim) => ({
    opacity: anim,
    transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }],
  });

  const handleChip = (prompt) => {
    setInputBarText(prompt);
  };

  const handleSend = () => {
    if (inputBarText.trim().length === 0) return;
    sendMessage();
  };

  return (
    <View style={styles.root}>
      {/* Background rings */}
      <View style={styles.ringsContainer} pointerEvents="none">
        {[ring1, ring2, ring3].map((r, i) => (
          <Animated.View
            key={i}
            style={[
              styles.ring,
              {
                width:  220 + i * 120,
                height: 220 + i * 120,
                borderColor: `rgba(196,130,60,${0.22 - i * 0.06})`,
                transform: [{ scale: r }],
              },
            ]}
          />
        ))}

        {/* Orb */}
        <Animated.View style={[styles.orbWrap, { transform: [{ translateY: orbY }] }]}>
          <View style={styles.orb}>
            <View style={styles.orbHighlight} />
          </View>
        </Animated.View>
      </View>

      {/* Scrollable content */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.Text style={[styles.eyebrow, fadeUpStyle(eyebrowAnim)]}>
          Brewed &amp; Powered by AI
        </Animated.Text>

        <Animated.Text style={[styles.headline, fadeUpStyle(headlineAnim)]}>
          Good morning,{'\n'}
          <Text style={styles.headlineItalic}>what can I get you?</Text>
        </Animated.Text>

        <Animated.Text style={[styles.subtitle, fadeUpStyle(subtitleAnim)]}>
          Your personal café guide — orders, recommendations &amp; more
        </Animated.Text>

        <View style={styles.divider} />

        {/* Suggestion chips */}
        <Animated.View style={[styles.chips, fadeUpStyle(chipsAnim)]}>
          {CHIPS.map((chip) => (
            <TouchableOpacity
              key={chip.label}
              style={styles.chip}
              onPress={() => handleChip(chip.prompt)}
              activeOpacity={0.7}
            >
              <Text style={styles.chipText}>{chip.label}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Status */}
        <Animated.View style={[styles.status, fadeUpStyle(statusAnim)]}>
          <Animated.View style={[styles.dot, { opacity: dotOpacity }]} />
          <Text style={styles.statusText}>Ready to take your order</Text>
        </Animated.View>
      </ScrollView>

      {/* Input bar */}
      <View style={styles.inputZone}>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.inputField}
            placeholder="Ask me anything about our menu…"
            placeholderTextColor="rgba(245,230,204,0.28)"
            value={inputBarText}
            onChangeText={setInputBarText}
            onSubmitEditing={handleSend}
            returnKeyType="send"
            multiline={false}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSend} activeOpacity={0.8}>
            <Text style={styles.sendArrow}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: DARK_BG,
  },

  // ── Rings & Orb ──────────────────────────────────────────
  ringsContainer: {
    position: 'absolute',
    top: -80,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: width,
    height: 500,
  },
  ring: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 1,
    top: 0,
    alignSelf: 'center',
  },
  orbWrap: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
  },
  orb: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: AMBER,
    shadowColor: AMBER,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 40,
    elevation: 20,
    overflow: 'hidden',
  },
  orbHighlight: {
    position: 'absolute',
    top: 10,
    left: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,220,140,0.55)',
  },

  // ── Content ───────────────────────────────────────────────
  content: {
    paddingTop: 220,
    paddingBottom: 24,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  eyebrow: {
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontSize: 10,
    letterSpacing: 4,
    textTransform: 'uppercase',
    color: 'rgba(196,130,60,0.75)',
    marginBottom: 16,
  },
  headline: {
    fontSize: 36,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontWeight: '300',
    color: CREAM,
    textAlign: 'center',
    lineHeight: 44,
    marginBottom: 12,
  },
  headlineItalic: {
    fontStyle: 'italic',
    color: AMBER_LIGHT,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '300',
    color: 'rgba(245,230,204,0.45)',
    textAlign: 'center',
    letterSpacing: 0.3,
    marginBottom: 28,
  },
  divider: {
    width: 40,
    height: 1,
    backgroundColor: 'rgba(196,130,60,0.3)',
    marginBottom: 28,
  },

  // ── Chips ─────────────────────────────────────────────────
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 32,
  },
  chip: {
    backgroundColor: 'rgba(196,130,60,0.10)',
    borderColor: 'rgba(196,130,60,0.28)',
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '300',
    color: 'rgba(245,230,204,0.78)',
    letterSpacing: 0.3,
  },

  // ── Status ────────────────────────────────────────────────
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#c4823c',
    marginRight: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '300',
    color: 'rgba(245,230,204,0.4)',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  // ── Input zone ────────────────────────────────────────────
  inputZone: {
    backgroundColor: 'rgba(10,6,2,0.85)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(196,130,60,0.14)',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: Platform.OS === 'ios' ? 32 : 20,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(196,130,60,0.22)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
  },
  inputField: {
    flex: 1,
    fontSize: 14,
    fontWeight: '300',
    color: CREAM,
    paddingVertical: 0,
  },
  sendBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: AMBER,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendArrow: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 20,
    marginTop: -1,
  },
});