import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Login from './src/screens/Login';
import Cadastro from './src/screens/Cadastro';
import Home from './src/screens/Home';
import MeusAgendamentos from './src/screens/MeusAgendamentos';
import Perfil from './src/screens/Perfil';
import Agendamento from './src/screens/Agendamento';
import Calendario from './src/screens/Calendario';
import Sucesso from './src/screens/Sucesso';

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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
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