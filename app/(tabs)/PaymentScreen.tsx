import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const PaymentScreen: React.FC = () => {
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [ccv, setCcv] = useState('');
  const [billingAddress, setBillingAddress] = useState('');

  const handlePayment = () => {
    // Handle the payment logic here
    console.log('Payment Submitted');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Paiement par CB</Text>
        <Text style={styles.amount}>1324,00 €</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nom du titulaire"
        value={cardHolderName}
        onChangeText={setCardHolderName}
      />

      <TextInput
        style={styles.input}
        placeholder="Numéro de CB"
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={setCardNumber}
      />

      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.smallInput]}
          placeholder="Date d’expiration"
          value={expiryDate}
          onChangeText={setExpiryDate}
        />

        <TextInput
          style={[styles.input, styles.smallInput]}
          placeholder="CCV"
          keyboardType="numeric"
          value={ccv}
          onChangeText={setCcv}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Adresse de facturation"
        value={billingAddress}
        onChangeText={setBillingAddress}
      />

      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Payer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#FEE715',
    padding: 20,
    borderRadius: 30,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'light',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 50,
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#000',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 80,
  },
  input: {
    backgroundColor: '#f3f3f3',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallInput: {
    flex: 1,
    marginHorizontal: 5,
  },
  payButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PaymentScreen;
