import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { theme } from '../utils/theme';
import { useAuth } from '../contexts/AuthContext';


// ⚠️ AJUSTE SE MUDAR O AMBIENTE ⚠️
// Web / iOS no PC: http://localhost:3333
// Emulador Android: http://10.0.2.2:3333
// Celular físico (Expo): http://SEU-IP:3333
const API_URL = 'http://localhost:3333';

// ⚠️ Por enquanto estamos usando clientId fixo (1)
// Depois podemos pegar o id do usuário logado

export default function MeusAgendamentos() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  async function carregarAgendamentos() {
    try {
      setErro('');
      setLoading(true);

      if (!user || !user.id) {
        setErro('Usuário não encontrado. Faça login novamente.');
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${API_URL}/clients/${user.id}/appointments`
      );

      const data = await response.json();

      if (!response.ok) {
        setErro(data?.error || 'Erro ao carregar agendamentos.');
        return;
      }

      setAppointments(data.appointments || []);
    } catch (err) {
      console.log(err);
      setErro('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarAgendamentos();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await carregarAgendamentos();
    setRefreshing(false);
  };

  function formatarDataHora(isoString) {
    const date = new Date(isoString);
    const data = date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
    });
    const hora = date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
    return `${data} às ${hora}`;
  }

  function traduzStatus(status) {
    switch (status) {
      case 'PENDING':
        return 'Pendente';
      case 'CONFIRMED':
        return 'Confirmado';
      case 'CANCELLED':
        return 'Cancelado';
      case 'DONE':
        return 'Concluído';
      case 'NO_SHOW':
        return 'Não compareceu';
      default:
        return status;
    }
  }

  function corStatus(status) {
    switch (status) {
      case 'PENDING':
        return '#f1c40f';
      case 'CONFIRMED':
        return '#2ecc71';
      case 'CANCELLED':
        return '#e74c3c';
      case 'DONE':
        return '#3498db';
      case 'NO_SHOW':
        return '#9b59b6';
      default:
        return theme.colors.textSecondary;
    }
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.serviceName}>{item.service_name}</Text>
      <Text style={styles.professionalName}>
        Profissional: {item.professional_name}
      </Text>
      <Text style={styles.dateText}>
        {formatarDataHora(item.start_time)}
      </Text>

      <View style={styles.footerRow}>
        <Text style={[styles.statusText, { color: corStatus(item.status) }]}>
          {traduzStatus(item.status)}
        </Text>

        {item.total_price_cents != null && (
          <Text style={styles.priceText}>
            {(item.total_price_cents / 100).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seus Agendamentos</Text>

      {loading && (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator size="small" color={theme.colors.primary} />
        </View>
      )}

      {!!erro && !loading && (
        <Text style={styles.errorText}>{erro}</Text>
      )}

      {!loading && appointments.length === 0 && !erro && (
        <Text style={styles.emptyText}>
          Você ainda não possui agendamentos.
        </Text>
      )}

      {!loading && appointments.length > 0 && (
        <FlatList
          data={appointments}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 16,
  },
  errorText: {
    color: '#ff6b6b',
    marginTop: 10,
  },
  emptyText: {
    color: theme.colors.textSecondary,
    marginTop: 10,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  professionalName: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  dateText: {
    fontSize: 14,
    color: theme.colors.textPrimary,
    marginTop: 8,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
