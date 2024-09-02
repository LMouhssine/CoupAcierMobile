import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#6184FF',
        tabBarInactiveTintColor: '#000',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="HomeScreen"
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="OrdersScreen"
        options={{
          tabBarLabel: 'Mes Commandes',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="list" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="CartScreen"
        options={{
          tabBarLabel: 'Mon Panier',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="cart" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="FavoritesScreen"
        options={{
          tabBarLabel: 'Mes Favoris',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          tabBarLabel: 'Mon Compte',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="person" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarStyle: { display: 'none' },
          tabBarButton: () => null,
        }}
      />
      {/* <Tabs.Screen
        name="PaymentScreen"
        options={{
          tabBarStyle: { display: 'none' },
          tabBarButton: () => null,
        }}
      /> */}
      <Tabs.Screen
        name="TypeScreen"
        options={{
          tabBarStyle: { display: 'none' },
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="Login"
        options={{
          tabBarStyle: { display: 'none' },
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="ProductPage"
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="Notifications"
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="RegistrationScreenPro"
        options={{
          tabBarStyle: { display: 'none' },
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="RegistrationScreenPart"
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' },
        }}
      />
    </Tabs>
  );
}
