// src/OrdersScreen.tsx
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
          color="#fff"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.headerIcons}>
          <Icon name="settings" type="material" size={28} color="#fff" onPress={() => {}} />
        </View>
      </View>
      <Text style={styles.title}>Orders</Text>
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
    backgroundColor: '#000',
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
  title: {
    fontSize: 24,
    color: '#FFD700',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderContainer: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  orderText: {
    fontSize: 16,
    color: '#FFF',
  },
  trackOrdersButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 16,
  },
});

export default OrdersScreen;
