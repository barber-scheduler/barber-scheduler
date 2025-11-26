import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Login from '../screens/Login';
import Cadastro from '../screens/Cadastro';
import Home from '../screens/Home';
import MeusAgendamentos from '../screens/MeusAgendamentos';
import Perfil from '../screens/Perfil';
import Agendamento from '../screens/Agendamento';
import Calendario from '../screens/Calendario';
import Sucesso from '../screens/Sucesso';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Início') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Meus Agendamentos') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Início" component={Home} />
      <Tab.Screen name="Meus Agendamentos" component={MeusAgendamentos} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Cadastro" screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Cadastro" 
          component={Cadastro} 
          options={{ title: 'Criar Conta' }}
        />
        <Stack.Screen 
          name="Main" 
          component={AppTabs} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Agendamento" 
          component={Agendamento} 
          options={{ title: 'Escolher Serviço' }}
        />
        <Stack.Screen 
          name="Calendario" 
          component={Calendario} 
          options={{ title: 'Selecionar Horário' }}
        />
        <Stack.Screen 
          name="Sucesso" 
          component={Sucesso} 
          options={{ 
            headerShown: false, 
            gestureEnabled: false 
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}