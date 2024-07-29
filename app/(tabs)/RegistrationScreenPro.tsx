// RegistrationScreenPro.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const RegistrationScreenPro = () => {
  const [prenomClient, setPrenomClient] = useState('');
  const [nomClient, setNomClient] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [siret, setSiret] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [codeGenere, setCodeGenere] = useState('');
  
  // Function to get the current date in YYYY-MM-DD HH:MM:SS format
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
      codeGenere,
      dateCreation: getFormattedDate(),
    };

    try {
      const response = await fetch('http://localhost:5006/Clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClient),
      });

      if (response.ok) {
        Alert.alert('Succès', 'Client professionnel enregistré avec succès');
      } else {
        const errorData = await response.json();
        Alert.alert('Erreur', `Une erreur est survenue lors de l'enregistrement du client: ${errorData.message}`);
      }
    } catch (error) {
      Alert.alert('Erreur', `Impossible de se connecter au serveur: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
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

      <Text style={styles.label}>Code Généré</Text>
      <TextInput style={styles.input} value={codeGenere} onChangeText={setCodeGenere} />

      <Button title="Enregistrer" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});

export default RegistrationScreenPro;
