import React, { useState, useEffect, useMemo } from 'react';
import {
  View, Text, Image, StyleSheet, ScrollView, TextInput, ActivityIndicator, Alert, Button
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';
import { geocodeAddress } from '../../backend/utils/geocoding';
import { calculateDistanceToClient, calculateTotalCost } from '../../backend/utils/costCalculations';

const ProductPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const productId = route.params?.id ?? 10;

  const [quantity, setQuantity] = useState(1);
  const [length, setLength] = useState(1);
  const [dimensions, setDimensions] = useState({ A: '', B: '', C: '', D: '' });
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState('');
  const [weight, setWeight] = useState('');
  const [shippingInfo, setShippingInfo] = useState({ distance: null, costDetails: null, loading: false });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5006/products/${productId}`);
        if (!response.ok) throw new Error('Erreur lors de la récupération du produit.');
        const { data } = await response.json();
        setProduct(data);
      } catch (error) {
        Alert.alert('Erreur', error.message);
      } finally {
        setLoading(false);
      }
    };

    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      setIsLoggedIn(!!token);
    };

    fetchProduct();
    checkLoginStatus();
  }, [productId]);

  const handleDimensionChange = (key, value) => setDimensions(prev => ({ ...prev, [key]: value }));

  const massAndPrice = useMemo(() => {
    if (!product) return { mass: 0, cuttingPrice: 0, priceHT: 0, tva: 0, totalPriceTTC: 0 };

    const A = parseFloat(dimensions.A);
    const B = parseFloat(dimensions.B);
    const C = parseFloat(dimensions.C);
    const D = parseFloat(dimensions.D);
    let mass = 0;

    if (A && B) {
      mass = (A * B * 7.85) / 1000; // Calculate mass based on dimensions
    } else if (C && D) {
      mass = 176; // Fixed mass for certain dimensions
    }

    const totalMass = mass * length * quantity;
    const cuttingPrice = totalMass * 0.3;
    const basePriceHT = (product.prixMetre || 0) * length * quantity;
    const priceHT = basePriceHT * (1 + (product.marge || 0) / 100) + cuttingPrice;
    const tva = priceHT * (product.tva / 100);
    const totalPriceTTC = priceHT + tva;

    return { mass: totalMass, cuttingPrice, priceHT, tva, totalPriceTTC };
  }, [quantity, length, dimensions, product]);

  const handleCalculateShippingCost = async () => {
    if (!address || !weight) {
      setShippingInfo({ ...shippingInfo, distance: 'Veuillez entrer une adresse de livraison valide et un poids.' });
      return;
    }

    setShippingInfo({ ...shippingInfo, loading: true });
    try {
      const clientAddress = await geocodeAddress(address);
      const { distance, warehouse } = await calculateDistanceToClient(clientAddress);
      const { totalCost } = calculateTotalCost(parseFloat(weight), distance);

      setShippingInfo({
        distance: `${distance.toFixed(2)} km`,
        costDetails: `Prix de livraison: ${totalCost.toFixed(2)} €`,
        loading: false
      });
    } catch (error) {
      console.error('Erreur lors du calcul des coûts:', error);
      setShippingInfo({ distance: 'Erreur lors du calcul des coûts', costDetails: null, loading: false });
    }
  };

  const handleBuy = () => {
    if (!isLoggedIn) {
      Alert.alert('Veuillez vous connecter', 'Vous devez être connecté pour passer une commande.');
      return;
    }

    if (!address || !weight) {
      Alert.alert('Champs obligatoires', 'Veuillez renseigner l\'adresse de livraison et le poids avant de passer commande.');
      return;
    }

    const productInfo = {
      productId, quantity, length, dimensions, totalPrice: massAndPrice.totalPriceTTC, mass: massAndPrice.mass,
      cuttingPrice: massAndPrice.cuttingPrice, address, weight, ...shippingInfo
    };
    navigation.navigate('PaymentScreen', { productInfo });
  };

  const totalAmount = massAndPrice.totalPriceTTC && shippingInfo.costDetails
    ? (massAndPrice.totalPriceTTC + parseFloat(shippingInfo.costDetails.split(': ')[1].split(' €')[0])).toFixed(2)
    : null;

  if (loading) return <ActivityIndicator style={styles.loading} size="large" color="#000" />;

  if (!product) return <Text style={styles.error}>Produit non trouvé.</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="arrow-back" type="material" size={28} color="#000" onPress={() => navigation.goBack()} />
        <View style={styles.headerIcons}>
          <Icon name="shopping-cart" type="material" size={25} color="#000" onPress={() => {}} />
          <Icon name="favorite" type="material" size={25} color="#000" onPress={() => {}} style={styles.iconContainer} />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Swiper style={styles.swiper}>
          {[product.imagePrincipale, product.image1, product.image2].map((image, index) => (
            <Image key={index} source={{ uri: `http://127.0.0.1:5006/public/${image}` }} style={styles.image} />
          ))}
        </Swiper>
        <Text style={styles.title}>{product.nomProduit}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.label}>Prix HT :</Text>
          <Text style={styles.price}>{massAndPrice.priceHT.toFixed(2)} €</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.label}>TVA :</Text>
          <Text style={styles.price}>{massAndPrice.tva.toFixed(2)} €</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.label}>Prix TTC :</Text>
          <Text style={styles.price}>{massAndPrice.totalPriceTTC.toFixed(2)} €</Text>
        </View>
        <View style={styles.quantityContainer}>
          <Text style={styles.label}>Quantité</Text>
          <View style={styles.counter}>
            <Button title="-" onPress={() => setQuantity(Math.max(1, quantity - 1))} />
            <Text style={styles.counterText}>{quantity}</Text>
            <Button title="+" onPress={() => setQuantity(quantity + 1)} />
          </View>
        </View>
        <View style={styles.quantityContainer}>
          <Text style={styles.label}>Longueur</Text>
          <View style={styles.counter}>
            <Button title="-" onPress={() => setLength(Math.max(1, length - 1))} />
            <Text style={styles.counterText}>{length}</Text>
            <Button title="+" onPress={() => setLength(length + 1)} />
          </View>
        </View>
        <View style={styles.dimensionContainer}>
          {['A', 'B', 'C', 'D'].map(dim => (
            <TextInput
              key={dim}
              placeholder={dim}
              value={dimensions[dim]}
              onChangeText={(value) => handleDimensionChange(dim, value)}
              style={styles.dimensionInput}
            />
          ))}
        </View>
        <View style={styles.shippingContainer}>
          <Text style={styles.label}>Adresse de livraison</Text>
          <TextInput
            placeholder="Entrez votre adresse"
            value={address}
            onChangeText={setAddress}
            style={styles.input}
          />
          <Text style={styles.label}>Poids (kg)</Text>
          <TextInput
            placeholder="Entrez le poids"
            value={weight}
            onChangeText={setWeight}
            style={styles.input}
            keyboardType="numeric"
          />
          <Button
            title="Calculer les frais de livraison"
            onPress={handleCalculateShippingCost}
            disabled={shippingInfo.loading}
          />
          {shippingInfo.loading && <ActivityIndicator style={styles.loading} size="large" color="#000" />}
          {shippingInfo.distance && <Text style={styles.shippingResult}>Distance : {shippingInfo.distance}</Text>}
          {shippingInfo.costDetails && (
            <Text style={styles.shippingResult}>{shippingInfo.costDetails}</Text>
          )}
        </View>
        {totalAmount && (
          <Text style={styles.totalAmount}>Prix Total : {totalAmount} €</Text>
        )}
        <Button title="Acheter maintenant" onPress={handleBuy} disabled={!shippingInfo.costDetails} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 60, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: '#f5f5f5' },
  headerIcons: { flexDirection: 'row' },
  iconContainer: { marginLeft: 15 },
  scrollViewContainer: { padding: 20 },
  swiper: { height: 300, marginBottom: 20 },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, marginTop: 20 },
  priceContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  price: { fontSize: 20, fontWeight: 'bold', color: '#d9534f' },
  quantityContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, alignItems: 'center' },
  label: { fontSize: 18, fontWeight: 'bold' },
  counter: { flexDirection: 'row', alignItems: 'center' },
  counterText: { fontSize: 18, marginHorizontal: 10 },
  dimensionContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 10 },
  dimensionInput: { flex: 1, borderWidth: 1, borderColor: '#000', padding: 10, textAlign: 'center', marginRight: 10 },
  shippingContainer: { marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#000', padding: 10, marginBottom: 20, marginTop: 20 },
  shippingResult: { marginTop: 10, fontSize: 16 },
  totalAmount: { fontSize: 18, fontWeight: 'bold', color: '#d9534f', marginBottom: 20 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { textAlign: 'center', fontSize: 18, color: 'red', marginTop: 20 },
});

export default ProductPage;
