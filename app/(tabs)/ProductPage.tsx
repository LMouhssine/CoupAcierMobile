import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const ProductPage = () => {
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const [length, setLength] = useState(1);
  const [dimensionA, setDimensionA] = useState('');
  const [dimensionB, setDimensionB] = useState('');
  const [dimensionC, setDimensionC] = useState('');
  const [dimensionD, setDimensionD] = useState('');
  const [mass, setMass] = useState(null);
  const [price, setPrice] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5006/products/5'); // Remplacez par l'ID de votre produit
      if (response.ok) {
        const productData = await response.json();
        console.log('Product data:', productData); // Log pour vérifier les données récupérées
        setProduct(productData);
      } else {
        Alert.alert('Erreur', 'Impossible de récupérer les informations du produit');
      }
    } catch (error) {
      Alert.alert('Erreur', `Impossible de se connecter au serveur: ${error.message}`);
    }
  };

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  const incrementLength = () => setLength(length + 1);
  const decrementLength = () => length > 1 && setLength(length - 1);

  const calculateMassAndPrice = () => {
    let calculatedMass = 0;

    if (dimensionA && dimensionB) {
      const A = parseFloat(dimensionA);
      const B = parseFloat(dimensionB);
      calculatedMass = (A * B * 7.85) / 1000;
    } else if (dimensionC && dimensionD) {
      const C = parseFloat(dimensionC);
      const D = parseFloat(dimensionD);
      calculatedMass = 176;
    }

    const calculatedPrice = calculatedMass * 0.3;

    setMass(calculatedMass);
    setPrice(calculatedPrice);
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
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
          onPress={() => navigation.goBack()}
        />
        <View style={styles.headerIcons}>
          <Icon name="shopping-cart" type="material" size={28} color="#000" onPress={() => {}} />
          <Icon name="favorite" type="material" size={28} color="#000" onPress={() => {}} />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>{product.price}€</Text>
        <Text style={styles.delivery}>Livraison sous 15 jours ouvrés</Text>
        <View style={styles.quantityContainer}>
          <Text style={styles.label}>Quantité</Text>
          <View style={styles.counter}>
            <Button title="-" onPress={decrementQuantity} buttonStyle={styles.counterButton} titleStyle={styles.buttonText} />
            <Text style={styles.counterText}>{quantity}</Text>
            <Button title="+" onPress={incrementQuantity} buttonStyle={styles.counterButton} titleStyle={styles.buttonText} />
          </View>
        </View>
        <View style={styles.quantityContainer}>
          <Text style={styles.label}>Longueur (cm)</Text>
          <View style={styles.counter}>
            <Button title="-" onPress={decrementLength} buttonStyle={styles.counterButton} titleStyle={styles.buttonText} />
            <Text style={styles.counterText}>{length}</Text>
            <Button title="+" onPress={incrementLength} buttonStyle={styles.counterButton} titleStyle={styles.buttonText} />
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
        <Button title="Calculer" onPress={calculateMassAndPrice} buttonStyle={styles.calculateButton} titleStyle={styles.buttonText} />
        {mass !== null && price !== null && (
          <View style={styles.results}>
            <Text>Masse Linéaire: {mass.toFixed(2)} kg/m</Text>
            <Text>Prix de Découpe: {price.toFixed(2)} €</Text>
          </View>
        )}
        <Text style={styles.informationTitle}>Informations</Text>
        <Text style={styles.informationText}>{product.description}</Text>
        <View style={styles.paymentMethods}>
          <Icon name="cc-visa" type="font-awesome" size={32} color="#000" />
          <Icon name="cc-mastercard" type="font-awesome" size={32} color="#000" />
          <Icon name="cc-amex" type="font-awesome" size={32} color="#000" />
          <Icon name="paypal" type="font-awesome" size={32} color="#000" />
          <Icon name="apple" type="font-awesome" size={32} color="#000" />
        </View>
        <Button title="Acheter" buttonStyle={styles.buyButton} titleStyle={styles.buttonText} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#FFF',
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollViewContainer: {
    paddingTop: 70,
    padding: 16,
    paddingBottom: 100,
    flexGrow: 1,
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
    backgroundColor: '#dcdcdc',
    paddingHorizontal: 10,
  },
  counterText: {
    fontSize: 18,
    color: '#333',
    paddingHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
  calculateButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
  },
  results: {
    marginBottom: 15,
  },
  informationTitle: {
    fontSize: 22,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  informationText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  buyButton: {
    backgroundColor: '#32CD32',
    paddingVertical: 10,
  },
});

export default ProductPage;
