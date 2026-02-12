import React, { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { addEntry } from "../../src/journal";


export default function WriteScreen() {
  const router = useRouter();
  const { prompt, author } = useLocalSearchParams<{ prompt?: string; author?: string }>();

  const resolvedAuthor = useMemo(() => {
    return author === "daughter" ? "daughter" : "mom";
  }, [author]);

  const [text, setText] = useState("");

  async function handleSave() {
    const trimmed = text.trim();
    if (!trimmed) {
      Alert.alert("Nothing to save", "Write something first 💗");
      return;
    }

    await addEntry({
      id: String(Date.now()),
      author: resolvedAuthor,
      createdAt: new Date().toISOString(),
      text: trimmed,
      prompt: prompt ? String(prompt) : undefined,
    });

    setText("");
    Alert.alert("Saved!", "Your entry was saved on this phone ✅");
    router.push("/(tabs)");
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Write</Text>

        <Text style={styles.label}>Prompt</Text>
        <Text style={styles.prompt}>
          {prompt ? String(prompt) : "Write what’s on your heart today 💗"}
        </Text>

        <Text style={styles.label}>Entry</Text>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Start writing..."
          placeholderTextColor="#999"
          multiline
          style={styles.input}
        />

        <Pressable style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Entry</Text>
        </Pressable>

        <Text style={styles.note}>
          Saved entries stay on this phone (private). Later we can sync mom ↔ daughter.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFF5FA" },
  container: { flex: 1, padding: 20, gap: 12 },
  title: { fontSize: 26, fontWeight: "800" },
  label: { fontSize: 13, fontWeight: "700", color: "#444", marginTop: 8 },
  prompt: { fontSize: 16, color: "#222" },
  input: {
    minHeight: 180,
    borderRadius: 16,
    padding: 14,
    backgroundColor: "#fff",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#f0cde0",
  },
  button: {
    backgroundColor: "#FF4FA3",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 6,
  },
  buttonText: { color: "#fff", fontWeight: "800", fontSize: 16 },
  note: { fontSize: 12, color: "#666", marginTop: 4 },
});
