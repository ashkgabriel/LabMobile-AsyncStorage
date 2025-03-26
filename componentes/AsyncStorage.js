import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ListaRegistros from "./ListaRegistros";
import Produto from "./produto";

export default function Storage() {
  const [registros, setRegistros] = useState([]);
  const [telaAtual, setTelaAtual] = useState("produto");
  const [modalVisible, setModalVisible] = useState(false);

  const salvarNoAsyncStorage = async (quantidade, produto, valor) => {
    try {

      const registro = {
        quantidade: String(quantidade),
        produto: String(produto),
        valor: String(valor),
      };

      const registrosExistentes = await AsyncStorage.getItem("registros");
      const registros = registrosExistentes
        ? JSON.parse(registrosExistentes)
        : [];


      registros.push(registro);


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
      let registros = registrosExistentes
        ? JSON.parse(registrosExistentes)
        : [];

      registros = registros.map((reg) => ({
        quantidade: String(reg.quantidade),
        produto: String(reg.produto),
        valor: String(reg.valor),
      }));

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

  const deleteAll = () => {
    setModalVisible(true);
  };

  const confirmarDeleteAll = async () => {
    try {
      await AsyncStorage.removeItem("registros");
      setRegistros([]);
      Alert.alert("Sucesso", "Todos os registros foram apagados");
      setModalVisible(false);
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Confirmação</Text>
            <Text style={styles.modalText}>
              Tem certeza que deseja apagar todos os registros?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonDelete]}
                onPress={confirmarDeleteAll}
              >
                <Text style={styles.buttonText}>Sim, apagar tudo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "48%",
  },
  buttonCancel: {
    backgroundColor: "#6c757d",
  },
  buttonDelete: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
