import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';

import styles from './style';
import { database, realtimeDatabase } from 'firebaseConfig';
import { ref, set } from 'firebase/database';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { LoggedDrawer, LoggedNavigation } from '@/types';
import { doc, updateDoc } from 'firebase/firestore';

type SolarPanelAdditionRouteProp = RouteProp<LoggedDrawer, 'SolarPanelAddition'>;

const SolarPanelAddition = () => {
    const navigation = useNavigation<LoggedNavigation>();
    const route = useRoute<SolarPanelAdditionRouteProp>();
    const { residenceId } = route.params;

    const [apiKey, setApiKey] = useState<string>('');

    const handleAddApiKey = async () => {
        if (!apiKey) {
            alert('Please enter the API Key.');
            return;
        }

        try {
            const panelRef = ref(realtimeDatabase, `solarPanels/${residenceId}`);
            await set(panelRef, {
                apiKey: apiKey,
                connectedAt: new Date().toISOString(),
            });
            const residenceDocRef = doc(database, 'residences', residenceId);
            await updateDoc(residenceDocRef, {
                solarPanel: {
                    apiKey: apiKey,
                    connectedAt: new Date().toISOString(),
                },
            });

            alert('Solar panel connected successfully!');
            navigation.navigate('ResidenceDetails', { residenceId });
        } catch (error) {
            console.error('Error connecting the solar panel:', error);
            alert('Error connecting the solar panel. Please try again.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.inputLabel}>Solar Panel API Key</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter the solar panel API Key"
                value={apiKey}
                onChangeText={setApiKey}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddApiKey}>
                <Text style={styles.addButtonText}>Connect Panel</Text>
            </TouchableOpacity>
        </ScrollView>

    );
};

export default SolarPanelAddition;
