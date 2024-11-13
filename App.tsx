import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FontProvider } from '@/context/FontContext';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from '@/navigation/AuthStackNavigator';
import LoggedNavigator from '@/navigation/LoggedStackNavigator';
import { AuthContext, AuthProvider } from '@/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <FontProvider>
          <MainNavigator />
      </FontProvider>
    </AuthProvider>
  );
}

const MainNavigator = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <LoggedNavigator /> : <AuthNavigator />;
};
