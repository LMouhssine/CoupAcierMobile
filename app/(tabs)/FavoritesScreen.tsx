import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
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
          <Text style={styles.removeButtonText}>Supprimer</Text>
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
          color="#fff"
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
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginLeft: 10,
  },
  favoriteItem: {
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
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
  removeButtonText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default FavoritesScreen;
