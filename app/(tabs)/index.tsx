import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "expo-router";
import { getEntries, JournalEntry } from "../../src/journal";



export default function HomeScreen() {
  const [latest, setLatest] = useState<JournalEntry | null>(null);

  useFocusEffect(
    useCallback(() => {
      let mounted = true;

      (async () => {
        const entries = await getEntries();
        if (mounted) setLatest(entries[0] ?? null);
      })();

      return () => {
        mounted = false;
      };
    }, [])
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>🌈 DuoJournal</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today’s Prompt</Text>
          <Text style={styles.cardText}>What made you smile today?</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recent Entry</Text>
          <Text style={styles.cardText}>
            {latest ? latest.text : "No entries yet. Save one in Write 💕"}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFF5FA",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF5FA",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },
  cardText: {
    fontSize: 15,
    color: "#555",
  },
});
