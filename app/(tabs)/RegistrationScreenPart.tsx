import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const NewClientForm = ({ profil }) => {
  const [prenomClient, setPrenomClient] = useState('');
  const [nomClient, setNomClient] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [codeGenere, setCodeGenere] = useState('');
  const [siret, setSiret] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [statutCompte, setStatutCompte] = useState(true);
  const [profilClient, setProfilClient] = useState(profil || 'Professionnel');

  const handleSubmit = async () => {
    if (!nomClient || !motDePasse || !siret || !telephone || !email) {
      Alert.alert('Erreur', 'Tous les champs obligatoires doivent être remplis');
      return;
    }

    const newClient = {
      prenomClient,
      nomClient,
      motDePasse,
      codeGenere,
      siret,
      telephone,
      statutCompte,
      profilClient,
      email,
    };

    try {
      const response = await fetch('http://localhost:5007/Clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClient),
      });

      if (response.ok) {
        Alert.alert('Succès', 'Client enregistré avec succès');
      } else {
        Alert.alert('Erreur', 'Une erreur est survenue lors de l\'enregistrement du client');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de se connecter au serveur');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Prénom</Text>
      <TextInput style={styles.input} value={prenomClient} onChangeText={setPrenomClient} />
      
      <Text style={styles.label}>Nom *</Text>
      <TextInput style={styles.input} value={nomClient} onChangeText={setNomClient} />
      
      <Text style={styles.label}>Mot de Passe *</Text>
      <TextInput style={styles.input} value={motDePasse} onChangeText={setMotDePasse} secureTextEntry />
      
      <Text style={styles.label}>Code Généré</Text>
      <TextInput style={styles.input} value={codeGenere} onChangeText={setCodeGenere} />
      
      <Text style={styles.label}>SIRET *</Text>
      <TextInput style={styles.input} value={siret} onChangeText={setSiret} keyboardType="numeric" />
      
      <Text style={styles.label}>Téléphone *</Text>
      <TextInput style={styles.input} value={telephone} onChangeText={setTelephone} keyboardType="phone-pad" />
      
      <Text style={styles.label}>Email *</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
      
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

export default NewClientForm;
