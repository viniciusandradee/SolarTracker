import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import Home from '@/screens/logged/Home';
import Profile from '@/screens/logged/Profile';
import ResidenceAddition from '@/screens/logged/ResidenceAddition';

import styles from '@/styles/drawerStyle';

import { AuthContext } from '@/context/AuthContext';

const Drawer = createDrawerNavigator();

const LoggedDrawerNavigator = () => {
  const { signOut } = useContext(AuthContext);
  
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: styles.header,
        headerTitle: () => (
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/Images/SolarTrackerTitleLogo.png')}
            />
          </View>
        ),
        drawerStyle: styles.backgroundMenu,
        drawerLabelStyle: styles.drawerLabel,
        headerTintColor: styles.menu.color,
      }}
      drawerContent={(props) => (
        <View style={styles.menuContainer}>
          <View style={styles.menuNavigation}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Home')}
              style={styles.itemStyle}
            >
              <Image
                source={require('../../assets/Images/HomeIcon.png')}
                style={styles.HomeIcon}
              />
              <Text style={styles.drawerLabel}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Profile')}
              style={styles.itemStyle}
            >
              <Image
                source={require('../../assets/Images/ProfileIcon.png')}
                style={styles.ProfileIcon}
              />
              <Text style={styles.drawerLabel}>My Profile</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={signOut}
          >
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      )}
    >
      <Drawer.Screen name="Home" component={Home} options={{
        drawerItemStyle: styles.itemStyle
      }} />
      <Drawer.Screen name="Profile" component={Profile} options={{
        drawerItemStyle: styles.itemStyle
      }} />

      <Drawer.Screen name="ResidenceAddition" component={ResidenceAddition} options={{
        drawerItemStyle: styles.itemStyle
      }} />
    </Drawer.Navigator>
  );
};

export default LoggedDrawerNavigator;
