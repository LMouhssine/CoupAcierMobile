import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: '' }} style={styles.profileIcon} />
      </View>
      <View style={styles.searchBar}>
        <Text style={styles.searchText}>Que cherchez-vous ?</Text>
        <Image source={{ uri: '' }} style={styles.scanIcon} />
      </View>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Image source={{ uri: '' }} style={styles.menuImage} />
          <Text style={styles.menuText}>FERS PLATS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Image source={{ uri: '' }} style={styles.menuImage} />
          <Text style={styles.menuText}>FERS PLATS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Image source={{ uri: '' }} style={styles.menuImage} />
          <Text style={styles.menuText}>FERS EN T</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Image source={{ uri: '' }} style={styles.menuImage} />
          <Text style={styles.menuText}>FERS EN T</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  header: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  profileIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 5,
    margin: 10,
    padding: 10,
  },
  searchText: {
    color: '#999',
  },
  scanIcon: {
    width: 24,
    height: 24,
  },
  menu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: 10,
  },
  menuItem: {
    width: '45%',
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
  },
  menuImage: {
    width: 50,
    height: 50,
  },
  menuText: {
    marginTop: 10,
    color: '#000',
    textAlign: 'center',
  },
});

export default HomeScreen;
