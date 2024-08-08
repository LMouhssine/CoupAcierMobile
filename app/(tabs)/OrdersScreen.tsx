import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

interface Order {
  idCommande: string;
  statusCommande: string;
  type: string;
  dateLivraison: string;
  reference: string;
  idClient: number;
}

const OrdersScreen = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clientId, setClientId] = useState<number | null>(3); // Remplacez par null si non connecté

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5006/commande');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des commandes');
        }
        const data: Order[] = await response.json();

        // Filtrer les commandes par client
        const clientOrders = data.filter(order => order.idClient === clientId);
        setOrders(clientOrders);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
          Alert.alert('Erreur', error.message);
        } else {
          setError(String(error));
          Alert.alert('Erreur', String(error));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [clientId]);

  if (loading) {
    return <Text>Chargement des commandes...</Text>;
  }

  // Affichage du message si aucun client n'est connecté
  if (clientId === null) {
    return <Text>Merci de vous connecter pour voir vos commandes.</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Icon
          name="arrow-back"
          type="material"
          size={28}
          color="#000"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Orders</Text>
      </View>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        orders.map((order) => (
          <View key={order.idCommande} style={styles.orderContainer}>
            <Text style={styles.orderText}>Order ID: {order.idCommande}</Text>
            <Text style={styles.orderText}>Status: {order.statusCommande}</Text>
            <Text style={styles.orderText}>Type: {order.type}</Text>
            <Text style={styles.orderText}>Date de Livraison: {new Date(order.dateLivraison).toLocaleString()}</Text>
            <Text style={styles.orderText}>Référence: {order.reference}</Text>
          </View>
        ))
      )}
      <Button title="Track Orders" style={styles.trackOrdersButton} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flexGrow: 1,
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
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  orderContainer: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  orderText: {
    fontSize: 16,
    color: '#333',
  },
  trackOrdersButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default OrdersScreen;
