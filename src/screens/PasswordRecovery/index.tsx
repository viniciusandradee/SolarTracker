import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text, Alert, ScrollView, TextInput } from 'react-native';

import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../../firebaseConfig';

import styles from "./style";
import colors from '@/styles/colors';

import { useNavigation } from '@react-navigation/native';
import { AuthNavigation } from '@/types';


const PasswordRecovery = () => {
    const [email, setEmail] = useState("");

    const navigation = useNavigation<AuthNavigation>();

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
                </View>

                <View style={styles.buttonConfirmContainer}>
                    <TouchableOpacity style={styles.buttonConfirm} onPress={handlePasswordReset} >
                        <Text style={styles.buttonConfirmText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.buttonGoBackLogin}
                onPress={goToLogin}
                >
                    <Text style={styles.buttonTextGoBackLogin}>Go back to Login</Text>
                </TouchableOpacity>
            </View>



        </ScrollView>
    );
};


export default PasswordRecovery;