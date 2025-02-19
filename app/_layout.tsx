import { ModalProvider } from "@/components/Modal/ModalProvider";
import { Stack } from "expo-router";
import { Text, StyleSheet, View } from "react-native";

export default function RootLayout() {


  return (
    <ModalProvider>
      <View style={styles.container}>
        {/* Main Navigation Stack */}
        <View style={styles.content}>
          <Stack screenOptions={{ headerTitle: "Workout Tracker" }} />
        </View>

        {/* Persistent Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Created By Devin Draizin</Text>
        </View>
      </View>
    </ModalProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1, // Allows the main content to take up most of the screen
  },
  footer: {
    height: 50,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "white",
    fontSize: 16,
  },
});