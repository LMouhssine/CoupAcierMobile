import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
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

  useEffect(() => {
    const fetchUserInfo = async () => {
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
          console.log('User data:', data); // Debugging: Check the entire response
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
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('userId');
    navigation.navigate('Login'); // Navigate to the login screen
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
        <Text>Veuillez vous connecter pour voir votre profil.</Text>
        <Image source={notLoggedInImage} style={styles.notLoggedInImage} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Se connecter</Text>
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
          <Text style={styles.profileLabel}>Date de Création : </Text>
          {new Date(clientInfo.dateCreation).toLocaleDateString()}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Déconnexion</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  goBackIcon: {
    marginTop: 60,
  },
  title: {
    marginTop: 60,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  profileContainer: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  notLoggedInImage: {
    width: 320,
    height: 320,
    marginBottom: 16,
  },
  profileItem: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  profileLabel: {
    fontWeight: 'bold',
    color: '#333',
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
  logoutButton: {
    backgroundColor: '#FF3333',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default ProfileScreen;
