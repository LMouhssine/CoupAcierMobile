import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const NotificationsScreen = () => {
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
        <Text style={styles.title}>Notifications</Text>
      </View>
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationText}>
          Notification 1 : Vous avez une nouvelle offre sur votre produit préféré.
        </Text>
      </View>
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationText}>
          Notification 2 : Votre commande a été expédiée.
        </Text>
      </View>
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationText}>
          Notification 3 : Nouvelle collection disponible maintenant.
        </Text>
      </View>
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationText}>
          Notification 4 : Mise à jour de la politique de confidentialité.
        </Text>
      </View>
      <Button title="Tout Marquer Comme Lu" buttonStyle={styles.markAllReadButton} />
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
  notificationContainer: {
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
  notificationText: {
    fontSize: 16,
    color: '#333',
  },
  markAllReadButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default NotificationsScreen;
