import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

interface FavoriteItem {
  id: string;
  image: string;
  name: string;
  price: number;
}

const initialFavoriteItems: FavoriteItem[] = [
  { id: '1', image: 'https://via.placeholder.com/50', name: 'FERS EN T', price: 193.00 },
  { id: '2', image: 'https://via.placeholder.com/50', name: 'BARRES RONDES', price: 293.65 },
  { id: '3', image: 'https://via.placeholder.com/50', name: 'POUTRELLES HE', price: 230.00 },
];

const FavoritesScreen: React.FC = () => {
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>(initialFavoriteItems);
  const navigation = useNavigation();

  const handleRemoveItem = (id: string) => {
    setFavoriteItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const renderItem = ({ item }: { item: FavoriteItem }) => (
    <View style={styles.favoriteItem}>
      <View style={styles.itemDetails}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>{item.price.toFixed(2)} €</Text>
        </View>
        <TouchableOpacity onPress={() => handleRemoveItem(item.id)} style={styles.removeButton}>
          <Icon name="delete" type="material" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="arrow-back"
          type="material"
          size={28}
          color="#000"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Favoris</Text>
      </View>
      <FlatList
        data={favoriteItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  favoriteItem: {
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  itemInfo: {
    marginLeft: 10,
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemPrice: {
    color: '#888',
    marginTop: 5,
  },
  removeButton: {
    marginLeft: 10,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#ff4444',
  },
});

export default FavoritesScreen;
