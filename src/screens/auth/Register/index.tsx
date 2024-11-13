import React, { useContext, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text, Alert, ScrollView, TextInput } from 'react-native';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from "firebase/auth";

import { auth } from '../../../../firebaseConfig';
import * as Google from "expo-auth-session/providers/google";

import styles from "./style"
import colors from '@/styles/colors';

import { useNavigation } from '@react-navigation/native';
import { AuthNavigation } from '@/types';
import { AuthContext } from '@/context/AuthContext';
import { useGoogleAuth } from '@/utils/constant';

const Register = () => {
    const { registerWithEmail, signInWithGoogle } = useContext(AuthContext);
    const { request, response, promptAsync } = useGoogleAuth();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigation = useNavigation<AuthNavigation>();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const doRegister = async () => {
        if (!email || !password) {
            Alert.alert("Alerta", "Preencha todos os campos");
            return;
          }
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match.");
            return;
        }
        try {
            await registerWithEmail(email, password);
            Alert.alert("Success", "Account created successfully!");
        } catch (error) {
            console.error("Error creating account:", error);
            Alert.alert("Error", (error as Error).message);
        }
    };

    const signInWithGoogleHandler = async () => {
        try {
            if (request) {
                await promptAsync();
            }
        } catch (error) {
            Alert.alert("Erro", "Erro ao autenticar com o Google");
        }
    };
    const goToLogin = () => {
        navigation.navigate("Login");
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

                    <View style={styles.inputWrapperImage}>
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            placeholderTextColor={colors.tertiary}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={!showConfirmPassword}
                        />
                        <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                            <Image
                                source={showConfirmPassword ? require('@/../assets/Images/HidePassword.png') : require('@/../assets/Images/HidePassword.png')}
                                style={styles.inputIcon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.buttonRegisterContainer}>
                    <TouchableOpacity style={styles.buttonRegister}
                    onPress={doRegister}>
                        <Text style={styles.buttonRegisterText}>Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.googleButton} onPress={signInWithGoogleHandler}>
                        <Image source={require('@/../assets/Images/GoogleLogo.png')} style={styles.logoGoogle} />
                        <Text style={styles.googleText}>Register with Google</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.footer}>
                <Text style={styles.textGoToLogin}>Already have an account?</Text>
                <TouchableOpacity style={styles.buttonGoToLogin} onPress={goToLogin}>
                    <Text style={styles.buttonTextGoToLogin}>Go to Login</Text>
                </TouchableOpacity>
            </View>



        </ScrollView>
    );
};


export default Register;