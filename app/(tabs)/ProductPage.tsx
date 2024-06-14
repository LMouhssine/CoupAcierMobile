import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const ProductPage = () => {
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const [length, setLength] = useState(1);

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  const incrementLength = () => setLength(length + 1);
  const decrementLength = () => length > 1 && setLength(length - 1);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Icon
          name="arrow-back"
          type="material"
          size={28}
          color="#fff"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.headerIcons}>
          <Icon name="shopping-cart" type="material" size={28} color="#fff" onPress={() => {}} />
          <Icon name="favorite" type="material" size={28} color="#fff" onPress={() => {}} />
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
      <Text style={styles.informationTitle}>Informations</Text>
      <Text style={styles.informationText}>
        Fabriquées avec précision à partir d'acier de haute qualité, ces cornières offrent une
        résistance exceptionnelle aux contraintes mécaniques tout en étant légères et faciles à
        manipuler.
      </Text>
      <View style={styles.paymentMethods}>
        <Icon name="cc-visa" type="font-awesome" size={32} color="#fff" />
        <Icon name="cc-mastercard" type="font-awesome" size={32} color="#fff" />
        <Icon name="cc-amex" type="font-awesome" size={32} color="#fff" />
        <Icon name="paypal" type="font-awesome" size={32} color="#fff" />
        <Icon name="apple-pay" type="font-awesome" size={32} color="#fff" />
      </View>
      <Button title="Acheter" buttonStyle={styles.buyButton} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'blue',
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
  },
  title: {
    fontSize: 24,
    color: '#FFD700',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: '#FFF',
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
    color: '#FFF',
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
    color: '#FFF',
    marginHorizontal: 16,
  },
  informationTitle: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  informationText: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 16,
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    backgroundColor: 'blue',
  },
  buyButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 16,
  },
});

export default ProductPage;
