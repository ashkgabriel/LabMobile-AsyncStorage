import React, { useState } from "react";
import { Alert, Button, Modal, View, StyleSheet, Text, SafeAreaView } from "react-native";

export default function App() {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalQuestion, setModalQuestion] = useState(false);

    // Função  para lidar com a resposta "Sim"
    const handleYes = () => {
        Alert.alert("Resposta", "Você clicou em Sim");
        setModalVisible(false);
    };

    // Função para lidar com a resposta "Não"
    const handleNo = () => {
        Alert.alert("Resposta", "Você clicou em Não");
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Button title="Abrir Modal" onPress={() => setModalVisible(true)} />
                <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Deseja continuar?</Text>
                        <View style={styles.buttonRow}>
                            <Button title="Sim" onPress={handleYes} />
                            <Button title="Não" onPress={handleNo} />
                        </View>
                    </View>
                </Modal>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
    },
    modalView: {
        width: "80%",
        margin: "auto",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
});
