import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const notLoggedInImage = require('../../assets/images/login.png');

interface ClientInfo {
  email: string;
  nomClient: string;
  prenomClient: string;
  telephone: string;
  profilClient: string;
  dateCreation: string;
}

const ProfileScreen: React.FC = () => {
  const [clientInfo, setClientInfo] = useState<ClientInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserInfo = async () => {
        setIsLoading(true);
        const token = await AsyncStorage.getItem('accessToken');
        const userId = await AsyncStorage.getItem('userId');

        if (!token || !userId) {
          setIsLoading(false);
          return;
        }

        try {
          const response = await fetch(`http://127.0.0.1:5006/Clients/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log('User data:', data);
            setClientInfo(data.data);
          } else {
            const errorData = await response.json();
            console.log('Error response:', errorData);
            Alert.alert('Erreur', 'Impossible de récupérer les informations de l\'utilisateur');
          }
        } catch (error) {
          console.log('Fetch error:', error);
          Alert.alert('Erreur', `Erreur de connexion au serveur : ${(error as Error).message}`);
        }

        setIsLoading(false);
      };

      fetchUserInfo();
    }, [])
  );

  const handleLogout = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('userId');
    navigation.navigate('Login'); // Navigate to the login screen
  };

  const handleSignUp = () => {
    navigation.navigate('TypeScreen');
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (!clientInfo) {
    return (
      <View style={styles.container}>
        <Text style={styles.notLoggedInText}>Veuillez vous connecter pour voir votre profil.</Text>
        <Image source={notLoggedInImage} style={styles.notLoggedInImage} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signUpText}>Pas de compte ? Je m'inscris !</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Bonjour {clientInfo.prenomClient} 👋</Text>
      </View>
      <View style={styles.profileContainer}>
        <Text style={styles.profileItem}>
          <Text style={styles.profileLabel}>Email : </Text>
          {clientInfo.email}
        </Text>
        <Text style={styles.profileItem}>
          <Text style={styles.profileLabel}>Nom : </Text>
          {clientInfo.nomClient}
        </Text>
        <Text style={styles.profileItem}>
          <Text style={styles.profileLabel}>Prénom : </Text>
          {clientInfo.prenomClient}
        </Text>
        <Text style={styles.profileItem}>
          <Text style={styles.profileLabel}>Téléphone : </Text>
          {clientInfo.telephone}
        </Text>
        <Text style={styles.profileItem}>
          <Text style={styles.profileLabel}>Profil : </Text>
          {clientInfo.profilClient}
        </Text>
        <Text style={styles.profileItem}>
          <Text style={styles.profileLabel}>Date de création : </Text>
          {new Date(clientInfo.dateCreation).toLocaleDateString()}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.buttonLogout}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Se déconnecter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  header: {
    marginTop: 100,
    textAlign: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    fontStyle: 'italic',
  },
  profileContainer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 1,
  },
  profileItem: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
  },
  profileLabel: {
    fontWeight: 'bold',
  },
  buttonLogout: {
    backgroundColor: '#FF3333',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    maxWidth : '80%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  notLoggedInText: {
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    padding: 20,
  },
  notLoggedInImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  signUpText: {
    marginTop: 20,
    color: 'black',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default ProfileScreen;
