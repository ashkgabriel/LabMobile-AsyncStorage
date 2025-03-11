import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import ListaRegistros from "./ListaRegistros";

export default function Produto({ onSalvarDados }) {
  const [produto, setProduto] = useState("");
  const [valor, setValor] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const handleSalvar = () => {
    if (quantidade && produto && valor) {
      onSalvarDados({ produto, valor, quantidade });
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

  const verRegistrosSalvos = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Quantidade:</Text>
        <TextInput
          style={[styles.input, { width: "25%" }]}
          maxLength={6}
          onChangeText={setQuantidade}
          value={quantidade}
          placeholder="Quantidade"
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Produto:</Text>
        <TextInput
          style={[styles.input, { width: "75%" }]}
          onChangeText={setProduto}
          value={produto}
          maxLength={20}
          placeholder="Nome do Produto"
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Valor:</Text>
        <TextInputMask
          style={[styles.input, { width: "25%" }]}
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
      <Text style={styles.label}>Quantidade: {quantidade}</Text>
      <Text style={styles.label}>Produto: {produto}</Text>
      <Text style={styles.label}>Valor: {valor}</Text>
      <View style={styles.inputRow}>
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
        style={[styles.button, { width: "65%", backgroundColor: "blue" }]}
        onPress={verRegistrosSalvos}
      >
        <Text style={styles.buttonText}>Ver Registros Salvos</Text>
      </TouchableOpacity>
      {/* <ListaRegistros /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "flex-end",
    justifyContent: "center",
    padding: 25,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
    width: "80%",
    marginBottom: -10,
    marginLeft: 5,
    marginTop: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
  button: {
    padding: 10,
    margin: 10,
    width: "30%",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
