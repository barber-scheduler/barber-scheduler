// Arquivo: src/screens/Login.js
import React, { useState } from 'react';

import {
  Image,
  View,
  Text,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView 
        onPress={Keyboard.container} 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.inner}>

          <Image
            source={require("../../assets/logo.png")}
            style={{ width: 230, height: 230, marginTop: 7 }}
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
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          <Text style={styles.error}>{error}</Text>

          <Button
            title="Entrar"
            onPress={handleLogin}
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
    color: "#FFFF",
  },
});
