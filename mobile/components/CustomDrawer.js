import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

const CustomDrawer = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView>
        <DrawerItem
          label="App de Finanças"
          labelStyle={styles.drawerLabel}
          onPress={() => navigation.navigate('Home')}
        />
        <DrawerItem
          label="Receitas"
          labelStyle={styles.drawerLabel}
          onPress={() => navigation.navigate('Receitas')}
        />
        <DrawerItem
          label="Despesas"
          labelStyle={styles.drawerLabel}
          onPress={() => navigation.navigate('Despesas')}
        />
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  drawerLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
    marginLeft: 16,
  },
});

export default CustomDrawer;
