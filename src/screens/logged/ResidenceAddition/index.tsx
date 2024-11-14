import React, { useContext, useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text, Alert, ScrollView, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { useNavigation } from '@react-navigation/native';
import { LoggedNavigation } from '@/types';

import styles from './style';
import colors from '@/styles/colors';

import { createResidence } from '@/utils/residenceService';

const ResidenceAddition = () => {

    const [name, setName] = useState("");
    const [state, setState] = useState("");
    const [solarPanel, setSolarPanel] = useState<boolean | undefined>(undefined);

    const navigation = useNavigation<LoggedNavigation>();
    
    const selectSolarPanel = [
        { label: "Yes", value: true },
        { label: "No", value: false },
    ];

    const selectState = [

        { label: "São Paulo", value: "SP" },
        { label: "Rio de Janeiro", value: "RJ" },
        { label: "Acre", value: "AC" },
        { label: "Alagoas", value: "AL" },
        { label: "Amapá", value: "AP" },
        { label: "Amazonas", value: "AM" },
        { label: "Bahia", value: "BA" },
        { label: "Ceará", value: "CE" },
        { label: "Distrito Federal", value: "DF" },
        { label: "Espírito Santo", value: "ES" },
        { label: "Goiás", value: "GO" },
        { label: "Maranhão", value: "MA" },
        { label: "Mato Grosso", value: "MT" },
        { label: "Mato Grosso do Sul", value: "MS" },
        { label: "Minas Gerais", value: "MG" },
        { label: "Pará", value: "PA" },
        { label: "Paraíba", value: "PB" },
        { label: "Paraná", value: "PR" },
        { label: "Pernambuco", value: "PB" },
        { label: "Piauí", value: "PI" },
        { label: "Roraima", value: "RR" },
        { label: "Rondônia", value: "RO" },
        { label: "Rio Grande do Norte", value: "RN" },
        { label: "Rio Grande do Sul", value: "RS" },
        { label: "Santa Catarina", value: "SC" },
        { label: "Sergipe", value: "SE" },
        { label: "Tocantins", value: "TO" },
    ];


    const handleAddResidence = async () => {
        if (!name || !state || !solarPanel) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }
        try {
            const docId = await createResidence({
                name,
                state,
                hasSolarPanel:  solarPanel === true,
            });
            if (docId) {
                setName("");
                setState("");
                setSolarPanel(undefined);
                navigation.navigate('Home');
            }
        } catch (error) {
            console.error("Error creating residence:", error);
            Alert.alert("Error", "There was an error adding your residence.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>

            <View style={styles.main}>

                <View style={styles.registerResidenceContainer}>
                    <Text style={styles.newResidenceText}>New Residence</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputText}>Name:</Text>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={colors.tertiary}
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputText}>State:</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={state}
                                onValueChange={(itemValue) => setState(itemValue)}
                                style={styles.picker}
                            >
                                <Picker.Item label="Select" value="" />
                                {selectState.map((item) => (
                                    <Picker.Item key={item.value} label={item.label} value={item.value} />
                                ))}
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputText}>Have a solar panel:</Text>
                        <View style={styles.pickerContainer1}>
                            <Picker
                                selectedValue={solarPanel}
                                onValueChange={(itemValue) => setSolarPanel(itemValue)}
                                style={styles.picker}
                            >
                                <Picker.Item label="Select" value="" />
                                {selectSolarPanel.map((item) => (
                                    <Picker.Item key={String(item.value)} label={item.label} value={item.value} />
                                ))}
                            </Picker>
                        </View>
                    </View>

                </View>
                <TouchableOpacity style={styles.registerResidence} onPress={handleAddResidence}>
                    <Text style={styles.addText}>Add</Text>
                </TouchableOpacity>
            </View>
        </ScrollView >
    );
};


export default ResidenceAddition;