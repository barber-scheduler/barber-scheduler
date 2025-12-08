// src/screens/Sucesso.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/theme';

export default function Sucesso({ navigation }) {
  function handleGoToMyAppointments() {
    // Volta para o fluxo principal do cliente
    // já abrindo a aba "MeusAgendamentos"
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'MainClient',
          params: {
            screen: 'MeusAgendamentos',
          },
        },
      ],
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.background}
      />

      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Ionicons
            name="checkmark-circle"
            size={72}
            color={theme.colors.success}
          />
        </View>

        <Text style={styles.title}>Agendamento realizado com sucesso!</Text>

        <Text style={styles.subtitle}>
          Seu horário foi reservado. Você pode conferir todos os seus agendamentos na próxima tela.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleGoToMyAppointments}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Ir para Meus Agendamentos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
  },
  iconContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: theme.colors.surfaceHighlight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    marginTop: 8,
    width: '100%',
    paddingVertical: 14,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000', // contrasta com o amarelo
    fontSize: 15,
    fontWeight: 'bold',
  },
});
