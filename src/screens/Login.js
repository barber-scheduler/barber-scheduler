// Arquivo: src/screens/Login.js
import React, { useState } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

import Button from "../components/Button"
import Input from "../components/Input"

export default function Login({ navigation }) {

  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function handleLogin() {

    if (phone.replace(/\D/g, "").length !== 11) {
      setError("Telefone incompleto");
      return
    }

    setError("")

    // interação com o backend
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >

      <Input
        label="Telefone"
        placeholder="DDD + Número"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        isPhone
      />

      <Input
        label="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <Text>{error}</Text>

      <Button
        title="Entrar"
        onPress={handleLogin}
      />

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});