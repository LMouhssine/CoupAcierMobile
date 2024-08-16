import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notLoggedInImage from '../../assets/images/login.png';

interface ClientInfo {
  email: string;
  nomClient: string;
  prenomClient: string;
  telephone: string;
  profilClient: string;
  dateCreation: string;
}

const ProfileScreen = () => {
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
          Alert.alert('Erreur', `Erreur de connexion au serveur : ${error.message}`);
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
        <Icon
          name="arrow-back"
          type="material"
          size={28}
          color="#000"
          onPress={() => navigation.goBack()}
          containerStyle={styles.goBackIcon}
        />
        <Text style={styles.title}>Profil Client</Text>
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
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
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
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  goBackIcon: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileContainer: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  profileItem: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  profileLabel: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  notLoggedInText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  notLoggedInImage: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  signUpText: {
    color: 'blue',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default ProfileScreen;
