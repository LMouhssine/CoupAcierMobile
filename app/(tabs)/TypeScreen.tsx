import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const App = () => {

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.logoContainer}>
        <Image source={require('@/assets/images/CoupAcierApp.png')} style={styles.logoImage} />
      </View>
      <TouchableOpacity>
        <Text style={styles.loginText}>Inscription</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Professionnel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
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
    marginTop: 10,
    marginBottom: 40,
    color: 'black',
    fontSize: 35,
    fontWeight: 600,
    fontStyle: 'italic',
  },
});

export default App;