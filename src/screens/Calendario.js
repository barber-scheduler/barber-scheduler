import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { useAuth } from '../contexts/AuthContext';

// ⚠️ AJUSTE SE MUDAR O AMBIENTE ⚠️
// - App Web / iOS Simulator: http://localhost:3333
// - Emulador Android: http://10.0.2.2:3333
// - Celular físico (Expo): http://SEU-IP:3333
const API_URL = 'http://localhost:3333';

// Horários que o barbeiro trabalha (fixos por enquanto)
const ALL_SLOTS = [
  '09:00', '10:00', '11:00', '12:00',
  '14:00', '15:00', '16:00', '17:00'
];

// Horários já agendados (mock local, depois podemos puxar do back)
const BOOKED_APPOINTMENTS = {
  '2025-12-05': ['10:00', '14:00', '17:00'],
  '2026-01-10': ['15:00'],
  '2026-02-20': [
    '09:00','10:00','11:00','12:00',
    '14:00','15:00','16:00','17:00'
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
    let slots = ALL_SLOTS.filter(slot => !booked.includes(slot));

    // Se for hoje, remove horários que já passaram
    if (selectedDate === moment().format('YYYY-MM-DD')) {
      const currentTime = moment().format('HH:mm');
      slots = slots.filter(slot =>
        moment(slot, 'HH:mm').isAfter(moment(currentTime, 'HH:mm'))
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

    const clientId = user.id;       // agora usa o cliente logado
    const professionalId = 1;       // ainda fixo, depois ligamos com barbeiro real
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
        Alert.alert('Erro', data?.error || 'Não foi possível criar o agendamento.');
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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>💈 Selecione a Data</Text>

      {servicoSelecionado && (
        <Text style={styles.serviceInfo}>
          Serviço:{' '}
          <Text style={{ fontWeight: 'bold' }}>{servicoSelecionado.name}</Text>
        </Text>
      )}

      <Calendar
        minDate={minDate}
        maxDate={maxDate}
        onDayPress={handleDayPress}
        current={minDate}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#007AFF' },
          ...Object.keys(BOOKED_APPOINTMENTS).reduce((acc, date) => {
            if (BOOKED_APPOINTMENTS[date].length === ALL_SLOTS.length) {
              acc[date] = { dotColor: 'red', marked: true };
            }
            return acc;
          }, {})
        }}
        theme={{
          selectedDayBackgroundColor: '#007AFF',
          todayTextColor: '#222222',
          arrowColor: '#007AFF',
        }}
      />

      <View style={styles.separator} />

      <Text style={styles.header}>⏰ Horários Disponíveis</Text>

      {selectedDate && (
        <View style={styles.slotsContainer}>
          {availableSlots.length > 0 ? (
            availableSlots.map(time => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.slotButton,
                  selectedTime === time && styles.slotSelected
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text
                  style={[
                    styles.slotText,
                    selectedTime === time && styles.slotTextSelected
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

      <TouchableOpacity
        style={[
          styles.confirmButton,
          (!selectedDate || !selectedTime || loading) && { opacity: 0.6 }
        ]}
        onPress={handleBooking}
        disabled={!selectedDate || !selectedTime || loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.confirmButtonText}>
            Agendar: {selectedDate ? moment(selectedDate).format('DD/MM') : 'Selecione a Data'} às {selectedTime || '...'}
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: '#222',
  },
  serviceInfo: {
    fontSize: 14,
    color: '#444',
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  slotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  slotButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    minWidth: 80,
    alignItems: 'center',
  },
  slotSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  slotText: {
    color: '#222',
    fontWeight: '600',
  },
  slotTextSelected: {
    color: '#fff',
  },
  noSlotsText: {
    fontSize: 16,
    color: '#888',
    padding: 10,
  },
  confirmButton: {
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
