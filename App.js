import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from './componentes/AsyncStorage';
import Produto from './componentes/produto';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.cabecalho}>Armazenamento Local</Text>
      <AsyncStorage />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cabecalho: {
    marginTop: 100,
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
  }
});
