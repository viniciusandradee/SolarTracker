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
    const [solarPanel, setSolarPanel] = useState<string | null>("");

    const navigation = useNavigation<LoggedNavigation>();

    const selectSolarPanel = [
        { label: "Yes", value: 'true' },
        { label: "No", value: 'false' },
    ];

    const selectState = [

        { label: "São Paulo", value: "São Paulo" },
        { label: "Rio de Janeiro", value: "Rio de Janeiro" },
        { label: "Acre", value: "Acre" },
        { label: "Alagoas", value: "Alagoas" },
        { label: "Amapá", value: "Amapá" },
        { label: "Amazonas", value: "Amazonas" },
        { label: "Bahia", value: "Bahia" },
        { label: "Ceará", value: "Ceará" },
        { label: "Distrito Federal", value: "Distrito Federal" },
        { label: "Espírito Santo", value: "Espírito Santo" },
        { label: "Goiás", value: "Goiás" },
        { label: "Maranhão", value: "Maranhão" },
        { label: "Mato Grosso", value: "Mato Grosso" },
        { label: "Mato Grosso do Sul", value: "Mato Grosso do Sul" },
        { label: "Minas Gerais", value: "Minas Gerais" },
        { label: "Pará", value: "Pará" },
        { label: "Paraíba", value: "Paraíba" },
        { label: "Paraná", value: "Paraná" },
        { label: "Pernambuco", value: "Pernambuco" },
        { label: "Piauí", value: "Piauí" },
        { label: "Roraima", value: "Roraima" },
        { label: "Rondônia", value: "Rondônia" },
        { label: "Rio Grande do Norte", value: "Rio Grande do Norte" },
        { label: "Rio Grande do Sul", value: "Rio Grande do Sul" },
        { label: "Santa Catarina", value: "Santa Catarina" },
        { label: "Sergipe", value: "Sergipe" },
        { label: "Tocantins", value: "Tocantins" },
    ];


    const handleAddResidence = async () => {
        if (!name || !state || solarPanel === null) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }
        try {
            const docId = await createResidence({
                name,
                state,
                hasSolarPanel: solarPanel === "true",
            });
            if (docId) {
                setName("");
                setState("");
                setSolarPanel(null);
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
                            placeholder='Type here...'
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
                                <Picker.Item label="Select" value={null} />
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