import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { geocodeAddress } from '../../backend/utils/geocoding';
import { calculateDistanceToClient, calculateTotalCost } from '../../backend/utils/costCalculations';

const App = () => {
  const [address, setAddress] = useState('');
  const [weight, setWeight] = useState('');
  const [distance, setDistance] = useState(null);
  const [costDetails, setCostDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculateShippingCost = async () => {
    if (!address || !weight) {
      setDistance('Veuillez entrer une adresse de livraison valide et un poids.');
      return;
    }

    setLoading(true);
    try {
      // Géocode l'adresse pour obtenir les coordonnées
      const clientAddress = await geocodeAddress(address);
      const weightValue = parseFloat(weight);

      const { distance, warehouse } = await calculateDistanceToClient(clientAddress);
      setDistance(`Distance: ${distance.toFixed(2)} km (Entrepôt: ${warehouse.name})`);

      const { costHT, totalCost, tax } = calculateTotalCost(weightValue, distance);
      setCostDetails(`Coût HT: ${costHT.toFixed(2)} €, TVA: ${tax.toFixed(2)} €, Coût TTC: ${totalCost.toFixed(2)} €`);
    } catch (error) {
      console.error('Erreur lors du calcul des coûts:', error);
      setDistance('Erreur lors du calcul des coûts');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Adresse de Livraison:</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />
      <Text style={styles.label}>Poids (kg):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
      <Button title="Calculer le Coût de Livraison" onPress={handleCalculateShippingCost} />
      {loading && <Text>Chargement...</Text>}
      {distance && <Text>{distance}</Text>}
      {costDetails && <Text>{costDetails}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    marginBottom: 4,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default App;
