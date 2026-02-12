import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function WriteScreen() {
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Entry</Text>

      <TextInput
        style={styles.input}
        placeholder="Write your thoughts here..."
        multiline
        value={text}
        onChangeText={setText}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save Entry</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    minHeight: 220,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FF5F9E",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
});
