// src/screens/Agendamento.js
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/theme';

// Ajuste esse endereço se estiver rodando em device físico
const API_URL = 'http://localhost:3333';
const BARBERSHOP_ID = 1;

export default function Agendamento({ navigation }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Busca serviços do backend
  useEffect(() => {
    async function loadServices() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${API_URL}/barbershops/${BARBERSHOP_ID}/services`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || 'Erro ao buscar serviços.');
        }

        // Mapeia para o formato que a tela usa
        const mapped = (data.services || []).map((s) => ({
          id: s.id,
          name: s.name,
          durationLabel: `${s.duration_min} min`,
          priceLabel: (s.price_cents / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
          icon: 'cut-outline', // depois você pode variar por serviço se quiser
        }));

        setServices(mapped);
      } catch (err) {
        console.log('Erro ao carregar serviços:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  const handleSelectService = (servico) => {
    navigation.navigate('Calendario', {
      servicoSelecionado: {
        id: servico.id,
        name: servico.name,
      },
    });
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
        <Text style={styles.serviceName}>{item.name}</Text>
        <Text style={styles.serviceDuration}>{item.durationLabel}</Text>
      </View>

      {/* Preço e Setinha */}
      <View style={styles.priceContainer}>
        <Text style={styles.servicePrice}>{item.priceLabel}</Text>
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

      {loading && (
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      )}

      {!loading && error && (
        <Text style={{ color: 'red', marginTop: 20 }}>
          {error}
        </Text>
      )}

      {!loading && !error && (
        <FlatList
          data={services}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderServiceCard}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
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
  },
});
