import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const OrdersScreen = () => {
  const navigation = useNavigation();

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
        <Text style={styles.title}>Orders</Text>
      </View>
      <View style={styles.orderContainer}>
        <Text style={styles.orderText}>Order 1: Product A - 2 pcs</Text>
      </View>
      <View style={styles.orderContainer}>
        <Text style={styles.orderText}>Order 2: Product B - 1 pcs</Text>
      </View>
      <View style={styles.orderContainer}>
        <Text style={styles.orderText}>Order 3: Product C - 5 pcs</Text>
      </View>
      <Button title="Track Orders" buttonStyle={styles.trackOrdersButton} />
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
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  orderContainer: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  orderText: {
    fontSize: 16,
    color: '#333',
  },
  trackOrdersButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default OrdersScreen;
