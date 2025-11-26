import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function Login({ navigation }) { 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simulação de Login</Text>
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Entrar como CLIENTE" 
          color="#2196F3" // Azul
          onPress={() => navigation.replace('MainClient')} 
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Entrar como BARBEIRO" 
          color="#D4AF37" // Dourado
          onPress={() => navigation.replace('MainBarber')} 
        />
      </View>

      <View style={styles.footer}>
        <Button 
          title="Criar Nova Conta" 
          color="gray"
          onPress={() => navigation.navigate('Cadastro')} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff',
    padding: 20
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 40 
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  footer: {
    marginTop: 40,
    width: '100%'
  }
});