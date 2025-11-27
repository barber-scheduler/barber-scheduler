import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  StatusBar, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/theme';

const { width } = Dimensions.get('window');

const Banners = ({ navigation }) => {
  return (
    <ScrollView 
      horizontal 
      pagingEnabled 
      showsHorizontalScrollIndicator={false}
      style={styles.bannerContainer}
    >
      <View style={styles.bannerCard}>
        <View style={styles.bannerContentSide}>
          <Text style={styles.bannerTag}>PROMOÇÃO</Text>
          <Text style={styles.bannerTitle}>Combo Completo</Text>
          <Text style={styles.bannerSubtitle}>Cabelo + Barba + Sobrancelha</Text>
          <Text style={styles.bannerPrice}>
            De R$ 80 por <Text style={{color: theme.colors.primary}}>R$ 65</Text>
          </Text>
          <TouchableOpacity 
            style={styles.bannerButton}
            onPress={() => navigation.navigate('Agendamento')}
          >
            <Text style={styles.bannerButtonText}>Agendar Agora</Text>
          </TouchableOpacity>
        </View>

        <Image 
          source={require('../../assets/degrade.png')} 
          style={styles.bannerImageSide}
          resizeMode="cover" 
        />
      </View>

      <View style={[styles.bannerCard, { backgroundColor: '#222' }]}>
        <View style={styles.bannerContentSide}>
            <Ionicons name="star" size={24} color={theme.colors.primary} style={{marginBottom: 8}} />
            <Text style={styles.bannerTag}>NOVIDADE</Text>
            <Text style={styles.bannerTitle}>Dia do Noivo</Text>
            <Text style={styles.bannerSubtitle}>Prepare-se para o grande dia com estilo. Consulte pacotes.</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const LoyaltyCard = () => {
  const totalCortes = 10;
  const cortesAtuais = 7; 
  const progresso = (cortesAtuais / totalCortes) * 100;

  return (
    <View style={styles.loyaltyContainer}>
      <View style={styles.loyaltyHeader}>
        <View>
            <Text style={styles.loyaltyTitle}>Barber Club</Text>
            <Text style={styles.loyaltySubtitle}>Seu programa de recompensas</Text>
        </View>
        <View style={styles.pointsBadge}>
            <Text style={styles.loyaltyPoints}>{cortesAtuais}/{totalCortes}</Text>
        </View>
      </View>
      
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${progresso}%` }]} />
      </View>
      
      <View style={styles.loyaltyFooterRow}>
        <Text style={styles.loyaltyFooterText}>Faltam 3 cortes para ganhar um grátis!</Text>
        <Ionicons name="gift-outline" size={16} color={theme.colors.primary} />
      </View>
    </View>
  );
};

export default function Home({ navigation }) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.greeting}>Olá, Gustavo</Text>
          <Text style={styles.date}>Quarta, 26 de Novembro</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('Agendamento')} 
        >
           <Ionicons name="add" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      <Banners navigation={navigation} />

      <Text style={styles.sectionTitle}>Sua Fidelidade</Text>
      <LoyaltyCard />
    
      <Text style={styles.sectionTitle}>Nossos Serviços</Text>

      <TouchableOpacity style={styles.serviceItem}>
        <Image style={styles.imgs} source={require('../../assets/degrade.png')}/>
        <View style={styles.serviceTextContainer}>
            <Text style={styles.imgTitle}>Corte Degrade</Text>
            <Text style={styles.servicePrice}>R$ 35,00</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={theme.colors.textSecondary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.serviceItem}>
        <Image style={styles.imgs} source={require('../../assets/sobrancelha.png')}/>
        <View style={styles.serviceTextContainer}>
            <Text style={styles.imgTitle}>Sobrancelha</Text>
            <Text style={styles.servicePrice}>R$ 15,00</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={theme.colors.textSecondary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.serviceItem}>
        <Image style={styles.imgs} source={require('../../assets/barba.png')}/>
        <View style={styles.serviceTextContainer}>
            <Text style={styles.imgTitle}>Barba Completa</Text>
            <Text style={styles.servicePrice}>R$ 30,00</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={theme.colors.textSecondary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.serviceItem}>
        <Image style={styles.imgs} source={require('../../assets/corte barba.png')}/>
        <View style={styles.serviceTextContainer}>
            <Text style={styles.imgTitle}>Apenas Corte</Text>
            <Text style={styles.servicePrice}>R$ 30,00</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={theme.colors.textSecondary} />
      </TouchableOpacity>
      
      <View style={{ height: 30 }} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background, 
    padding: 20,
    paddingTop: 50,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  greeting: {
    fontSize: 28,
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
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, 
  },
  bannerContainer: {
    marginBottom: 25,
    height: 170, 
  },
  bannerCard: {
    width: width - 40, 
    marginRight: 15,
    height: 160,
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
  },
  bannerContentSide: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  bannerImageSide: {
    width: '40%', 
    height: '100%',
    backgroundColor: '#000',
  },
  bannerTag: {
    backgroundColor: theme.colors.primary,
    color: '#000',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    fontSize: 9,
    fontWeight: '900',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  bannerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bannerSubtitle: {
    color: '#CCC',
    fontSize: 12,
    marginBottom: 4,
  },
  bannerPrice: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 4,
  },
  bannerButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  bannerButtonText: {
    color: '#000',
    fontSize: 11,
    fontWeight: 'bold',
  },
  loyaltyContainer: {
    backgroundColor: theme.colors.surface, 
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#333',
  },
  loyaltyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  loyaltyTitle: {
    color: theme.colors.primary, 
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  loyaltySubtitle: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
  pointsBadge: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)', 
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  loyaltyPoints: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
  loyaltyFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loyaltyFooterText: {
    color: '#AAA',
    fontSize: 12,
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 15,
    marginLeft: 5, 
  },
  serviceItem: {
    flexDirection: 'row',      
    alignItems: 'center',      
    backgroundColor: theme.colors.surface, 
    marginBottom: 15,          
    borderRadius: 16,  
    padding: 12,        
    borderWidth: 1,
    borderColor: '#222', 
  },
  imgs: {
    width: 60,                 
    height: 60,
    borderRadius: 30,          
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  serviceTextContainer: {
    flex: 1, 
    marginLeft: 15,
  },
  imgTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  servicePrice: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '600',
    marginTop: 4,
  },
});