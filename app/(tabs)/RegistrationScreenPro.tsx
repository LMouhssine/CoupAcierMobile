import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Keyboard } from 'react-native';

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

  const handleSubmit = async () => {
    Keyboard.dismiss(); // Dismiss keyboard on submit

    if (!form.companyName || !form.siretNumber || !form.companyAddress || !form.email || !form.phoneNumber || !form.password || !form.confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Registration successful');
        console.log('User registered:', data);
        // Optionally navigate to the next screen after successful registration
      } else {
        Alert.alert('Error', data.error || 'Registration failed');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
      console.error('Error during registration:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
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
        keyboardType="numeric"
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
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Numéro de téléphone"
        value={form.phoneNumber}
        onChangeText={(value) => handleChange('phoneNumber', value)}
        keyboardType="phone-pad"
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
    padding: 15,
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
