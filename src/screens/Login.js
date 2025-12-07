// Arquivo: src/screens/Login.js
import { useAuth } from "../contexts/AuthContext";
import React, { useState } from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from "../components/Button";
import Input from "../components/Input";
import { apiPost } from "../api/api";

// ⚠️ AJUSTE AQUI CONFORME SEU AMBIENTE ⚠️
//
// Se estiver rodando em:
// - Android EMULATOR: use "http://10.0.2.2:3333"
// - iOS SIMULATOR: use "http://localhost:3333"
// - Celular físico com Expo: IP da sua máquina, ex: "http://192.168.0.10:3333"
const API_URL = "http://10.0.2.2:3333";

export default function Login({ navigation }) {
  const { signIn } = useAuth();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function normalizePhone(value) {
    return value.replace(/\D/g, "");
  }

  async function handleLogin() {
  const onlyNumbers = phone.replace(/\D/g, "");

  if (onlyNumbers.length !== 11) {
    setError("Telefone incompleto");
    return;
  }

  if (!password) {
    setError("Informe a senha");
    return;
  }

  setLoading(true);
  setError("");

  const { ok, data } = await apiPost("/auth/login", {
    phone,
    password
  });

  if (!ok) {
    setError(data?.error || "Erro desconhecido");
    setLoading(false);
    return;
  }

  const user = data.user;

  if (!user) {
    setError("Resposta inválida do servidor.");
    setLoading(false);
    return;
  }

  // salva usuário globalmente (contexto + AsyncStorage)
  await signIn(user);

  // navega conforme o role
  if (user.role === "BARBER") {
    navigation.replace("MainBarber");
  } else {
    navigation.replace("MainClient");
  }

  setLoading(false);
}

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        onPress={Keyboard.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
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

          {!!error && <Text style={styles.error}>{error}</Text>}

          {loading ? (
            <ActivityIndicator size="small" color="#fff" style={{ marginTop: 16 }} />
          ) : (
            <Button
              title="Entrar"
              onPress={handleLogin}
            />
          )}
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
    backgroundColor: "#121212",
  },
  inner: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "#ff6b6b",
    marginTop: 8,
  },
});
