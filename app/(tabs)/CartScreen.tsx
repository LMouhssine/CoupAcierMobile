import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

interface CartItem {
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

const initialCartItems: CartItem[] = [
  { id: '1', image: 'https://via.placeholder.com/50', name: 'FERS EN T', price: 193.00, quantity: 5 },
  { id: '2', image: 'https://via.placeholder.com/50', name: 'FERS EN T', price: 293.65, quantity: 4 },
  { id: '3', image: 'https://via.placeholder.com/50', name: 'FERS EN T', price: 230.00, quantity: 1 },
  { id: '4', image: 'https://via.placeholder.com/50', name: 'FERS EN T', price: 336.00, quantity: 5 },
  { id: '5', image: 'https://via.placeholder.com/50', name: 'FERS EN T', price: 293.65, quantity: 4 },
  { id: '6', image: 'https://via.placeholder.com/50', name: 'FERS EN T', price: 230.00, quantity: 1 },
  { id: '7', image: 'https://via.placeholder.com/50', name: 'FERS EN T', price: 250.00, quantity: 1 },
];

const CartScreen: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const navigation = useNavigation();

  const handleQuantityChange = (id: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemDetails}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>{item.price.toFixed(2)} €</Text>
          <View style={styles.quantityContainer}>
            <Button title="-" onPress={() => handleQuantityChange(item.id, item.quantity - 1)} />
            <Text style={styles.quantity}>{item.quantity}</Text>
            <Button title="+" onPress={() => handleQuantityChange(item.id, item.quantity + 1)} />
          </View>
        </View>
        <TouchableOpacity onPress={() => handleRemoveItem(item.id)} style={styles.removeButton}>
          <Text style={styles.removeButtonText}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

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
        <Text style={styles.title}>Panier</Text>
      </View>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.footer}>
        <Text style={styles.totalPrice}>{totalPrice.toFixed(2)} €</Text>
        <Button title="VALIDER" onPress={() => alert('Proceed to Checkout')} />
      </View>
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
  cartItem: {
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;
