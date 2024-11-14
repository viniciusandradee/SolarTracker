import React, { useContext, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text, Alert, ScrollView, TextInput } from 'react-native';
import { signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from '../../../../firebaseConfig';

import styles from "./style"
import colors from '@/styles/colors';

import { useNavigation } from '@react-navigation/native';
import { AuthNavigation } from '@/types';
import { AuthContext } from '@/context/AuthContext';

const Login = () => {
    const { authentication, handleGoogleLogin } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigation = useNavigation<AuthNavigation>();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
  const doAuth = async () => {
    if (!email || !password) {
      Alert.alert("Alert", "Fill in all the fields");
      return;
    }
    try {
      await authentication(email, password);
    } catch (error: any) {
      const errorMessage = error.message || "Something went wrong. Please try again.";
      Alert.alert("Erro", errorMessage);
    }
  };


    const goToPasswordRecovery = () => {
        navigation.navigate("PasswordRecovery");
    };

    const goToRegister = () => {
        navigation.navigate("Register");
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>

            <View style={styles.header}>
                <Image source={require('@/../assets/Images/SolarTrackerLogo.png')} style={styles.logoSolarTracker} />
                <Text style={[styles.title]}>SolarTracker</Text>
            </View>

            <View style={styles.main}>
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor={colors.tertiary}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputWrapperImage}>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor={colors.tertiary}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity onPress={togglePasswordVisibility}>
                            <Image
                                source={showPassword ? require('@/../assets/Images/HidePassword.png') : require('@/../assets/Images/HidePassword.png')}
                                style={styles.inputIcon}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.passwordContainer} onPress={goToPasswordRecovery}>
                        <Text style={styles.passwordText}>Forgot your password?</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonLoginContainer}>
                    <TouchableOpacity style={styles.buttonLogin} onPress={doAuth}>
                        <Text style={styles.buttonLoginText}>Login</Text>
                    </TouchableOpacity>
                
                <TouchableOpacity
                    style={styles.googleButton}
                    onPress={handleGoogleLogin}
                    >
                    <Image source={require('@/../assets/Images/GoogleLogo.png')} style={styles.logoGoogle} />
                    <Text style={styles.googleText}>Login with Google</Text>
                </TouchableOpacity>
                </View>
            </View>

            <View style={styles.footer}>
                <Text style={styles.textCreateAccount}>Don't have an account?</Text>
                <TouchableOpacity style={styles.buttonCreateAccount} onPress={goToRegister}>
                    <Text style={styles.buttonTextCreateAccount}>Create Account</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
};


export default Login;