import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { FontProvider } from '@/context/FontContext';  // Ajuste o caminho conforme necessário

//import { NavigationContainer } from '@react-navigation/native';
//import { AuthProvider } from '@/Context/AuthContext';
//import AppNavigator from '@/Navigation/AppNavigator';

import Login from '@/screens/Login';
import PasswordRecovery from '@/screens/PasswordRecovery';

export default function App() {
  return (
    <FontProvider>
      <PasswordRecovery />
    </FontProvider>
  );
}

