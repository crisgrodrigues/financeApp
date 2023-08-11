import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Feather name="dollar-sign" size={48} color="#333" />
        <Text style={styles.title}>Bem-vindo ao seu aplicativo{'\n'}de finanças</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'roboto-bold',
    color: '#333',
    textAlign: 'center',
  },
});

export default HomeScreen;




