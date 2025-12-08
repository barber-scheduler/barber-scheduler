// Arquivo: src/screens/Cadastro.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";

import { apiPost } from "../api/api";
import Button from "../components/Button";
import Input from "../components/Input";

export default function Cadastro({ navigation }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {

    if (!name.trim()) {
      setError("Nome inválido");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("E-mail inválido");
      return;
    }

    if (phone.replace(/\D/g, "").length !== 11) {
      setError("Telefone incompleto");
      return;
    }

    if (password.length < 8 || password.length > 16) {
      setError("A senha deve ter entre 8 e 16 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    setLoading(true);
    setError("");

    const { ok, data } = await apiPost("/auth/register", {
      fullName: name.trim(),
      email: email.trim().toLowerCase(),
      phone,
      password,
      role: "CLIENTE",
    });

    setLoading(false);

    if (!ok) {
      setError(data?.error || "Erro ao cadastrar. Tente novamente.");
      return;
    }

    Alert.alert(
      "Cadastro realizado!",
      "Sua conta foi criada com sucesso.",
      [
        {
          text: "OK",
          onPress: () => navigation.replace("Login") // VOLTA PARA LOGIN
        }
      ]
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >

        {/* Botão de voltar */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={28} color="#d4af37" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        <View style={styles.container}>

          <Text style={styles.title}>Criar Conta</Text>

          <Input
            label="Nome completo"
            value={name}
            onChangeText={(t) => setName(t.replace(/[^A-Za-zÀ-ÿ\s]/g, ""))}
          />

          <Input
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Input
            label="Telefone"
            value={phone}
            onChangeText={setPhone}
            isPhone
            keyboardType="phone-pad"
          />

          <Input
            label="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Entre 8 e 16 caracteres"
          />

          <Input
            label="Confirmar senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          {loading ? (
            <ActivityIndicator size="small" color="#fff" style={{ marginTop: 16 }} />
          ) : (
            <Button title="Cadastrar-se" onPress={handleRegister} />
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
    alignItems: "center",
    width: "100%",
    paddingTop: 10,
  },
  title: {
    color: "#d4af37",
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  error: {
    color: "#ff6b6b",
    marginTop: 8,
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    paddingTop: 10,
    marginBottom: 5,
  },
  backText: {
    color: "#d4af37",
    marginLeft: 6,
    fontSize: 16,
    fontWeight: "500",
  },
});
