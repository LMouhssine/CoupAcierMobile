import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AnotherPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ceci est une autre page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default AnotherPage;