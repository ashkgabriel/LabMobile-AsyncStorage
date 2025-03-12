import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";

export default function Produto({ onSalvarDados, setTelaAtual }) {
  const [produto, setProduto] = useState("");
  const [valor, setValor] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const handleSalvar = () => {
    if (quantidade && produto && valor) {
      onSalvarDados(quantidade, produto, valor);
      limparCampos();
    } else {
      Alert.alert("Erro", "Preencha todos os campos");
    }
  };

  const limparCampos = () => {
    setValor("");
    setProduto("");
    setQuantidade("");
  };

  const verRegistrosSalvos = () => {
    setTelaAtual("registros");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Quantidade:</Text>
          <TextInput
            style={[styles.input, { width: "50%" }]}
            maxLength={6}
            
            onChangeText={setQuantidade}
            value={quantidade}
            placeholder="Quantidade"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Produto:</Text>
          <TextInput
            style={[styles.input, { width: "50%" }]}
            onChangeText={setProduto}
            value={produto}
            maxLength={20}
            placeholder="Nome do Produto"
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Valor:</Text>
          <TextInputMask
            style={[styles.input, { width: "50%" }]}
            type={"money"}
            options={{
              precision: 2,
              separator: ",",
              delimiter: ".",
              unit: "R$",
              suffixUnit: "",
            }}
            value={valor}
            onChangeText={setValor}
            placeholder="Valor do Produto"
            keyboardType="numeric"
            maxLength={10}
          />
        </View>

        <View style={styles.valuesDisplay}>
          <Text style={styles.valueText}>Quantidade: {quantidade}</Text>
          <Text style={styles.valueText}>Produto: {produto}</Text>
          <Text style={styles.valueText}>Valor: {valor}</Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "red" }]}
            onPress={limparCampos}
          >
            <Text style={styles.buttonText}>Limpar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "green" }]}
            onPress={handleSalvar}
          >
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            styles.fullWidthButton,
            { backgroundColor: "blue" },
          ]}
          onPress={verRegistrosSalvos}
        >
          <Text style={styles.buttonText}>Ver Registros Salvos</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    height: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    width: "40%",
  },
  valuesDisplay: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 8,
    marginVertical: 15,
  },
  valueText: {
    fontSize: 16,
    marginVertical: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 15,
  },
  button: {
    padding: 12,
    width: "45%",
    borderRadius: 8,
    alignItems: "center",
  },
  fullWidthButton: {
    width: "90%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
