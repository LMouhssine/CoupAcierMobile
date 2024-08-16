import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { productInfo } = route.params || {};

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
      // Mock payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Assuming payment is successful, save order details
      const order = {
        idCommande: Math.random().toString(36).substring(7),
        statusCommande: 'Paid',
        type: 'Online',
        dateLivraison: new Date().toISOString(),
        reference: 'REF' + Math.random().toString(36).substring(2, 7).toUpperCase(),
        idClient: await AsyncStorage.getItem('userId'), // Assuming userId is stored during login
        totalAmount,
        cardHolderName,
        orderDate: new Date().toISOString(),
      };

      // Save the order to AsyncStorage
      let orders = await AsyncStorage.getItem('orders');
      orders = orders ? JSON.parse(orders) : [];
      orders.push(order);
      await AsyncStorage.setItem('orders', JSON.stringify(orders));

      // Show success alert
      Alert.alert(
        'Paiement réussi',
        'Votre paiement a été traité avec succès.',
        [{ text: 'OK', onPress: () => navigation.navigate('HomeScreen') }]
      );

    } catch (error) {
      console.error('Erreur lors du paiement:', error);
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
      <View style={styles.header}>
        <Icon
          name="arrow-back"
          type="material"
          size={28}
          color="#000"
          onPress={() => navigation.navigate('ProductPage')}
        />
        <Text style={styles.headerTitle}>Paiement</Text>
      </View>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Montant total à payer : {totalAmount ? `${totalAmount} €` : 'Calcul en cours...'}</Text>
      </View>

      <TextInput
        placeholder="Nom du titulaire de la carte"
        value={cardHolderName}
        onChangeText={setCardHolderName}
        style={styles.input}
      />
      <TextInput
        placeholder="Numéro de carte"
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="numeric"
        style={styles.input}
      />
      <View style={styles.cardDetailsContainer}>
        <TextInput
          placeholder="Date d'expiration (MM/AA)"
          value={expiryDate}
          onChangeText={setExpiryDate}
          keyboardType="numeric"
          style={[styles.input, styles.smallInput]}
        />
        <TextInput
          placeholder="CVV"
          value={cvv}
          onChangeText={setCvv}
          keyboardType="numeric"
          secureTextEntry
          style={[styles.input, styles.smallInput]}
        />
      </View>

      <Button title="Payer maintenant" onPress={handlePayment} disabled={!totalAmount || isProcessing} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    backgroundColor: '#FFF',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  summaryContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E67E22',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 4,
    marginVertical: 8,
  },
  cardDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallInput: {
    width: '48%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  processingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#555',
  },
});

export default PaymentScreen;
