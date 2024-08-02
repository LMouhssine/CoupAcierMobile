import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Assurez-vous de placer une image dans le dossier assets et de l'importer
import notLoggedInImage from '../../assets/images/login.png';

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState(null);
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
        const response = await fetch(`http://localhost:5006/login/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          Alert.alert('Erreur', 'Impossible de récupérer les informations de l\'utilisateur');
        }
      } catch (error) {
        Alert.alert('Erreur', `Erreur de connexion au serveur : ${error.message}`);
      }

      setIsLoading(false);
    };

    fetchUserInfo();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (!userInfo) {
    return (
      <View style={styles.container}>
        <Text>Veuillez vous connecter pour voir votre profil.</Text>
        <Image source={notLoggedInImage} style={styles.notLoggedInImage} />
        <Button title="Se connecter" onPress={() => navigation.navigate('Login')} />
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
        />
        <Text style={styles.title}>Profil Client</Text>
      </View>
      <View style={styles.profileContainer}>
        <Text style={styles.profileItem}>
          <Text style={styles.profileLabel}>Prénom: </Text>
          {userInfo.prenomClient}
        </Text>
        <Text style={styles.profileItem}>
          <Text style={styles.profileLabel}>Nom: </Text>
          {userInfo.nomClient}
        </Text>
        <Text style={styles.profileItem}>
          <Text style={styles.profileLabel}>Email: </Text>
          {userInfo.email}
        </Text>
        <Text style={styles.profileItem}>
          <Text style={styles.profileLabel}>Téléphone: </Text>
          {userInfo.telephone}
        </Text>
        <Text style={styles.profileItem}>
          <Text style={styles.profileLabel}>Siret: </Text>
          {userInfo.siret}
        </Text>
        <Text style={styles.profileItem}>
          <Text style={styles.profileLabel}>Profil: </Text>
          {userInfo.profilClient}
        </Text>
        <Text style={styles.profileItem}>
          <Text style={styles.profileLabel}>Date de Création: </Text>
          {userInfo.dateCreation}
        </Text>
        <Button title="Modifier Profil" buttonStyle={styles.editProfileButton} onPress={() => alert('Modifier Profil')} />
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  profileContainer: {
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  notLoggedInImage: {
    width: 200,
    height: 200,
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
  editProfileButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 16,
    marginTop: 16,
  },
});

export default ProfileScreen;
