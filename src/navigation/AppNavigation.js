import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Login from "../screens/Login";
import Cadastro from "../screens/Cadastro";
import Home from "../screens/Home";
import HomeBarber from "../screens/Homebarber";
import MeusAgendamentos from "../screens/MeusAgendamentos";
import Perfil from "../screens/Perfil";
import Agendamento from "../screens/Agendamento";
import Calendario from "../screens/Calendario";
import Sucesso from "../screens/Sucesso";
import DadosPessoais from "../screens/DadosPessoais";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ClientTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#D4AF37", // Dourado
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#1E1E1E",
          borderTopColor: "#333",
          paddingBottom: 5,
          height: 60,
        },
      })}
    >
      <Tab.Screen 
        name="Início" component={Home} options={{tabBarLabel: "Início", title: "Início",}}/>
      <Tab.Screen name="Meus Agendamentos" component={MeusAgendamentos} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}

function BarberTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#D4AF37",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Dashboard")
            iconName = focused ? "stats-chart" : "stats-chart-outline";
          else if (route.name === "Perfil")
            iconName = focused ? "person" : "person-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={HomeBarber} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}

// --- 3. NAVEGAÇÃO PRINCIPAL ---
export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Telas de Autenticação */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{ title: "Criar Conta" }}
        />

        <Stack.Screen
          name="MainClient"
          component={ClientTabs}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MainBarber"
          component={BarberTabs}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Agendamento"
          component={Agendamento}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Calendario"
          component={Calendario}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Sucesso"
          component={Sucesso}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name="DadosPessoais"
          component={DadosPessoais}
          options={{ headerShown: false }}
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
