import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Button, StyleSheet, TouchableWithoutFeedback, TextInput, FlatList, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ReceitasScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEditingModalVisible, setEditingModalVisible] = useState(false);
  const [nomeReceita, setNomeReceita] = useState('');
  const [valorReceita, setValorReceita] = useState('0.00');
  const [receitas, setReceitas] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [deletingIndex, setDeletingIndex] = useState(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setNomeReceita('');
    setValorReceita('0.00');
    setEditingIndex(null);
  };

  const toggleEditingModal = () => {
    setEditingModalVisible(!isEditingModalVisible);
  };

  const handleAddReceita = () => {
    if (editingIndex !== null) {
      // Edit existing receita
      const updatedReceitas = [...receitas];
      updatedReceitas[editingIndex] = {
        nome: nomeReceita,
        valor: parseFloat(valorReceita),
      };
      setReceitas(updatedReceitas);
      toggleEditingModal();
    } else {
      // Add new receita
      const novaReceita = {
        nome: nomeReceita,
        valor: parseFloat(valorReceita),
      };

      setReceitas([...receitas, novaReceita]);
      toggleModal();
    }
  };

  const handleEditReceita = (index) => {
    const receita = receitas[index];
    setNomeReceita(receita.nome);
    setValorReceita(receita.valor.toFixed(2));
    setEditingIndex(index);
    toggleEditingModal();
  };

  const handleDeleteReceita = (index) => {
    setDeletingIndex(index);
    Alert.alert(
      'Excluir Receita',
      'Tem certeza que deseja excluir esse item?',
      [
        { text: 'Não', onPress: () => setDeletingIndex(null) },
        { text: 'Sim', onPress: () => confirmDeleteReceita(index) },
      ]
    );
  };

  const confirmDeleteReceita = (index) => {
    const updatedReceitas = [...receitas];
    updatedReceitas.splice(index, 1);
    setReceitas(updatedReceitas);
    setDeletingIndex(null);
  };

  const handleValorChange = (text) => {
    const numericValue = parseFloat(text.replace(/[^0-9]/g, '')) / 100;
    setValorReceita(numericValue.toFixed(2));
  };

  const formatCurrency = (value) => {
    const formattedValue = parseFloat(value).toFixed(2);
    return `R$ ${formattedValue.replace('.', ',')}`;
  };

  return (
    <View style={styles.container}>
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{editingIndex !== null ? 'Editar Receita' : 'Adicionar Origem'}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nome da Origem"
                  value={nomeReceita}
                  onChangeText={(text) => setNomeReceita(text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Valor da Origem"
                  value={valorReceita}
                  onChangeText={handleValorChange}
                  keyboardType="numeric"
                />
                <View style={styles.modalButtonContainer}>
                  <Button title="Cancelar" onPress={toggleModal} color="black" />
                  <Button title={editingIndex !== null ? 'Editar' : 'Adicionar'} onPress={handleAddReceita} color="green" />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal visible={isEditingModalVisible} animationType="slide" transparent={true}>
        <TouchableWithoutFeedback onPress={toggleEditingModal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Editar Receita</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nome da Origem"
                  value={nomeReceita}
                  onChangeText={(text) => setNomeReceita(text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Valor da Origem"
                  value={valorReceita}
                  onChangeText={handleValorChange}
                  keyboardType="numeric"
                />
                <View style={styles.modalButtonContainer}>
                  <Button title="Cancelar" onPress={toggleEditingModal} color="black" />
                  <Button title="Salvar" onPress={handleAddReceita} color="green" />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Text style={styles.listaTitulo}>Suas Receitas</Text>

      <FlatList
        data={receitas}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listaConteudo}
        renderItem={({ item, index }) => (
          <View style={styles.receitaItem}>
            <View style={styles.receitaInfo}>
              <Text style={styles.receitaNome}>{item.nome}</Text>
              <Text style={styles.receitaValor}>{formatCurrency(item.valor)}</Text>
            </View>
            <View style={styles.receitaButtons}>
              <TouchableOpacity onPress={() => handleEditReceita(index)} style={styles.button}>
                <Feather name="edit" size={20} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteReceita(index)} style={styles.button}>
                <Feather name="trash-2" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
        <Feather name="plus" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 35,
    right: 22,
    backgroundColor: 'green', 
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
  listaTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  listaConteudo: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  receitaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
    width: '100%',
    alignSelf: 'center',
  },
  receitaInfo: {
    flex: 1,
    marginRight: 10,
  },
  receitaNome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  receitaValor: {
    fontSize: 14,
    color: '#666',
  },
  receitaButtons: {
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: 5,
  },
});

export default ReceitasScreen;
