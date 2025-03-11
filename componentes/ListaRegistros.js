import React from 'react';
import { FlatList, Text, View } from 'react-native';

export default function ListaRegistros({ registros }) {
    
    return (
        <View style={{ marginTop: 20 }}>
            <Text>Registros</Text>
            <FlatList
                data={registros}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>{item.produto}</Text>
                        <Text>{item.valor}</Text>
                        <Text>{item.qtd}</Text>
                    </View>
                )}
            />
        </View>
    )
};
