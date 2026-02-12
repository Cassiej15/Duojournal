import React, { useCallback, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, FlatList, Pressable, StyleSheet } from "react-native";
import { useFocusEffect } from "expo-router";
import { getEntries, JournalEntry } from "../../src/journal";

export default function SearchScreen() {
  const [q, setQ] = useState("");
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      (async () => {
        const all = await getEntries();
        if (mounted) setEntries(all);
      })();
      return () => {
        mounted = false;
      };
    }, [])
  );

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return entries;
    return entries.filter((e) => {
      const hay = `${e.text} ${e.prompt ?? ""}`.toLowerCase();
      return hay.includes(query);
    });
  }, [q, entries]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Search</Text>

        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="Search entries…"
          style={styles.search}
          autoCapitalize="none"
        />

        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.meta}>
                {item.author} • {new Date(item.createdAt).toLocaleDateString()}
              </Text>
              {item.prompt ? <Text style={styles.prompt}>{item.prompt}</Text> : null}
              <Text style={styles.body}>{item.text}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>No entries yet. Save one in Write 💕</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFF5FA" },
  container: { flex: 1, padding: 20, gap: 12 },
  title: { fontSize: 26, fontWeight: "800" },
  search: { backgroundColor: "#fff", borderRadius: 14, padding: 12, borderWidth: 1, borderColor: "#f0cde0" },
  card: { backgroundColor: "#fff", borderRadius: 16, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: "#f4d7e6" },
  meta: { fontSize: 12, color: "#666", marginBottom: 6 },
  prompt: { fontSize: 13, fontWeight: "700", marginBottom: 6 },
  body: { fontSize: 15, color: "#222" },
  empty: { color: "#666", marginTop: 20 },
});
