import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const App = () => {
  const navigation = useNavigation();

  const navigateToProRegistration = () => {
    navigation.navigate('RegistrationScreenPro' as never);
  };

  const navigateToParticularRegistration = () => {
    navigation.navigate('RegistrationScreenPart' as never);
  };

  const navigateToIndex = () => {
    navigation.navigate('index' as never);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.logoContainer}>
        <Image source={require('@/assets/images/CoupAcierApp.png')} style={styles.logoImage} />
      </View>
      <Text style={styles.inscriptionText}>Quel type de compte voulez-vous créer ?</Text>
      <TouchableOpacity style={styles.button} onPress={navigateToProRegistration}>
        <Text style={styles.buttonText}>Professionnel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToParticularRegistration}>
        <Text style={styles.buttonText}>Particulier</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToIndex}>
        <Text style={styles.backButtonText}>Retour à la sélection</Text>
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
    marginBottom: 30,
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
  inscriptionText: {
    marginBottom: 20,
    marginLeft: 65,
    marginRight: 65,
    color: 'black',
    fontSize: 24,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#FEE715',
    paddingBottom: 5,
  },
  backButtonText: {
    marginTop: 20,
    color: 'black',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default App;
