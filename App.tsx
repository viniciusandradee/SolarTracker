import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FontProvider } from '@/context/FontContext';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from '@/navigation/AuthStackNavigator';
import LoggedDrawerNavigator from '@/navigation/LoggedDrawerNavigator';
import { AuthContext, AuthProvider } from '@/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <FontProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </FontProvider>
    </AuthProvider>
  );
}

const MainNavigator = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <LoggedDrawerNavigator /> : <AuthNavigator />;
};
