import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
          John
        </Text>
        <Text style={styles.profileItem}>
          <Text style={styles.profileLabel}>Nom: </Text>
          Doe
        </Text>
        <Text style={styles.profileItem}>
          <Text style={styles.profileLabel}>Email: </Text>
          john.doe@example.com
        </Text>
        <Text style={styles.profileItem}>
          <Text style={styles.profileLabel}>Téléphone: </Text>
          0987654326
        </Text>
        <Text style={styles.profileItem}>
          <Text style={styles.profileLabel}>Siret: </Text>
          12345678901234
        </Text>
        <Text style={styles.profileItem}>
          <Text style={styles.profileLabel}>Profil: </Text>
          Particulier
        </Text>
        <Text style={styles.profileItem}>
          <Text style={styles.profileLabel}>Date de Création: </Text>
          2024-06-29 17:02:40
        </Text>
      </View>
      <Button title="Modifier Profil" buttonStyle={styles.editProfileButton} onPress={() => alert('Modifier Profil')} />
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
  profileContainer: {
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
  },
});

export default ProfileScreen;
