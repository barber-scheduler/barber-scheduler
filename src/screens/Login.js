import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>
      
      <Button 
        title="Entrar (Ir para Home)" 
        onPress={() => navigation.replace('Main')} 
      />
      
      <View style={{ marginTop: 20 }}>
        <Button 
          title="Criar Conta" 
          onPress={() => navigation.navigate('Cadastro')} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 }
});