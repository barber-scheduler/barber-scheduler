import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/theme';
import { useAuth } from '../contexts/AuthContext';

// ⚠️ AJUSTE SE MUDAR O AMBIENTE ⚠️
// Web / iOS no PC: http://localhost:3333
// Emulador Android: http://10.0.2.2:3333
// Celular físico (Expo): http://SEU-IP:3333
const API_URL = 'http://localhost:3333';

export default function HomeBarber({ navigation }) {
  const { user } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [erro, setErro] = useState('');

  // Data atual em pt-BR
  const today = new Date();
  const weekdayNames = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ];
  const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const weekday = weekdayNames[today.getDay()];
  const day = String(today.getDate()).padStart(2, '0');
  const month = monthNames[today.getMonth()];
  const formattedDate = `${weekday}, ${day} de ${month}`;

  // veio do login (user.role === 'BARBER')
  const professionalId = user?.professional?.id;

  const carregarAgendamentos = useCallback(async () => {
    if (!professionalId) {
      setErro('Profissional não encontrado para este usuário.');
      setLoading(false);
      setRefreshing(false);
      return;
    }

    try {
      if (!refreshing) setLoading(true);
      setErro('');

      const response = await fetch(
        `${API_URL}/professionals/${professionalId}/appointments/today`
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
      setRefreshing(false);
    }
  }, [professionalId, refreshing]);

  useEffect(() => {
    carregarAgendamentos();
  }, [carregarAgendamentos]);

  const onRefresh = () => {
    setRefreshing(true);
    carregarAgendamentos();
  };

  const handleCancel = (id) => {
    Alert.alert(
      'Cancelar agendamento',
      'Tem certeza que deseja cancelar este agendamento?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(
                `${API_URL}/appointments/${id}/cancel`,
                {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                }
              );

              const data = await response.json();

              if (!response.ok || !data.success) {
                Alert.alert(
                  'Erro',
                  data?.error || 'Erro ao cancelar agendamento.'
                );
                return;
              }

              setAppointments((prev) =>
                prev.filter((appointment) => appointment.id !== id)
              );
              Alert.alert('Sucesso', 'Agendamento cancelado com sucesso.');
            } catch (error) {
              console.log(error);
              Alert.alert('Erro', 'Erro de conexão com o servidor.');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => {
    const hora = new Date(item.start_time).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <View style={styles.appointmentCard}>
        <View style={styles.appointmentLeft}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="time-outline"
              size={20}
              color={theme.colors.primary}
            />
          </View>
          <View>
            <Text style={styles.clientName}>{item.client_name}</Text>
            <Text style={styles.serviceName}>{item.service_name}</Text>
          </View>
        </View>

        <View style={styles.appointmentRight}>
          <Text style={styles.timeText}>{hora}</Text>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => handleCancel(item.id)}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.background}
      />

      {/* --- 1. CABEÇALHO --- */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Bem-vindo,</Text>
          <Text style={styles.barberName}>
            {user?.full_name || 'Barbeiro'}
          </Text>
        </View>
        <Ionicons
          name="person-circle-outline"
          size={40}
          color={theme.colors.primary}
        />
      </View>

      {/* --- 2. DATA --- */}
      <Text style={styles.dateText}>{formattedDate}</Text>

      {/* --- 3. CARD DE RESUMO --- */}
      <View style={styles.summaryCard}>
        <View style={styles.summarySection}>
          <Text style={styles.statLabel}>Agendados</Text>
          <Text style={styles.statNumber}>{appointments.length || 0}</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summarySection}>
          <Text style={styles.statLabel}>Concluidos</Text>
          <Text style={styles.statNumberWhite}>0</Text>
        </View>
      </View>

      {/* --- 4. LISTA DE AGENDAMENTOS --- */}
      <Text style={styles.sectionTitle}>Agendamentos de Hoje</Text>

      {loading && !refreshing && (
        <ActivityIndicator
          size="large"
          color={theme.colors.primary}
          style={{ marginTop: 20 }}
        />
      )}

      {!loading && !!erro && (
        <Text style={styles.errorText}>{erro}</Text>
      )}

      {!loading && !erro && appointments.length === 0 && (
        <Text style={styles.emptyText}>Nenhum agendamento para hoje.</Text>
      )}

      {!loading && !erro && appointments.length > 0 && (
        <FlatList
          data={appointments}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
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
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  barberName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  dateText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 16,
  },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: '#262626',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summarySection: {
    flex: 1,
    alignItems: 'center',
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#444',
  },
  statLabel: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  statNumberWhite: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 12,
  },
  appointmentCard: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  appointmentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appointmentRight: {
    alignItems: 'flex-end',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  clientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  serviceName: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  cancelButton: {
    marginTop: 8,
    backgroundColor: '#ff4444',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  errorText: {
    marginTop: 16,
    fontSize: 14,
    color: '#e74c3c',
  },
});
