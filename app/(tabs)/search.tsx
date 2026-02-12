import { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function SearchScreen() {
  const [query, setQuery] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Journal</Text>

      <TextInput
        style={styles.search}
        placeholder="Search memories..."
        value={query}
        onChangeText={setQuery}
      />

      <FlatList
        data={[]}
        ListEmptyComponent={
          <Text style={styles.empty}>No entries yet 📖</Text>
        }
        renderItem={() => null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5FA",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
  },
  search: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  empty: {
    textAlign: "center",
    color: "#777",
    marginTop: 40,
  },
});
