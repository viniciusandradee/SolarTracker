import React, { useContext, useEffect, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Alert, ScrollView, TextInput, Button } from 'react-native';

import styles from './style';
import { AuthContext } from '@/context/AuthContext';
import { database, storage } from 'firebaseConfig';
import { doc, updateDoc, deleteField, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import colors from '@/styles/colors';


const Profile = () => {
    const { user } = useContext(AuthContext);
    const [name, setName] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
   
    const handleUpdateName = async () => {
        if (!user?.uid) return;
        if (!inputValue.trim()) {
            Alert.alert('Error', 'The name field cannot be empty.');
            return;
        }

        try {
            setIsLoading(true);
            const userDocRef = doc(database, 'users', user.uid);
            await updateDoc(userDocRef, { name: inputValue });
            setName(inputValue);
            setInputValue('');
            Alert.alert('Success', 'Name updated successfully!');
        } catch (error) {
            Alert.alert('Error', 'Unable to update the name.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteName = async () => {
        if (!user?.uid) return;

        try {
            setIsLoading(true);
            const userDocRef = doc(database, 'users', user.uid);
            await updateDoc(userDocRef, { name: deleteField() });
            Alert.alert('Success', 'Name deleted successfully!');
            setName('');
        } catch (error) {
            Alert.alert('Error', 'Unable to delete the name.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchUserName = async () => {
            if (!user?.uid) return;

            try {
                const userDocRef = doc(database, 'users', user.uid);
                const userSnapshot = await getDoc(userDocRef);

                if (userSnapshot.exists()) {
                    const data = userSnapshot.data();
                    setName(data?.name || 'No Name');
                } else {
                    setName('No Name');
                }
            } catch (error) {
                console.error('Error fetching name:', error);
                setName('Error loading');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserName();
    }, [user]);



    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.main}>

                <Text style={styles.textEmail}>Your email: {user?.email}</Text>
                <Text style={styles.textName}>Your name: {name}</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Type your name"
                    placeholderTextColor={colors.quinary}
                    value={inputValue}
                    onChangeText={setInputValue}
                />

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.addButton} onPress={handleUpdateName}>
                        <Text style={styles.addText}>Update</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteName}>
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default Profile;