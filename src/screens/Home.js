import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/theme'; 

export default function Home({ navigation }) {

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.title}>Início</Text>
          <Text style={styles.date}>Quarta, 26 de Novembro</Text>
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
           <Text style={styles.statLabel}>Horários disponíveis</Text>
           <Text style={styles.statNumberYellow}>9</Text>
        </View>
        <View style={{ width: 15 }} /> 
      </View>

    
      <Text style={styles.sectionTitle}>Serviços</Text>

      <TouchableOpacity style={styles.serviceItem}>
        <Image style={styles.imgs} source={require('../../assets/degrade.png')}/>
        <Text style={styles.imgTitle}>Corte Degrade</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.serviceItem}>
        <Image style={styles.imgs} source={require('../../assets/sobrancelha.png')}/>
        <Text style={styles.imgTitle}>Sobrancelha</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.serviceItem}>
        <Image style={styles.imgs} source={require('../../assets/barba.png')}/>
        <Text style={styles.imgTitle}>Barba Completa</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.serviceItem}>
        <Image style={styles.imgs} source={require('../../assets/corte barba.png')}/>
        <Text style={styles.imgTitle}>Apenas Corte</Text>
      </TouchableOpacity>

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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 15,
  },
  serviceItem: {
    flexDirection: 'row',      
    alignItems: 'center',     
    backgroundColor: theme.colors.surface, 
    marginBottom: 15,          
    borderRadius: 12,          
    padding: 10,            
  },

  imgs: {
    width: 70,                 
    height: 70,
    borderRadius: 35,          
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },

  imgTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginLeft: 15,          
  },
});