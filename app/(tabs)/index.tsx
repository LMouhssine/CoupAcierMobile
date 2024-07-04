import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const App = () => {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleContinueAsGuest = () => {
    setIsLoggedIn(false);
    navigation.navigate('HomeScreen');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigation.navigate('HomeScreen'); // Naviguez vers l'écran approprié pour les utilisateurs connectés
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {!isLoggedIn ? (
        <>
          <View style={styles.logoContainer}>
            <Image source={require('@/assets/images/CoupAcierApp.png')} style={styles.logoImage} />
          </View>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TypeScreen')}>
            <Text style={styles.buttonText}>Je m'inscris</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Je me connecte</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleContinueAsGuest}>
            <Text style={styles.guestText}>Continuer en tant qu'invité</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View>
          <Text>Bienvenue, utilisateur!</Text>
          {/* Autres composants pour les utilisateurs connectés */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logoContainer: {
    marginBottom: 50,
    alignItems: 'center',
  },
  logoImage: {
    width: 350,
    height: 250,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginVertical: 10,
    width: '70%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  guestText: {
    marginTop: 20,
    color: 'black',
    fontSize: 16,
  },
});

export default App;
