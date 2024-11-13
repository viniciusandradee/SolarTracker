import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { LoggedStack } from "@/types";

import HomeScreen from "@/screens/logged/Home";
import ProfileScreen from "@/screens/logged/Profile";


const Stack = createStackNavigator<LoggedStack>();

const LoggedNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoggedNavigator;