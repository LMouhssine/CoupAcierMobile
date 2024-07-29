import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const App = () => {
  const navigation = useNavigation();

  const navigateToProRegistration = () => {
    navigation.navigate('RegistrationScreenPro');
  };

  const navigateToParticularRegistration = () => {
    navigation.navigate('RegistrationScreenPart');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.logoContainer}>
        <Image source={require('@/assets/images/CoupAcierApp.png')} style={styles.logoImage} />
      </View>
      <TouchableOpacity>
        <Text style={styles.loginText}>Inscription</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToProRegistration}>
        <Text style={styles.buttonText}>Professionnel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToParticularRegistration}>
        <Text style={styles.buttonText}>Particulier</Text>
      </TouchableOpacity>
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
  loginText: {
    marginBottom: 20,
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'italic',
    backgroundColor: '#FEE715',
  },
});

export default App;
