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

// ⚠️ AJUSTE SE MUDAR O AMBIENTE ⚠️
// - App Web / iOS Simulator no PC: http://localhost:3333
// - Emulador Android: http://10.0.2.2:3333
// - Celular físico (Expo): http://SEU-IP:3333
const API_URL = 'http://localhost:3333';

export default function Agendamento({ navigation }) {
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  // Buscar serviços reais da barbearia (id = 1 → Bradok)
  useEffect(() => {
    async function carregarServicos() {
      try {
        setErro('');
        setLoading(true);

        const response = await fetch(`${API_URL}/barbershops/1/services`);
        const data = await response.json();

        if (!response.ok) {
          setErro(data?.error || 'Erro ao carregar serviços');
          return;
        }

        // data.services vem do backend
        setServicos(data.services || []);
      } catch (err) {
        console.log(err);
        setErro('Erro de conexão com o servidor.');
      } finally {
        setLoading(false);
      }
    }

    carregarServicos();
  }, []);

  const handleSelectService = (servico) => {
    // Envia o objeto completo do serviço para a próxima tela
    navigation.navigate('Calendario', { servicoSelecionado: servico });
  };

  function formatarPreco(priceCents) {
    if (priceCents == null) return 'R$ 0,00';
    const reais = priceCents / 100;
    return reais.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  function escolherIcone(name) {
    const nome = (name || '').toLowerCase();

    if (nome.includes('barba')) return 'happy-outline';
    if (nome.includes('sobrancelha')) return 'eye-outline';
    if (nome.includes('acabamento')) return 'brush-outline';
    if (nome.includes('corte')) return 'cut-outline';

    return 'cut-outline'; // ícone padrão
  }

  const renderServiceCard = ({ item }) => {
    const icon = escolherIcone(item.name);
    const preco = formatarPreco(item.price_cents);
    const duracao = `${item.duration_min} min`;

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.7}
        onPress={() => handleSelectService(item)}
      >
        {/* Ícone do lado esquerdo */}
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={28} color={theme.colors.primary} />
        </View>

        {/* Infos do Serviço */}
        <View style={styles.infoContainer}>
          <Text style={styles.serviceName}>{item.name}</Text>
          <Text style={styles.serviceDuration}>{duracao}</Text>
        </View>

        {/* Preço e Setinha */}
        <View style={styles.priceContainer}>
          <Text style={styles.servicePrice}>{preco}</Text>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={theme.colors.textSecondary}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.background}
      />

      {/* --- HEADER --- */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Novo Agendamento</Text>
        <View style={{ width: 60 }} />
      </View>

      <Text style={styles.subTitle}>Qual serviço você deseja?</Text>

      {loading && (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator size="small" color={theme.colors.primary} />
        </View>
      )}

      {!!erro && !loading && (
        <Text style={{ color: '#ff6b6b', marginBottom: 10 }}>{erro}</Text>
      )}

      {!loading && servicos.length === 0 && !erro && (
        <Text style={{ color: theme.colors.textSecondary }}>
          Nenhum serviço disponível no momento.
        </Text>
      )}

      {!loading && servicos.length > 0 && (
        <FlatList
          data={servicos}
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
