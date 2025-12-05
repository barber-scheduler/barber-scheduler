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

// Componente auxiliar para os botões do menu
const ProfileOption = ({ icon, title, subtitle, onPress, isLogout }) => (
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
      <Text style={[styles.optionTitle, isLogout && styles.logoutText]}>{title}</Text>
      {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
    </View>
    <Ionicons 
      name="chevron-forward" 
      size={20} 
      color={isLogout ? '#FF453A' : '#666'} 
    />
  </TouchableOpacity>
);

export default function Perfil({ navigation }) {

  // Função para dar feedback visual nos botões em desenvolvimento
  const handlePlaceholderClick = (titulo) => {
    Alert.alert("Em Desenvolvimento", `Você clicou em "${titulo}". Em breve esta tela estará disponível!`);
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
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }
        }
      ]
    );
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
        
        <Text style={styles.userName}>Gustavo Silva</Text>
        <Text style={styles.userEmail}>gustavo@email.com</Text>

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
        
        {/* Este botão navega de verdade */}
        <ProfileOption 
          icon="calendar-outline" 
          title="Meus Agendamentos" 
          subtitle="Histórico e futuros"
          onPress={() => navigation.navigate('Meus Agendamentos')}
        />
        
        {/* Estes mostram Alerta */}
        <ProfileOption 
          icon="person-outline" 
          title="Dados Pessoais" 
          subtitle="Nome, email, telefone"
          onPress={() => handlePlaceholderClick("Dados Pessoais")}
        />
        <ProfileOption 
          icon="card-outline" 
          title="Pagamentos" 
          subtitle="Cartões e histórico"
          onPress={() => handlePlaceholderClick("Pagamentos")}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App</Text>
        
        <ProfileOption 
          icon="notifications-outline" 
          title="Notificações" 
          onPress={() => handlePlaceholderClick("Notificações")}
        />
        <ProfileOption 
          icon="help-circle-outline" 
          title="Ajuda e Suporte" 
          onPress={() => handlePlaceholderClick("Ajuda e Suporte")}
        />
         <ProfileOption 
          icon="settings-outline" 
          title="Configurações" 
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