import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, ActivityIndicator, Alert } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';

const ProductPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const productId = route.params?.id ?? 10;

  const [quantity, setQuantity] = useState(1);
  const [length, setLength] = useState(1);
  const [dimensionA, setDimensionA] = useState('');
  const [dimensionB, setDimensionB] = useState('');
  const [dimensionC, setDimensionC] = useState('');
  const [dimensionD, setDimensionD] = useState('');
  const [mass, setMass] = useState<number | null>(null);
  const [cuttingPrice, setCuttingPrice] = useState<number | null>(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (product) {
      calculateMassAndPrice();
    }
  }, [quantity, length, dimensionA, dimensionB, dimensionC, dimensionD, product]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:5006/products/${productId}`);
      if (response.ok) {
        const productData: { data: Product } = await response.json();
        setProduct(productData.data);
      } else {
        Alert.alert('Erreur', 'Impossible de récupérer les informations du produit');
      }
    } catch (error) {
      Alert.alert('Erreur', `Impossible de se connecter au serveur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  const incrementLength = () => setLength(length + 1);
  const decrementLength = () => length > 1 && setLength(length - 1);

  const calculateMassAndPrice = () => {
    let calculatedMass = 0;
    const A = parseFloat(dimensionA);
    const B = parseFloat(dimensionB);
    const C = parseFloat(dimensionC);
    const D = parseFloat(dimensionD);

    if (A && B) {
      calculatedMass = (A * B * 7.85) / 1000; // Calcul de la masse
    } else if (C && D) {
      calculatedMass = 176; // Masse fixe pour certaines dimensions
    }

    const totalMass = calculatedMass * length * quantity; // Masse totale
    const cuttingPricePerKg = 0.3; // Prix de découpe par kg, par exemple
    const calculatedCuttingPrice = totalMass * cuttingPricePerKg; // Prix de découpe
    const basePrice = product?.prixMetre * length * quantity || 0; // Prix de base du produit
    const margin = basePrice * ((product?.marge || 0) / 100); // Marge
    const priceWithMargin = basePrice + margin + calculatedCuttingPrice; // Prix avec marge et découpe
    const tva = priceWithMargin * ((product?.tva || 0) / 100); // TVA
    const finalPrice = priceWithMargin + tva; // Prix final

    setMass(totalMass);
    setCuttingPrice(calculatedCuttingPrice);
    setTotalPrice(finalPrice);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Produit non trouvé.</Text>
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
          <View style={styles.iconContainer}>
            <Icon name="shopping-cart" type="material" size={25} color="#000" onPress={() => {}} />
          </View>
          <View style={styles.iconContainer}>
            <Icon name="favorite" type="material" size={25} color="#000" onPress={() => {}} />
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Image source={{ uri: `http://127.0.0.1:5006/public/${product.imagePrincipale}` }} style={styles.image} />
        <Text style={styles.title}>{product.nomProduit}</Text>
        <Text style={styles.price}>{totalPrice ? `${totalPrice.toFixed(2)} €` : `${product.prixMetre}€`}</Text>
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
        <Text style={styles.label}>Dimensions</Text>
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
        <Button title="Calculer" onPress={calculateMassAndPrice} buttonStyle={styles.calculateButton} titleStyle={styles.calculateButtonText} />
        {mass !== null && cuttingPrice !== null && totalPrice !== null && (
          <View style={styles.results}>
            <Text>Masse Linéaire : {mass.toFixed(2)} kg/m</Text>
            <Text>Prix de Découpe : {cuttingPrice.toFixed(2)} €</Text>
            <Text>Prix Total : {totalPrice.toFixed(2)} €</Text>
          </View>
        )}
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.paymentMethodsContainer}>
          <View style={styles.paymentMethods}>
            <Icon name="cc-visa" type="font-awesome" size={32} color="#000" />
            <Icon name="cc-mastercard" type="font-awesome" size={32} color="#000" />
            <Icon name="cc-amex" type="font-awesome" size={32} color="#000" />
            <Icon name="paypal" type="font-awesome" size={32} color="#000" />
            <Icon name="apple" type="font-awesome" size={32} color="#000" />
          </View>
        </View>
        <Button title="Acheter" buttonStyle={styles.buyButton} titleStyle={styles.buyButtonText} />
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
    zIndex: 10,
  },
  headerIcons: {
    flexDirection: 'row',
    marginRight: 8,
  },
  iconContainer: {
    backgroundColor: '#FEE715',
    borderRadius: 24,
    padding: 9,
    marginLeft: 10,
    borderWidth: 1.5,
    borderColor: '#000',
  },
  scrollViewContainer: {
    paddingTop: 80,
    paddingHorizontal: 16,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#000',
    borderRadius: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  delivery: {
    fontSize: 16,
    color: 'green',
    marginBottom: 10,
  },
  quantityContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 120,
    height: 55,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, 
  },

  counterText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },

  counterButton: {
    backgroundColor: '#FEE715',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8, 
    paddingHorizontal:  10, 
  },

  buttonText: {
    color: '#000',
    fontSize: 15, 
    fontWeight: 'bold',
  },

  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  calculateButton: {
    backgroundColor: '#000',
    marginBottom: 20,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  calculateButtonText: {
    fontSize: 20,
    color: '#fff',
  },
  results: {
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  paymentMethodsContainer: {
    backgroundColor: '#FEE715',
    padding: 13,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#000',
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buyButton: {
    backgroundColor: '#000',
    marginBottom: 20,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buyButtonText: {
    fontSize: 20,
    color: '#fff',
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ProductPage;
