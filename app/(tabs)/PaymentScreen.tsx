import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
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
      // Simulation du traitement de paiement
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Format de date correct pour MySQL (YYYY-MM-DD HH:MM:SS)
      const dateLivraison = new Date().toISOString().split('T').join(' ').split('.')[0];

      // Générer une référence unique
      const uniqueReference = generateUniqueReference();

      // Enregistrer les détails de la commande après un paiement réussi
      const order = {
        statusCommande: 'En attente', // Utilisez une valeur valide de l'énumération
        devis: false, // Ajoutez une valeur pour 'devis'
        type: 'Commande', // Assurez-vous de fournir une valeur valide pour 'type'
        dateLivraison, // Date correctement formatée
        referenceLivraison: 'REF12345', // Exemple de valeur pour la référence de livraison
        ModeReception: 'A LIVRER', // Exemple de valeur pour le mode de réception
        reference: uniqueReference, // Utiliser la référence unique générée
        idClient: await AsyncStorage.getItem('userId'),
        total: totalAmount,
        cardHolderName,
        productId: productInfo.productId, // Ajouter l'ID du produit
      };

      console.log('Détails de la commande:', order); // Log des détails de la commande avant l'envoi

      const token = await AsyncStorage.getItem('accessToken');
      const response = await fetch('http://127.0.0.1:5006/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(order)
      });

      console.log('Réponse brute de l\'API:', response); // Log pour vérifier la réponse brute de l'API

      const result = await response.json();
      console.log('Résultat de la réponse:', result); // Log des données de la réponse

      if (response.ok) {
        // Sauvegarder la commande dans AsyncStorage
        let orders = await AsyncStorage.getItem('orders');
        orders = orders ? JSON.parse(orders) : [];
        orders.push(order);
        await AsyncStorage.setItem('orders', JSON.stringify(orders));

        Alert.alert(
          'Paiement réussi',
          'Votre paiement a été traité avec succès.',
          [{ text: 'OK', onPress: () => navigation.navigate('OrdersScreen') }]
        );
      } else {
        // Log pour vérifier le message d'erreur renvoyé par l'API
        console.error('Erreur dans la réponse de l\'API:', result.message);
        Alert.alert('Erreur', `Erreur lors du paiement: ${result.message}`);
      }

    } catch (error) {
      // Log pour capturer les erreurs dans le bloc try
      console.error('Erreur lors du paiement:', error);
      Alert.alert('Erreur', 'Le paiement a échoué. Veuillez réessayer.');
    } finally {
      setIsProcessing(false);
      console.log('Fin du traitement du paiement');
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
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  summaryContainer: {
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  cardDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallInput: {
    flex: 1,
    marginRight: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  processingText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default PaymentScreen;
