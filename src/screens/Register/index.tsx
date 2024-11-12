import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text, Alert, ScrollView, TextInput } from 'react-native';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from "firebase/auth";

import { auth } from '../../../firebaseConfig';
import * as Google from "expo-auth-session/providers/google";

import styles from "./style"


const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: "473468402381-4u08vs09oq8cqvfq4tbaa70pf41lqgeg.apps.googleusercontent.com",
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const doRegister = async () => {
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match.");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert("Success", "Account created successfully!");
        } catch (error) {
            console.error("Error creating account:", error);
            Alert.alert("Error", (error as Error).message);
        }
    };

    const signInWithGoogle = async () => {
        try {
            const result = await promptAsync();
            if (result.type === "success" && result.authentication?.idToken) {
                const credential = GoogleAuthProvider.credential(result.authentication.idToken);
                await signInWithCredential(auth, credential);
                Alert.alert("Success", "Registered with Google successfully!");
            }
        } catch (error) {
            console.error("Error signing in with Google:", error);
            Alert.alert("Error", "Failed to register with Google.");
        }
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
                            placeholderTextColor={'#669BBC'}
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
                            placeholderTextColor={'#669BBC'}
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
                            placeholderTextColor={'#669BBC'}
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
                        style={styles.googleButton} onPress={signInWithGoogle}>
                        <Image source={require('@/../assets/Images/GoogleLogo.png')} style={styles.logoGoogle} />
                        <Text style={styles.googleText}>Register with Google</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.footer}>
                <Text style={styles.textGoToLogin}>Already have an account?</Text>
                <TouchableOpacity style={styles.buttonGoToLogin}>
                    <Text style={styles.buttonTextGoToLogin}>Go to Login</Text>
                </TouchableOpacity>
            </View>



        </ScrollView>
    );
};


export default Register;