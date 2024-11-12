import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text, Alert, ScrollView, TextInput } from 'react-native';
import { signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from '../../../firebaseConfig';
import * as Google from "expo-auth-session/providers/google";

import styles from "./style"


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: "473468402381-4u08vs09oq8cqvfq4tbaa70pf41lqgeg.apps.googleusercontent.com",
    });


    const doAuth = async () => {
        if (!email || !password) {
            Alert.alert("Alerta", "Preencha todos os campos");
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, email, password);
            Alert.alert("Sucesso", "Login realizado com sucesso");
        } catch (error: any) {
            const errorMessage = error.message || "Algo de errado não está certo";
            Alert.alert("Erro", errorMessage);
        }
    };

    const handlePasswordReset = async () => {
        if (!email) {
            Alert.alert("Alerta", "Digite o e-mail para redefinir a senha");
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert("Sucesso", "E-mail de redefinição de senha enviado");
        } catch (error: any) {
            Alert.alert("Erro", error.message || "Erro ao enviar e-mail de redefinição de senha");
        }
    };

    const signInWithGoogle = async () => {
        try {
            const result = await promptAsync();
            if (result.type === "success" && result.authentication?.idToken) {
                const credential = GoogleAuthProvider.credential(result.authentication.idToken);
                await signInWithCredential(auth, credential);
                Alert.alert("Sucesso", "Login com Google realizado com sucesso");
            }
        } catch (error) {
            Alert.alert("Erro", "Erro ao autenticar com o Google");
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
                    <TouchableOpacity style={styles.passwordContainer} onPress={handlePasswordReset}>
                        <Text style={styles.passwordText}>Forgot your password?</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonLoginContainer}>
                    <TouchableOpacity style={styles.buttonLogin} onPress={doAuth}>
                        <Text style={styles.buttonLoginText}>Login</Text>
                    </TouchableOpacity>
                
                <TouchableOpacity
                    style={styles.googleButton}

                    onPress={signInWithGoogle}>
                    <Image source={require('@/../assets/Images/GoogleLogo.png')} style={styles.logoGoogle} />
                    <Text style={styles.googleText}>Register with Google</Text>
                </TouchableOpacity>
                </View>
            </View>

            <View style={styles.footer}>
                <Text style={styles.textCreateAccount}>Don't have an account?</Text>
                <TouchableOpacity style={styles.buttonCreateAccount}>
                    <Text style={styles.buttonTextCreateAccount}>Create Account</Text>
                </TouchableOpacity>
            </View>



        </ScrollView>
    );
};


export default Login;