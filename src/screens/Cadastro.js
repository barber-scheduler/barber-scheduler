// Arquivo: src/screens/Cadastro.js
import React, { useState } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

import Button from "../components/Button"
import Input from "../components/Input"

export default function Cadastro({ navigation }) {

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  async function handleRegister() {

    if (!name) {
      setError("Nome inválido")
      return
    }

    if (phone.replace(/\D/g, "").length !== 11) {
      setError("Telefone incompleto");
      return
    }

    if (password.length < 8 || password.length > 16) {
      setError("A senha não atende os requisitos")
      return
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem")
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
        label="Nome completo"
        value={name}
        onChangeText={(text) => {
          setName(text.replace(/[^A-Za-zÀ-ÿ\s]/g, ""))
        }}
      />

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
        placeholder="Entre 8 e 16 caracteres"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <Input
        label="Repita a senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
      />

      <Text>{error}</Text>

      <Button
        title="Cadastrar-se"
        onPress={handleRegister}
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