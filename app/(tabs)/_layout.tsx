import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon'; 
import { Colors } from '@/constants/Colors'; 
import { useColorScheme } from '@/hooks/useColorScheme'; 

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
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
          tabBarLabel: 'Orders',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="list" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="CartScreen"
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="cart" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="FavoritesScreen"
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="TypeScreen"
        options={{
          tabBarStyle: { display: 'none' },
        }}
      />
    </Tabs>
  );
}
