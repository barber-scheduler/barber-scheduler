import React from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/theme';

// Dados Fakes para o Dashboard
const AGENDAMENTOS = [
  { id: '1', cliente: 'João Pedro', servico: 'Corte + Barba', horario: '09:00' },
  { id: '2', cliente: 'Marcos Silva', servico: 'Corte Simples', horario: '10:00' },
  { id: '3', cliente: 'Lucas Almeida', servico: 'Sobrancelha', horario: '11:30' },
  { id: '4', cliente: 'Pedro Sampaio', servico: 'Platinado', horario: '14:00' },
];

export default function Homebarber({ navigation }) {


  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.appointmentCard}
      onPress={() => console.log("Clicou no agendamento de", item.cliente)}
    >
 
      <View style={styles.appointmentLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name="time-outline" size={20} color={theme.colors.primary} />
        </View>
        <View>
          <Text style={styles.clientName}>{item.cliente}</Text>
          <Text style={styles.serviceName}>{item.servico}</Text>
        </View>
      </View>

      <Text style={styles.timeText}>{item.horario}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      {/* --- 1. CABEÇALHO --- */}
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.date}>Quarta, 20 de Novembro</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('Agendamento')} 
        >
           <Ionicons name="add" size={24} color="#000" />
        </TouchableOpacity>
      </View>

    
      <View style={styles.statsContainer}>
        
       
        <View style={styles.statCard}>
           <Text style={styles.statLabel}>Confirmados</Text>
           <Text style={styles.statNumberYellow}>4</Text>
        </View>

        <View style={{ width: 15 }} /> 

        
        <View style={styles.statCard}>
           <Text style={styles.statLabel}>Concluídos</Text>
           <Text style={styles.statNumberWhite}>1</Text>
        </View>

      </View>

    
      <Text style={styles.sectionTitle}>Agendamentos de Hoje</Text>

      <FlatList
        data={AGENDAMENTOS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

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
  
  // Cabeçalho
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  date: {
    fontSize: 14,
    color: theme.colors.textSecondary, 
    marginTop: 4,
  },
  addButton: {
    backgroundColor: theme.colors.primary, 
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Estatísticas
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.surface, 
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  statLabel: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    marginBottom: 5,
  },
  statNumberYellow: {
    color: theme.colors.primary,
    fontSize: 28,
    fontWeight: 'bold',
  },
  statNumberWhite: {
    color: theme.colors.textPrimary,
    fontSize: 28,
    fontWeight: 'bold',
  },

  // Lista
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 15,
  },
  appointmentCard: {
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  appointmentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)', 
    padding: 10,
    borderRadius: 12,
    marginRight: 15,
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
  }
});