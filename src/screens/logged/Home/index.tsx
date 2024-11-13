import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text, Alert, ScrollView, TextInput } from 'react-native';
import { signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithCredential } from "firebase/auth";

import { useNavigation } from '@react-navigation/native';
import { LoggedNavigation } from '@/types';

import styles from './style';

const Home = () => {

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.header}>
                <Image source={require('../../../../assets/Images/SolarTrackerTitleLogo.png')} style={styles.titleLogo} />
            </View>

            <View style={styles.main}>
                <Text style={styles.textEnergy}>Add your home and monitor your energy</Text>
                <TouchableOpacity style={styles.residenceButton}>
                    <Image source={require('../../../../assets/Images/plusIcon.png')} style={styles.plusIcon} />
                    <Text style={styles.residenceText}>Add residence</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.registeredResidences}>
                    <Image source={require('../../../../assets/Images/energyIcon.png')} style={styles.energyIcon} />
                    <Text style={styles.registeredResidencesText}>My Home</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};


export default Home;