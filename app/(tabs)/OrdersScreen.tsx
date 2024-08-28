import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Order {
  idCommande: number;
  dateCommande: string;
  statusCommande: string;
  type: string;
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
        // Assurez-vous que la structure des données est correcte
        if (Array.isArray(data.data)) {
          setOrders(data.data);
        } else {
          Alert.alert('Erreur', 'Les données reçues ne sont pas valides.');
        }
      } else {
        const errorData = await response.json();
        Alert.alert('Erreur', `Erreur lors de la récupération des commandes: ${errorData.message}`);
      }
    } catch (error) {
      Alert.alert('Erreur', `Erreur de connexion au serveur: ${(error as Error).message}`);
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
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Chargement des commandes...</Text>
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
    <View style={styles.container}>
      <Text style={styles.header}>Mes Commandes</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {orders.map((order) => (
          <View key={order.idCommande} style={styles.orderContainer}>
            <Text style={styles.orderItem}><Text style={styles.boldText}>Commande ID :</Text> {order.idCommande}</Text>
            <Text style={styles.orderItem}><Text style={styles.boldText}>Date :</Text> {new Date(order.dateCommande).toLocaleDateString()}</Text>
            <Text style={styles.orderItem}><Text style={styles.boldText}>Statut :</Text> {order.statusCommande}</Text>
            <Text style={styles.orderItem}><Text style={styles.boldText}>Type :</Text> {order.type}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
    marginTop: 10,
  },
  noOrdersText: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
  orderContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  orderItem: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 6,
    color: '#333',
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default OrdersScreen;
