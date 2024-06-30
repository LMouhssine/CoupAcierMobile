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
        name="TypeScreen"
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarStyle: { display: 'none' },
        }}
      />
      {/* Ajouter d'autres écrans ici */}
    </Tabs>
  );
}
