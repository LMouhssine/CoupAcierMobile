// src/RegistrationScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const RegistrationScreen = () => {
  const [form, setForm] = useState({
    companyName: '',
    siretNumber: '',
    companyAddress: '',
    addressComplement: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    // Handle form submission logic
    console.log(form);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Inscription Professionnel</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom de la société"
        value={form.companyName}
        onChangeText={(value) => handleChange('companyName', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Numéro de SIRET"
        value={form.siretNumber}
        onChangeText={(value) => handleChange('siretNumber', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Adresse Postale de la société"
        value={form.companyAddress}
        onChangeText={(value) => handleChange('companyAddress', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Complément d'adresse"
        value={form.addressComplement}
        onChangeText={(value) => handleChange('addressComplement', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={form.email}
        onChangeText={(value) => handleChange('email', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Numéro de téléphone"
        value={form.phoneNumber}
        onChangeText={(value) => handleChange('phoneNumber', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={form.password}
        onChangeText={(value) => handleChange('password', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmer le mot de passe"
        secureTextEntry
        value={form.confirmPassword}
        onChangeText={(value) => handleChange('confirmPassword', value)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 30,
    backgroundColor: '#FFEB3B',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
  },
  button: {
    backgroundColor: 'black',
    marginTop: 25,
    // paddingVertical: 15,
    padding: 15,
    // paddingHorizontal: 40,
    borderRadius: 25,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegistrationScreen;
