import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStack } from "@/types";
import LoginScreen from "@/screens/auth/Login";
import RegisterScreen from "@/screens/auth/Register";
import PasswordRecoveryScreen from "@/screens/auth/PasswordRecovery";

const Stack = createStackNavigator<AuthStack>();

const AuthNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="PasswordRecovery" component={PasswordRecoveryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;