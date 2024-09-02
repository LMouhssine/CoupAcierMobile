import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Fonction pour générer une référence unique de 11 caractères
const generateUniqueReference = () => {
  const prefix = 'REF';
  const uniqueNumber = (Date.now() % 1000000000).toString().padStart(8, '0'); // Limite à 8 chiffres
  return `${prefix}${uniqueNumber}`.slice(0, 11); // Assure que la longueur totale ne dépasse pas 11 caractères
};

const PaymentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { productInfo }: { productInfo?: any } = route.params || {};

  const [totalAmount, setTotalAmount] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');

  useEffect(() => {
    if (productInfo) {
      const { totalPrice, costDetails } = productInfo;
      if (totalPrice && costDetails) {
        const shippingCost = parseFloat(costDetails.split('Coût TTC: ')[1].split(' €')[0]);
        setTotalAmount((totalPrice + shippingCost).toFixed(2));
      } else {
        setTotalAmount(totalPrice.toFixed(2));
      }
    }
  }, [productInfo]);

  const handlePayment = async () => {
    if (!totalAmount) {
      Alert.alert('Erreur', 'Le montant total est incorrect.');
      return;
    }

    if (!cardNumber || !expiryDate || !cvv || !cardHolderName) {
      Alert.alert('Erreur', 'Veuillez renseigner toutes les informations de la carte.');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulation du traitement de paiement
      await new Promise(resolve => setTimeout(resolve, 3000));

      const dateLivraison = new Date().toISOString().split('T').join(' ').split('.')[0];

      const uniqueReference = generateUniqueReference();

      const order = {
        statusCommande: 'En attente',
        devis: false,
        type: 'Commande',
        dateLivraison,
        referenceLivraison: 'REF12345',
        ModeReception: 'A LIVRER',
        reference: uniqueReference,
        idClient: await AsyncStorage.getItem('userId'),
        total: totalAmount,
        cardHolderName,
        productId: productInfo.productId,
      };

      const token = await AsyncStorage.getItem('accessToken');
      const response = await fetch('http://127.0.0.1:5006/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(order),
      });

      const result = await response.json();

      if (response.ok) {
        const storedOrders = await AsyncStorage.getItem('orders');
        let orders = storedOrders ? JSON.parse(storedOrders) : [];
        orders.push(order);
        await AsyncStorage.setItem('orders', JSON.stringify(orders));

        Alert.alert(
          'Paiement réussi',
          'Votre paiement a été traité avec succès.',
          [{ text: 'OK', onPress: () => navigation.navigate('OrdersScreen' as never) }]
        );
      } else {
        Alert.alert('Erreur', `Erreur lors du paiement: ${result.message}`);
      }
    } catch (error) {
      Alert.alert('Erreur', 'Le paiement a échoué. Veuillez réessayer.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isProcessing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.processingText}>Traitement du paiement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Paiement</Text>
      
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Montant total à payer : {totalAmount ? `${totalAmount} €` : 'Calcul en cours...'}</Text>
      </View>

      <TextInput
        placeholder="Nom du titulaire de la carte"
        value={cardHolderName}
        onChangeText={setCardHolderName}
        style={styles.input}
        placeholderTextColor="#999"
      />
      <TextInput
        placeholder="Numéro de carte"
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#999"
      />
      <View style={styles.cardDetailsContainer}>
        <TextInput
          placeholder="Date d'expiration (MM/AA)"
          value={expiryDate}
          onChangeText={setExpiryDate}
          keyboardType="numeric"
          style={[styles.input, styles.smallInput]}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="CVV"
          value={cvv}
          onChangeText={setCvv}
          keyboardType="numeric"
          secureTextEntry
          style={[styles.input, styles.smallInput]}
          placeholderTextColor="#999"
        />
      </View>

      <TouchableOpacity 
        style={[styles.payButton, !totalAmount || isProcessing ? styles.payButtonDisabled : null]} 
        onPress={handlePayment} 
        disabled={!totalAmount || isProcessing}
      >
        <Text style={styles.payButtonText}>Payer maintenant</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  summaryContainer: {
    marginBottom: 30,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  cardDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallInput: {
    flex: 1,
    marginRight: 10,
  },
  payButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  payButtonDisabled: {
    backgroundColor: '#ccc',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  processingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default PaymentScreen;
