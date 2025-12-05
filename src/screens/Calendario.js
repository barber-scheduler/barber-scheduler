import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
// Você precisará instalar esta biblioteca: npm install react-native-calendars
import { Calendar } from 'react-native-calendars';
// (Opcional) Instalar o 'moment' pode facilitar o tratamento de datas: npm install moment
import moment from 'moment';

// --- 1. Dados Falsos (Simulando o Backend) ---
// Horários que o barbeiro TRABALHA, de hora em hora
const ALL_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', 
  '14:00', '15:00', '16:00', '17:00'
];

// Horários JÁ AGENDADOS para algumas datas
const BOOKED_APPOINTMENTS = {
  // A chave é a data no formato 'YYYY-MM-DD'
  '2025-12-05': ['10:00', '14:00', '17:00'], // Exemplo para 5 de Dezembro de 2025
  '2026-01-10': ['15:00'],
  '2026-02-20': ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'], // Dia lotado
};

// --- 2. Lógica de Limite de Data ---
// Configura o 'maxDate' para 2 meses depois do mês atual (último dia do terceiro mês)
const getBoundaryDates = () => {
    const today = moment();
    const minDate = today.format('YYYY-MM-DD');

    // Vai para o primeiro dia de 3 meses a partir de agora e subtrai 1 dia para pegar o final do segundo mês.
    // Exemplo: Hoje é 01/Dez. + 3 meses = 01/Mar. - 1 dia = 28/Fev. (Último dia do 3º mês permitido)
    const maxDate = today.add(3, 'months').subtract(1, 'day').format('YYYY-MM-DD');
    
    return { minDate, maxDate };
};

const { minDate, maxDate } = getBoundaryDates();

// --- 3. Componente Principal ---
export default function AppointmentScheduler() {
    const [selectedDate, setSelectedDate] = useState(minDate);
    const [selectedTime, setSelectedTime] = useState(null);

    // Filtra os horários disponíveis (após seleção de data)
    const availableSlots = useMemo(() => {
        // Horários já agendados para a data selecionada (ou array vazio se não houver)
        const booked = BOOKED_APPOINTMENTS[selectedDate] || [];
        
        // Retorna todos os slots que NÃO estão na lista de agendados
        const slots = ALL_SLOTS.filter(slot => !booked.includes(slot));
        
        // Se a data selecionada for hoje, remove horários que já passaram
        if (selectedDate === moment().format('YYYY-MM-DD')) {
            const currentTime = moment().format('HH:mm');
            return slots.filter(slot => moment(slot, 'HH:mm').isAfter(moment(currentTime, 'HH:mm')));
        }

        return slots;
    }, [selectedDate]); // Recalcula sempre que a data selecionada mudar

    const handleDayPress = useCallback((day) => {
        setSelectedDate(day.dateString);
        setSelectedTime(null); // Reseta o horário ao mudar o dia
    }, []);

    const handleBooking = () => {
        if (!selectedDate || !selectedTime) {
            Alert.alert("Erro", "Por favor, selecione uma data e um horário.");
            return;
        }

        Alert.alert(
            "Confirmação",
            `Agendamento para ${moment(selectedDate).format('DD/MM/YYYY')} às ${selectedTime} confirmado!`,
            [
                { text: "OK" }
            ]
        );
        // Aqui você faria a chamada API para salvar o agendamento no backend
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>💈 Selecione a Data</Text>
            
            <Calendar
                // Configurações de Data
                minDate={minDate}
                maxDate={maxDate}
                onDayPress={handleDayPress}
                current={minDate} // Começa no mês atual
                
                // Marca o dia selecionado
                markedDates={{
                    [selectedDate]: { selected: true, selectedColor: '#007AFF' },
                    ...Object.keys(BOOKED_APPOINTMENTS).reduce((acc, date) => {
                        // Marca datas lotadas com um ponto
                        if (BOOKED_APPOINTMENTS[date].length === ALL_SLOTS.length) {
                             acc[date] = { dotColor: 'red', marked: true };
                        }
                        return acc;
                    }, {})
                }}
                
                // Estilos do Calendário
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
                        <Text style={styles.noSlotsText}>Nenhum horário disponível neste dia.</Text>
                    )}
                </View>
            )}

            <TouchableOpacity 
                style={styles.confirmButton} 
                onPress={handleBooking}
                disabled={!selectedDate || !selectedTime}
            >
                <Text style={styles.confirmButtonText}>
                    Agendar: {selectedDate ? moment(selectedDate).format('DD/MM') : 'Selecione a Data'} às {selectedTime || '...'}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

// --- 4. Estilos ---
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
        backgroundColor: '#34C759', // Verde de confirmação
        padding: 15,
        borderRadius: 10,
        marginTop: 30,
        marginBottom: 50,
        alignItems: 'center',
        opacity: 1, // Você pode usar o disabled no TouchableOpacity para controlar a opacidade
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
});