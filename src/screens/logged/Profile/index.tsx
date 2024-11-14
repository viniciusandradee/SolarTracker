import React, { useContext, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text, Alert, ScrollView, TextInput } from 'react-native';
import { signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithCredential } from "firebase/auth";

import { useNavigation } from '@react-navigation/native';
import { LoggedNavigation } from '@/types';

import styles from './style';
import { AuthContext } from '@/context/AuthContext';
import { useModal } from '@/hooks/useModal';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [photoUrl, setPhotoUrl] = useState<string>();
    const { Modal, showModal, hideModal } = useModal(false);
    
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View>
                <Text>Oi</Text>
            </View>
        </ScrollView>
    );
};


export default Profile;