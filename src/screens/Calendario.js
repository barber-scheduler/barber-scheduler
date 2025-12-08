// src/screens/Calendario.js
import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { useAuth } from '../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/theme';

// ⚠️ AJUSTE SE MUDAR O AMBIENTE ⚠️
// - App Web / iOS Simulator: http://localhost:3333
// - Emulador Android: http://10.0.2.2:3333
// - Celular físico (Expo): http://SEU-IP:3333
const API_URL = 'http://localhost:3333';

// Horários que o barbeiro trabalha (fixos por enquanto)
const ALL_SLOTS = [
  '09:00', '10:00', '11:00', '12:00',
  '14:00', '15:00', '16:00', '17:00',
];

// Horários já agendados (mock local, depois podemos puxar do back)
const BOOKED_APPOINTMENTS = {
  '2025-12-05': ['10:00', '14:00', '17:00'],
  '2026-01-10': ['15:00'],
  '2026-02-20': [
    '09:00', '10:00', '11:00', '12:00',
    '14:00', '15:00', '16:00', '17:00',
  ],
};

// Limites de data (de hoje até +3 meses)
const getBoundaryDates = () => {
  const today = moment();
  const minDate = today.format('YYYY-MM-DD');
  const maxDate = today.add(3, 'months').subtract(1, 'day').format('YYYY-MM-DD');
  return { minDate, maxDate };
};

const { minDate, maxDate } = getBoundaryDates();

export default function Calendario({ route, navigation }) {
  const { user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(minDate);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(false);

  const servicoSelecionado = route?.params?.servicoSelecionado || null;

  // Filtra horários disponíveis para a data selecionada
  const availableSlots = useMemo(() => {
    const booked = BOOKED_APPOINTMENTS[selectedDate] || [];
    let slots = ALL_SLOTS.filter((slot) => !booked.includes(slot));

    // Se for hoje, remove horários que já passaram
    if (selectedDate === moment().format('YYYY-MM-DD')) {
      const currentTime = moment().format('HH:mm');
      slots = slots.filter((slot) =>
        moment(slot, 'HH:mm').isAfter(moment(currentTime, 'HH:mm')),
      );
    }

    return slots;
  }, [selectedDate]);

  const handleDayPress = useCallback((day) => {
    setSelectedDate(day.dateString);
    setSelectedTime(null);
  }, []);

  function montarStartTime() {
    // selectedDate = 'YYYY-MM-DD', selectedTime = 'HH:mm'
    return `${selectedDate}T${selectedTime}:00`;
  }

  async function handleBooking() {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Erro', 'Por favor, selecione uma data e um horário.');
      return;
    }

    if (!servicoSelecionado || !servicoSelecionado.id) {
      Alert.alert('Erro', 'Serviço selecionado inválido.');
      return;
    }

    if (!user || !user.id) {
      Alert.alert('Erro', 'Usuário não encontrado. Faça login novamente.');
      return;
    }

    const clientId = user.id;      // usa o cliente logado
    const professionalId = 1;      // ainda fixo, depois liga com barbeiro real
    const serviceId = servicoSelecionado.id;
    const startTime = montarStartTime();

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId,
          professionalId,
          serviceId,
          startTime,
          notes: null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log('Erro ao criar agendamento:', data);
        Alert.alert(
          'Erro',
          data?.error || 'Não foi possível criar o agendamento.',
        );
        return;
      }

      // Sucesso: leva para tela "Sucesso"
      navigation.replace('Sucesso');
    } catch (err) {
      console.log(err);
      Alert.alert('Erro', 'Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  }

  // Datas marcadas (selecionada + dias totalmente lotados)
  const markedDates = {
    [selectedDate]: { selected: true, selectedColor: theme.colors.primary },
    ...Object.keys(BOOKED_APPOINTMENTS).reduce((acc, date) => {
      if (BOOKED_APPOINTMENTS[date].length === ALL_SLOTS.length) {
        acc[date] = { dotColor: 'red', marked: true };
      }
      return acc;
    }, {}),
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER COM BOTÃO DE VOLTAR */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            size={20}
            color={theme.colors.textPrimary}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Escolha a data</Text>

        {/* Espaço para balancear o layout */}
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* CARD DO CALENDÁRIO */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}></Text>

          {servicoSelecionado && (
            <Text style={styles.serviceInfo}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: theme.colors.textPrimary,
                }}
              >
                {servicoSelecionado.name}
              </Text>
            </Text>
          )}

          <Calendar
            minDate={minDate}
            maxDate={maxDate}
            onDayPress={handleDayPress}
            current={minDate}
            markedDates={markedDates}
            theme={{
              calendarBackground: theme.colors.surface,
              dayTextColor: theme.colors.textPrimary,
              monthTextColor: theme.colors.textPrimary,
              textSectionTitleColor: theme.colors.textSecondary,
              selectedDayBackgroundColor: theme.colors.primary,
              selectedDayTextColor: '#000',
              todayTextColor: theme.colors.primary,
              arrowColor: theme.colors.primary,
            }}
          />
        </View>

        {/* CARD DE HORÁRIOS */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>⏰ Horários Disponíveis</Text>

          {selectedDate && (
            <View style={styles.slotsContainer}>
              {availableSlots.length > 0 ? (
                availableSlots.map((time) => (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.slotButton,
                      selectedTime === time && styles.slotSelected,
                    ]}
                    onPress={() => setSelectedTime(time)}
                  >
                    <Text
                      style={[
                        styles.slotText,
                        selectedTime === time && styles.slotTextSelected,
                      ]}
                    >
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.noSlotsText}>
                  Nenhum horário disponível neste dia.
                </Text>
              )}
            </View>
          )}
        </View>

        {/* BOTÃO DE CONFIRMAR AGENDAMENTO */}
        <TouchableOpacity
          style={[
            styles.confirmButton,
            (!selectedDate || !selectedTime || loading) && { opacity: 0.6 },
          ]}
          onPress={handleBooking}
          disabled={!selectedDate || !selectedTime || loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.confirmButtonText}>
              Agendar:{' '}
              {selectedDate
                ? moment(selectedDate).format('DD/MM')
                : 'Selecione a Data'}{' '}
              às {selectedTime || '...'}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
    paddingTop: 50,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  content: {
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 12,
  },
  serviceInfo: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 16,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  slotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  slotButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: theme.colors.surfaceHighlight,
  },
  slotSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  slotText: {
    color: theme.colors.textPrimary,
    fontWeight: '600',
  },
  slotTextSelected: {
    color: '#000',
  },
  noSlotsText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    paddingVertical: 10,
  },
  confirmButton: {
    backgroundColor: theme.colors.success,
    paddingVertical: 15,
    borderRadius: theme.borderRadius.lg,
    marginTop: 8,
    marginBottom: 24,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
