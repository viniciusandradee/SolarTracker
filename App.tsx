import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { FontProvider } from '@/context/FontContext';  // Ajuste o caminho conforme necessário
import { NavigationContainer } from '@react-navigation/native';  // Certifique-se de importar o NavigationContainer
import AuthStackNavigator from '@/navigation/AuthStackNavigator';  // Importe o seu AuthNavigator

export default function App() {
  return (
    <FontProvider>
        <AuthStackNavigator />
      <StatusBar style="auto" />
    </FontProvider>
  );
}