import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
}

const OrdersScreen = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    const userId = await AsyncStorage.getItem('userId');

    if (!token || !userId) {
      Alert.alert('Erreur', 'Utilisateur non connecté');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5006/orders/client-orders/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data.data);  // Assurez-vous que la structure de la réponse correspond
      } else {
        const errorData = await response.json();
        Alert.alert('Erreur', `Erreur lors de la récupération des commandes: ${errorData.message}`);
      }
    } catch (error) {
      Alert.alert('Erreur', `Erreur de connexion au serveur: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchOrders();
    }, [])
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Chargement des commandes...</Text>
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noOrdersText}>Aucune commande trouvée.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {orders.map((order) => (
        <View key={order.id} style={styles.orderContainer}>
          <Text style={styles.orderItem}>Commande ID : {order.id}</Text>
          <Text style={styles.orderItem}>Date : {new Date(order.date).toLocaleDateString()}</Text>
          <Text style={styles.orderItem}>Total : {order.total} €</Text>
          <Text style={styles.orderItem}>Statut : {order.status}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  noOrdersText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  orderContainer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 1,
  },
  orderItem: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
});

export default OrdersScreen;
