// src/screens/Agendamento.js
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  StatusBar 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/theme';

// Dados Falsos dos Serviços (Depois virão do Banco)
const SERVICOS = [
  { id: '1', nome: 'Corte Degrade', preco: 'R$ 35,00', duracao: '40 min', icon: 'cut-outline' },
  { id: '2', nome: 'Barba Completa', preco: 'R$ 25,00', duracao: '30 min', icon: 'happy-outline' },
  { id: '3', nome: 'Corte + Barba', preco: 'R$ 50,00', duracao: '1h', icon: 'accessibility-outline' },
  { id: '4', nome: 'Sobrancelha', preco: 'R$ 15,00', duracao: '15 min', icon: 'eye-outline' },
  { id: '5', nome: 'Acabamento', preco: 'R$ 10,00', duracao: '10 min', icon: 'brush-outline' },
];

export default function Agendamento({ navigation }) {

  const handleSelectService = (servico) => {
    navigation.navigate('Calendario', { servicoSelecionado: servico });
  };

  const renderServiceCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.7}
      onPress={() => handleSelectService(item)}
    >
      {/* Ícone do lado esquerdo */}
      <View style={styles.iconContainer}>
        <Ionicons name={item.icon} size={28} color={theme.colors.primary} />
      </View>

      {/* Infos do Serviço */}
      <View style={styles.infoContainer}>
        <Text style={styles.serviceName}>{item.nome}</Text>
        <Text style={styles.serviceDuration}>{item.duracao}</Text>
      </View>

      {/* Preço e Setinha */}
      <View style={styles.priceContainer}>
        <Text style={styles.servicePrice}>{item.preco}</Text>
        <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      {/* --- HEADER COM BOTÃO VOLTAR --- */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={20} color={theme.colors.textPrimary} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Novo Agendamento</Text>

        {/* Espaço para balancear o layout */}
        <View style={{ width: 40 }} />
      </View>

      <Text style={styles.subTitle}>Qual serviço você deseja?</Text>

      <FlatList
        data={SERVICOS}
        keyExtractor={(item) => item.id}
        renderItem={renderServiceCard}
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
  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
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
  subTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 20,
  },
  
  // Card Styles
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255, 215, 0, 0.1)', 
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  serviceDuration: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary, 
    marginBottom: 4,
  }
});
