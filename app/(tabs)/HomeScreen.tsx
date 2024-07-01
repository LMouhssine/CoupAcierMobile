import React from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const data = [
  { id: '1', title: 'FERS PLATS', image: require('../../assets/images/barres_carrees.gif') },
  { id: '2', title: 'CORNIÈRES À AILES ÉGALES', image: require('../../assets/images/CoupAcierApp.png') },
  { id: '3', title: 'CORNIÈRES À AILES INÉGALES', image: require('../../assets/images/CoupAcierApp.png') },
  { id: '4', title: 'FERS EN T', image: require('../../assets/images/CoupAcierApp.png') },
];

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconCircle} onPress={() => navigation.navigate('Notifications')}>
          <Icon name="bell" type="font-awesome" color="#000" size={30} />
        </TouchableOpacity>
        <View style={styles.iconCircle}>
          <Icon name="user" type="font-awesome" color="#000" size={30} />
        </View>
      </View>
      <TextInput style={styles.search} placeholder="Que cherchez-vous ?" />
      <Text style={styles.title}>Produits</Text>
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Icon name="image" type="font-awesome" size={100} color="black" />
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    marginHorizontal: 10,
    marginBottom: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    margin: 10,
  },
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: 'yellow',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  cardText: {
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
