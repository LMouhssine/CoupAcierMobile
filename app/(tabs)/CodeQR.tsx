import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coup'Acier Code QR</Text>
      <QRCode
        value="https://github.com/LMouhssine"
        size={200}
        color="black"        
        backgroundColor="white"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default App;
