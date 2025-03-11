import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Produto from "./produto";

export default function Storage() {
    const salvarNoAsyncStorage = async (qtd, produto, valor) => {
        try {
            const registro = {
                qtd,
                produto,
                valor
            }
            // Recupera os registros anteriores do AsynStorage
            const registrosExistentes = await AsyncStorage.getItem('registros');
            const registros = registrosExistentes ? JSON.parse(registrosExistentes) : [];

            // Adiciona o novo registro
            registros.push(registro);

            // Armazena novamente no AsyncStorage
            await AsyncStorage.setItem('registros', JSON.stringify(registros));
            
            Alert.alert('Sucesso', 'Registro salvo com sucesso');
        } catch (error) {
            console.log('Erro ao salvar o registro', error);
            Alert.alert('Erro', 'Erro ao salvar o registro');
        }
    }
    return (
        <View>
            <Produto onSalvarDados={salvarNoAsyncStorage} />
        </View>
    )
};
