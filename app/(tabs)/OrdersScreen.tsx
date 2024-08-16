import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notLoggedInImage from '../../assets/images/order.png';

const OrdersScreen = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clientId, setClientId] = useState<number | null>(null);

  useEffect(() => {
    const retrieveClientId = async () => {
      try {
        const storedClientId = await AsyncStorage.getItem('userId');
        if (storedClientId) {
          const numericClientId = Number(storedClientId);
          setClientId(numericClientId);
          console.log("Client ID trouvé:", numericClientId);
        } else {
          console.log("Aucun client ID trouvé dans AsyncStorage");
          setClientId(null);
        }
      } catch (err) {
        console.error("Erreur lors de la récupération de l'ID client:", err);
        setClientId(null);
      }
    };

    retrieveClientId();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (clientId === null) {
        console.log("Aucun ID client disponible pour récupérer les commandes");
        setLoading(false);
        return; // Ne pas exécuter la requête si clientId est null
      }

      try {
        let storedOrders = await AsyncStorage.getItem('orders');
        let orders = storedOrders ? JSON.parse(storedOrders) : [];

        // Filter the orders for the logged-in client
        const clientOrders = orders.filter(order => order.idClient == clientId);

        if (clientOrders.length === 0) {
          console.log("Aucune commande trouvée pour le client avec ID:", clientId);
        }
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
    return (
      <View style={styles.container}>
        <Text>Chargement des commandes...</Text>
      </View>
    );
  }

  if (clientId === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.notLoggedInText}>Merci de vous connecter pour voir vos commandes.</Text>
        <Image source={notLoggedInImage} style={styles.notLoggedInImage} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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
        orders.length > 0 ? (
          orders.map((order) => (
            <View key={order.idCommande} style={styles.orderContainer}>
              <Text style={styles.orderText}>Order ID: {order.idCommande}</Text>
              <Text style={styles.orderText}>Status: {order.statusCommande}</Text>
              <Text style={styles.orderText}>Type: {order.type}</Text>
              <Text style={styles.orderText}>Date de Livraison: {new Date(order.dateLivraison).toLocaleString()}</Text>
              <Text style={styles.orderText}>Référence: {order.reference}</Text>
              <Text style={styles.orderText}>Montant Total: {order.totalAmount} €</Text>
              <Text style={styles.orderText}>Titulaire de la carte: {order.cardHolderName}</Text>
            </View>
          ))
        ) : (
          <Text>Aucune commande trouvée pour ce client.</Text>
        )
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  notLoggedInImage: {
    width: 320,
    height: 320,
    marginBottom: 16,
  },
  notLoggedInText: {
    fontSize: 24,
    color: '#333',
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 25,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default OrdersScreen;
