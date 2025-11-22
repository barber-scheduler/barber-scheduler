// Arquivo: src/screens/Cadastro.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

import Button from "../components/Button"
import Input from "../components/Input"

export default function Cadastro() {

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
        <Input
          label="Nome completo:"
          value={name}
          onChangeText={setName}
        />

        <Input
          label="Telefone:"
          placeholder="DDD + Número"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <Input
          label="Senha:"
          placeholder="Mínimo de 8 caracteres"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <Text>{error}</Text>

        <Button
          title="Cadastrar-se"
        />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});