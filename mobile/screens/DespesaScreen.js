import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const DespesasScreen = () => {
  return (
    <View style={styles.container}>
      {/* Conteúdo da tela de despesas */}
      <TouchableOpacity style={styles.addButton}>
        <Feather name="plus" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  addButton: {
    position: 'absolute',
    bottom: 35,
    right: 22,
    backgroundColor: '#AF2B29', // Cor vermelha escura
    borderRadius: 40,
    padding: 14,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default DespesasScreen;

