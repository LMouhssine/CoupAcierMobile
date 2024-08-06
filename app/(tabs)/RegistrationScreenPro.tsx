import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const RegistrationScreenPro = () => {
  const [prenomClient, setPrenomClient] = useState('');
  const [nomClient, setNomClient] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [siret, setSiret] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const getFormattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleSubmit = async () => {
    const newClient = {
      prenomClient,
      nomClient,
      motDePasse,
      siret,
      telephone,
      statutCompte: true,
      profilClient: 'Professionnel',
      email,
      dateCreation: getFormattedDate(),
    };

    try {
      const response = await fetch('http://127.0.0.1:5006/Clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClient),
      });

      if (response.ok) {
        Alert.alert(
          'Succès',
          'Client professionnel enregistré avec succès',
          [{ text: 'OK', onPress: () => navigation.navigate('HomeScreen') }]
        );
      } else {
        const errorData = await response.json();
        Alert.alert('Erreur', `Une erreur est survenue lors de l'enregistrement du client: ${errorData.message}`);
      }
    } catch (error) {
      Alert.alert('Erreur', `Impossible de se connecter au serveur: ${error.message}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Icon
          name="arrow-back"
          type="material"
          size={28}
          color="#000"
          onPress={() => navigation.navigate('TypeScreen')}
        />
        <Text style={styles.title}>Inscription Professionnelle</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Prénom</Text>
        <TextInput style={styles.input} value={prenomClient} onChangeText={setPrenomClient} />
        
        <Text style={styles.label}>Nom</Text>
        <TextInput style={styles.input} value={nomClient} onChangeText={setNomClient} />

        <Text style={styles.label}>Mot de Passe</Text>
        <TextInput style={styles.input} value={motDePasse} onChangeText={setMotDePasse} secureTextEntry />
        
        <Text style={styles.label}>SIRET</Text>
        <TextInput style={styles.input} value={siret} onChangeText={setSiret} keyboardType="numeric" />
        
        <Text style={styles.label}>Téléphone</Text>
        <TextInput style={styles.input} value={telephone} onChangeText={setTelephone} keyboardType="phone-pad" />
        
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

        <Button title="Enregistrer" onPress={handleSubmit} buttonStyle={styles.submitButton} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  formContainer: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
  submitButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 16,
  },
});

export default RegistrationScreenPro;
