// App.js ou App.tsx
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getDistance } from '../../backend/utils/OpenRouteService'; 

const App = () => {
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculateDistance = async () => {
    setLoading(true);
    try {
      const start = { lat: 48.8566, lng: 2.3522 }; // Paris
      const end = { lat: 51.5074, lng: -0.1278 }; // Londres

      const data = await getDistance(start, end);
      
      if (data && data.routes && data.routes.length > 0) {
        const distanceText = data.routes[0].summary.distance / 1000; // distance en km
        setDistance(`Distance: ${distanceText.toFixed(2)} km`);
      } else {
        setDistance('Aucune donnée de distance disponible');
      }
    } catch (error) {
      console.error('Erreur lors du calcul de la distance:', error);
      setDistance('Erreur lors du calcul de la distance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Calculer la Distance" onPress={handleCalculateDistance} />
      {loading && <Text>Chargement...</Text>}
      {distance && <Text>{distance}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
