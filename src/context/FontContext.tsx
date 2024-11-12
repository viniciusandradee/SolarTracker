import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useFonts } from 'expo-font';
import { ActivityIndicator } from 'react-native';

const FontContext = createContext(false);

export const FontProvider = ({ children }: { children: ReactNode }) => {
  const [fontsLoaded] = useFonts({
    'OdorMeanCheyRegular': require('./../../assets/Fonts/OdorMeanChey-Regular.ttf'),
    'NotoSansRegular': require('./../../assets/Fonts/NotoSans-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <FontContext.Provider value={fontsLoaded}>
      {children}
    </FontContext.Provider>
  );
};

export const useFontContext = () => {
  return useContext(FontContext);
};
