import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const ProductPage = () => {
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const [length, setLength] = useState(1);
  const [dimensionA, setDimensionA] = useState<string>('');
  const [dimensionB, setDimensionB] = useState<string>('');
  const [dimensionC, setDimensionC] = useState<string>('');
  const [dimensionD, setDimensionD] = useState<string>('');
  const [mass, setMass] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  const incrementLength = () => setLength(length + 1);
  const decrementLength = () => length > 1 && setLength(length - 1);

  const calculateMassAndPrice = () => {
    let calculatedMass = 0;
    if (dimensionA && dimensionB) {
      const A = parseFloat(dimensionA);
      const B = parseFloat(dimensionB);
      calculatedMass = (A * B * 7.85) / 1000; // approx for steel density
    } else if (dimensionC && dimensionD) {
      const C = parseFloat(dimensionC);
      const D = parseFloat(dimensionD);
      calculatedMass = (C * D * 7.85) / 1000; // approx for steel density
    }
    
    setMass(calculatedMass);
    setPrice(calculatedMass * 0.3);
  };

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
        <View style={styles.headerIcons}>
          <Icon name="shopping-cart" type="material" size={28} color="#000" onPress={() => {}} />
          <Icon name="favorite" type="material" size={28} color="#000" onPress={() => {}} />
        </View>
      </View>
      <Image source={{ uri: 'image-url' }} style={styles.image} />
      <Text style={styles.title}>CORNIÈRES A AILES INÉGALES</Text>
      <Text style={styles.price}>98.99€</Text>
      <Text style={styles.delivery}>Livraison sous 15 jours ouvrés</Text>
      <View style={styles.quantityContainer}>
        <Text style={styles.label}>Quantité</Text>
        <View style={styles.counter}>
          <Button title="-" onPress={decrementQuantity} buttonStyle={styles.counterButton} />
          <Text style={styles.counterText}>{quantity}</Text>
          <Button title="+" onPress={incrementQuantity} buttonStyle={styles.counterButton} />
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <Text style={styles.label}>Longueur (cm)</Text>
        <View style={styles.counter}>
          <Button title="-" onPress={decrementLength} buttonStyle={styles.counterButton} />
          <Text style={styles.counterText}>{length}</Text>
          <Button title="+" onPress={incrementLength} buttonStyle={styles.counterButton} />
        </View>
      </View>
      <Text style={styles.label}>Dimensions du profil</Text>
      <TextInput
        style={styles.input}
        placeholder="Dimension A (mm)"
        keyboardType="numeric"
        value={dimensionA}
        onChangeText={setDimensionA}
      />
      <TextInput
        style={styles.input}
        placeholder="Dimension B (mm)"
        keyboardType="numeric"
        value={dimensionB}
        onChangeText={setDimensionB}
      />
      <TextInput
        style={styles.input}
        placeholder="Dimension C (mm)"
        keyboardType="numeric"
        value={dimensionC}
        onChangeText={setDimensionC}
      />
      <TextInput
        style={styles.input}
        placeholder="Dimension D (mm)"
        keyboardType="numeric"
        value={dimensionD}
        onChangeText={setDimensionD}
      />
      <Button title="Calculer" onPress={calculateMassAndPrice} buttonStyle={styles.calculateButton} />
      {mass !== null && price !== null && (
        <View style={styles.results}>
          <Text>Masse Linéaire: {mass.toFixed(2)} kg/m</Text>
          <Text>Prix de Découpe: {price.toFixed(2)} €</Text>
        </View>
      )}
      <Text style={styles.informationTitle}>Informations</Text>
      <Text style={styles.informationText}>
        Fabriquées avec précision à partir d'acier de haute qualité, ces cornières offrent une
        résistance exceptionnelle aux contraintes mécaniques tout en étant légères et faciles à
        manipuler.
      </Text>
      <View style={styles.paymentMethods}>
        <Icon name="cc-visa" type="font-awesome" size={32} color="#000" />
        <Icon name="cc-mastercard" type="font-awesome" size={32} color="#000" />
        <Icon name="cc-amex" type="font-awesome" size={32} color="#000" />
        <Icon name="paypal" type="font-awesome" size={32} color="#000" />
        <Icon name="apple" type="font-awesome" size={32} color="#000" />
      </View>
      <Button title="Acheter" buttonStyle={styles.buyButton} />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: '#333',
    marginBottom: 8,
  },
  delivery: {
    fontSize: 16,
    color: '#32CD32',
    marginBottom: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    color: '#333',
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    backgroundColor: '#FFD700',
    padding: 8,
  },
  counterText: {
    fontSize: 18,
    color: '#333',
    marginHorizontal: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 8,
    marginVertical: 8,
    fontSize: 18,
    color: '#333',
  },
  calculateButton: {
    backgroundColor: '#FFD700',
    padding: 12,
    marginVertical: 16,
  },
  results: {
    marginTop: 16,
  },
  informationTitle: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  informationText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 8,
  },
  buyButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 16,
  },
});

export default ProductPage;
