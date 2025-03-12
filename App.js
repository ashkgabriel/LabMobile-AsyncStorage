import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "./componentes/AsyncStorage";

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.cabecalho}>Armazenamento Local</Text>
        <AsyncStorage />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  cabecalho: {
    marginTop: 40,
    marginBottom: 20,
    fontSize: 22,
    fontWeight: "bold",
    fontStyle: "italic",
    textAlign: "center",
  },
});
