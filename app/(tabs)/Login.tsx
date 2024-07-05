import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const App = () => {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [client, setClient] = useState(null);

  const handleContinueAsGuest = () => {
    setIsLoggedIn(false);
    navigation.navigate('HomeScreen');
  };

  const handleLogin = () => {
    if (email && password) {
      fetch('http://localhost:5007/Clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Login response:', data); // Ajout de la vérification de la réponse
        if (data.message === 'Login successful') {
          fetch(`http://localhost:5007/api/clients/email/${email}`)
            .then(response => response.json())
            .then(clientData => {
              console.log('Client data:', clientData); // Ajout de la vérification des données du client
              setClient(clientData.data);
              setIsLoggedIn(true);
              navigation.navigate('HomeScreen');
            })
            .catch(error => {
              console.error('Error:', error);
            });
        } else {
          alert("Invalid email or password.");
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    } else {
      alert("Veuillez entrer une adresse e-mail et un mot de passe valides.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {!isLoggedIn ? (
        <>
          <View style={styles.logoContainer}>
            <Image source={require('@/assets/images/CoupAcierApp.png')} style={styles.logoImage} />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Adresse e-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Je me connecte</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View>
          <Text>Bienvenue, {client ? client.prenomClient : 'utilisateur'}!</Text>
          {/* Afficher les autres informations du client */}
          {client && (
            <>
              <Text>Email: {client.email}</Text>
              <Text>Siret: {client.siret}</Text>
              <Text>Telephone: {client.telephone}</Text>
              {/* Ajoutez d'autres champs si nécessaire */}
            </>
          )}
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
  input: {
    width: '70%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
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
});

export default App;
