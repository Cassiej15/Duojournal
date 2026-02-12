import { ScrollView, StyleSheet, Text, View } from "react-native";


export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🌈 DuoJournal</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today’s Prompt</Text>
        <Text style={styles.cardText}>
          What made you smile today?
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent Entry</Text>
        <Text style={styles.cardText}>
          Start writing your memories 💕
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
