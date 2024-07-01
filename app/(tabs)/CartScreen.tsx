import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button, FlatList } from 'react-native';

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
];

const CartScreen: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const handleQuantityChange = (id: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      )
    );
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemDetails}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
          <View style={styles.quantityContainer}>
            <Button title="-" onPress={() => handleQuantityChange(item.id, item.quantity - 1)} />
            <Text style={styles.quantity}>{item.quantity}</Text>
            <Button title="+" onPress={() => handleQuantityChange(item.id, item.quantity + 1)} />
          </View>
        </View>
      </View>
    </View>
  );

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.footer}>
        <Text style={styles.totalPrice}>US ${totalPrice.toFixed(2)}</Text>
        <Button title="CHECKOUT" onPress={() => alert('Proceed to Checkout')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
    padding: 10,
  },
  cartItem: {
    marginBottom: 15,
  },
  itemDetails: {
    flexDirection: 'row',
    marginTop: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  itemImage: {
    width: 50,
    height: 50,
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;
