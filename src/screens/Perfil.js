import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  StatusBar,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/theme'; 
import { useAuth } from '../contexts/AuthContext';

// Componente auxiliar para os botões do menu (mais seguro)
const ProfileOption = ({ icon, title, subtitle, onPress, isLogout }) => {
  const safeTitle = String(title ?? '');

  const safeSubtitle =
    typeof subtitle === 'string' && subtitle.trim().length > 0
      ? subtitle
      : null;

  return (
    <TouchableOpacity 
      style={[styles.optionCard, isLogout && styles.logoutCard]} 
      onPress={onPress}
    >
      <View style={styles.optionIconContainer}>
        <Ionicons 
          name={icon} 
          size={22} 
          color={isLogout ? '#FF453A' : theme.colors.primary} 
        />
      </View>

      <View style={styles.optionTextContainer}>
        <Text style={[styles.optionTitle, isLogout && styles.logoutText]}>
          {safeTitle}
        </Text>

        {!!safeSubtitle && (
          <Text style={styles.optionSubtitle}>{safeSubtitle}</Text>
        )}
      </View>

      <Ionicons 
        name="chevron-forward" 
        size={20} 
        color={isLogout ? '#FF453A' : '#666'} 
      />
    </TouchableOpacity>
  );
};

export default function Perfil({ navigation }) {
  const { user, signOut } = useAuth();

  // Função para dar feedback visual nos botões em desenvolvimento
  const handlePlaceholderClick = (titulo) => {
    Alert.alert(
      "Em Desenvolvimento", 
      `Você clicou em "${titulo}". Em breve esta tela estará disponível!`
    );
  };

  const handleLogout = () => {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja sair da sua conta?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sair", 
          style: "destructive",
          onPress: async () => {
            try {
              await signOut(); // limpa usuário (contexto + AsyncStorage)

              // tenta resetar para Login (fluxo ideal)
              try {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                });
              } catch (e) {
                // fallback caso Login não esteja no navigator atual
                navigation.replace('Login');
              }
            } catch (err) {
              console.log("Erro ao deslogar:", err);
              Alert.alert("Erro", "Não foi possível sair da conta.");
            }
          }
        }
      ]
    );
  };

  const handleOpenDadosPessoais = () => {
    navigation.navigate('DadosPessoais');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      {/* --- 1. CABEÇALHO DO PERFIL --- */}
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          {/* Foto de perfil (Placeholder) */}
          <Image 
            source={require('../../assets/degrade.png')} 
            style={styles.profileImage}
          />
          <View style={styles.editIconBadge}>
            <Ionicons name="pencil" size={12} color="#000" />
          </View>
        </View>
        
        <Text style={styles.userName}>
          {user?.full_name || 'Usuário'}
        </Text>
        <Text style={styles.userEmail}>
          {user?.email || 'email@exemplo.com'}
        </Text>

        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => handlePlaceholderClick("Editar Perfil")}
        >
          <Text style={styles.editButtonText}>Editar Perfil</Text>
        </TouchableOpacity>
      </View>

      {/* --- 2. ESTATÍSTICAS --- */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Cortes</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>70</Text>
          <Text style={styles.statLabel}>Pontos</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>4.9</Text>
          <Text style={styles.statLabel}>Nota</Text>
        </View>
      </View>

      {/* --- 3. MENU DE OPÇÕES --- */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Minha Conta</Text>
        
        <ProfileOption 
          icon="calendar-outline" 
          title="Meus Agendamentos" 
          onPress={() => navigation.navigate('Meus Agendamentos')}
        />
        
        <ProfileOption 
          icon="person-outline" 
          title="Dados Pessoais" 
          onPress={handleOpenDadosPessoais}
        />
        <ProfileOption 
          icon="card-outline" 
          title="Pagamentos" 
          onPress={() => handlePlaceholderClick("Pagamentos")}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Aplicativo</Text>
        
        <ProfileOption 
          icon="notifications-outline" 
          title={"Notificação"}
          onPress={() => handlePlaceholderClick("Notificações")}
        />
        <ProfileOption 
          icon="help-circle-outline" 
          title="Central de Ajuda" 
          onPress={() => handlePlaceholderClick("Central de Ajuda")}
        />
        <ProfileOption 
          icon="settings-outline" 
          title={"Configuração"}
          onPress={() => handlePlaceholderClick("Configurações")}
        />
      </View>

      {/* --- 4. SAIR --- */}
      <View style={[styles.section, { marginBottom: 40 }]}>
        <ProfileOption 
          icon="log-out-outline" 
          title="Sair da Conta" 
          isLogout
          onPress={handleLogout}
        />
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  
  // Header Styles
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
    backgroundColor: theme.colors.surface,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderBottomWidth: 1,
    borderColor: '#333',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: theme.colors.primary,
  },
  editIconBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.primary,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.surface,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#AAA',
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#444',
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },

  // Stats Styles
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 25,
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  divider: {
    width: 1,
    height: '80%',
    backgroundColor: '#444',
  },

  // Menu Styles
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 15,
    marginLeft: 5,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#252525',
  },
  optionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  optionSubtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  
  // Logout Styles
  logoutCard: {
    borderColor: 'rgba(255, 69, 58, 0.3)',
    backgroundColor: 'rgba(255, 69, 58, 0.05)',
  },
  logoutText: {
    color: '#FF453A',
  },
});
