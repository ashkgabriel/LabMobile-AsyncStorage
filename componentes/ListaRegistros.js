import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ListaRegistros({
  registros,
  setTelaAtual,
  onDeleteItem,
  onDeleteAll,
}) {

  const renderEmptyComponent = () => (
    <Text style={styles.emptyText}>Nenhum registro encontrado</Text>
  );

  const renderFooter = () => (
    <>
      <TouchableOpacity
        onPress={() => setTelaAtual("produto")}
        style={styles.botao}
      >
        <Text style={styles.textoBotao}>Voltar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onDeleteAll}
        style={[styles.botao, { backgroundColor: "red" }]}
      >
        <Text style={styles.textoBotao}>Apagar tudo</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registros salvos:</Text>
      <FlatList
        data={registros}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <View style={styles.itemContent}>
              <View>
                <Text>Quantidade: {item.quantidade}</Text>
                <Text>Produto: {item.produto}</Text>
                <Text>Valor: {item.valor}</Text>
              </View>
              <TouchableOpacity
                style={styles.botaoApagar}
                onPress={() => onDeleteItem(index)}
              >
                <Text style={styles.textoBotao}>Apagar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.flatListContent}
        ListEmptyComponent={renderEmptyComponent}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    marginVertical: 20,
  },
  item: {
    backgroundColor: "#e1e1e1",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  itemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  botao: {
    backgroundColor: "blue",
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  botaoApagar: {
    backgroundColor: "red",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    width: 100,
    justifyContent: "center",
  },
  textoBotao: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  flatListContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});
