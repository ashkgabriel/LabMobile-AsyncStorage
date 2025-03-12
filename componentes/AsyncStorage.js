import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import ListaRegistros from "./ListaRegistros";
import Produto from "./produto";

export default function Storage() {
  const [registros, setRegistros] = useState([]);
  const [telaAtual, setTelaAtual] = useState("produto");

  const salvarNoAsyncStorage = async (quantidade, produto, valor) => {
    try {
      const registro = {
        quantidade,
        produto,
        valor,
      };
      // Recupera os registros anteriores do AsynStorage
      const registrosExistentes = await AsyncStorage.getItem("registros");
      const registros = registrosExistentes
        ? JSON.parse(registrosExistentes)
        : [];

      // Adiciona o novo registro
      registros.push(registro);

      // Armazena novamente no AsyncStorage
      await AsyncStorage.setItem("registros", JSON.stringify(registros));

      Alert.alert("Sucesso", "Registro salvo com sucesso");
      carregarRegistros();
    } catch (error) {
      console.log("Erro ao salvar o registro", error);
      Alert.alert("Erro", "Erro ao salvar o registro");
    }
  };

  const carregarRegistros = async () => {
    try {
      const registrosExistentes = await AsyncStorage.getItem("registros");
      const registros = registrosExistentes
        ? JSON.parse(registrosExistentes)
        : [];
      setRegistros(registros);
    } catch (erro) {
      console.error("Erro ao carregar registros", erro);
      Alert.alert("Erro", "Erro ao carregar registros");
    }
  };

  const deleteItem = async (index) => {
    try {
      const novosRegistros = [...registros];
      novosRegistros.splice(index, 1);
      await AsyncStorage.setItem("registros", JSON.stringify(novosRegistros));
      setRegistros(novosRegistros);
      Alert.alert("Sucesso", "Registro apagado com sucesso");
    } catch (error) {
      console.log("Erro ao apagar registro", error);
      Alert.alert("Erro", "Erro ao apagar registro");
    }
  };

  const deleteAll = async () => {
    try {
      await AsyncStorage.removeItem("registros");
      setRegistros([]);
      Alert.alert("Sucesso", "Todos os registros foram apagados");
    } catch (error) {
      console.log("Erro ao apagar todos os registros", error);
      Alert.alert("Erro", "Erro ao apagar todos os registros");
    }
  };

  useEffect(() => {
    carregarRegistros();
  }, []);

  return (
    <View style={styles.container}>
      {telaAtual === "produto" ? (
        <Produto
          onSalvarDados={salvarNoAsyncStorage}
          telaAtual={telaAtual}
          setTelaAtual={setTelaAtual}
        />
      ) : (
        <ListaRegistros
          registros={registros}
          setTelaAtual={setTelaAtual}
          onDeleteItem={deleteItem}
          onDeleteAll={deleteAll}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 10,
  },
});
