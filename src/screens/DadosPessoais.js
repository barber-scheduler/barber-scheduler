// src/screens/DadosPessoais.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { theme } from '../utils/theme';

export default function DadosPessoais() {
  const { user } = useAuth();
  const navigation = useNavigation();

  function traduzRole(role) {
    switch (role) {
      case 'CLIENTE':
        return 'Cliente';
      case 'BARBER':
        return 'Barbeiro';
      case 'ADMIN':
        return 'Administrador';
      default:
        return role;
    }
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Dados pessoais</Text>
        <Text style={styles.info}>Nenhum usuário logado.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* Botão Voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={26} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Dados pessoais</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nome completo</Text>
        <Text style={styles.value}>{user.full_name}</Text>

        <Text style={styles.label}>E-mail</Text>
        <Text style={styles.value}>{user.email}</Text>

        <Text style={styles.label}>Telefone</Text>
        <Text style={styles.value}>{user.phone}</Text>

        <Text style={styles.label}>Tipo de conta</Text>
        <Text style={styles.value}>{traduzRole(user.role)}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
    paddingTop: 50,
  },

  // Botão voltar interno
  backButton: {
    marginBottom: 10,
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 20,
  },

  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  label: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 8,
  },

  value: {
    fontSize: 16,
    color: theme.colors.textPrimary,
    fontWeight: '500',
  },

  info: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
});
