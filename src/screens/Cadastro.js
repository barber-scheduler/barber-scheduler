// Arquivo: src/screens/Cadastro.js
import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView onPress={Keyboard.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.inner}>

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

          <Text style={styles.error}>{error}</Text>

          <Button
            title="Cadastrar-se"
            onPress={handleRegister}
          />

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#121212",
  },
  container: {
    flex: 1,
    backgroundColor: "#121212"
  },
  inner: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "#FFFFFF",
  },
});