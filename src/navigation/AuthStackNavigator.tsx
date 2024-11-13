import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStack } from "@/types";
import LoginScreen from "@/screens/Login";
import RegisterScreen from "@/screens/Register";
import PasswordRecoveryScreen from "@/screens/PasswordRecovery";

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