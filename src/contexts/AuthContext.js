// src/contexts/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);  // usuário logado
  const [loadingUser, setLoadingUser] = useState(true); // carregando do storage

  useEffect(() => {
    async function loadUserFromStorage() {
      try {
        const stored = await AsyncStorage.getItem('@barberScheduler:user');
        if (stored) {
          setUser(JSON.parse(stored));
        }
      } catch (err) {
        console.log('Erro ao carregar usuário do storage', err);
      } finally {
        setLoadingUser(false);
      }
    }

    loadUserFromStorage();
  }, []);

  async function signIn(userData) {
    setUser(userData);
    await AsyncStorage.setItem('@barberScheduler:user', JSON.stringify(userData));
  }

  async function signOut() {
    setUser(null);
    await AsyncStorage.removeItem('@barberScheduler:user');
  }

  return (
    <AuthContext.Provider value={{ user, loadingUser, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
