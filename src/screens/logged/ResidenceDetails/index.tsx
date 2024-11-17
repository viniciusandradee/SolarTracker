import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

import styles from './style';

import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { LoggedDrawer } from '@/types';  // Importe o tipo que você já definiu
import { database } from 'firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

type ResidenceDetailsRouteProp = RouteProp<LoggedDrawer, 'ResidenceDetails'>;

const ResidenceDetails = () => {
    const route = useRoute<ResidenceDetailsRouteProp>();
    const { residenceId } = route.params;

    const [residenceData, setResidenceData] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchResidenceData = async () => {
            try {
                const docRef = doc(database, 'residences', residenceId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setResidenceData(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error('Error fetching residence data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchResidenceData();

    }, [residenceId]);

    if (loading) {
        return <View style={styles.loadingView}><Text>Loading...</Text></View>;
    }

    if (!residenceData) {
        return <Text>No data found for this residence.</Text>;
    }


    return (
        <View>
            {residenceData.hasSolarPanel ? (
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Text>Details for residence with solar panel</Text>
                    {/* Exemplo de como acessar dados específicos */}
                    <Text>Panel Type: {residenceData.panelType}</Text>
                    <Text>Solar System Capacity: {residenceData.solarCapacity} kW</Text>
                </ScrollView>
            ) : (
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.header}>
                        <View style={styles.infosContainer}>
                            <View style={styles.infosResidenceContainer}>
                                <Text style={styles.nameText}>{residenceData.name}</Text>
                            </View>

                            <View style={styles.infosResidenceContainer}>
                                <Text style={styles.tariffFlagText}>{residenceData.tariffFlag}</Text>
                            </View>

                            <View style={styles.infosResidenceContainer}>
                                <Text style={styles.stateText}>{residenceData.state}</Text>
                            </View>
                        </View>

                        <View style={styles.tarrifFlagPriceContainer}>
                            <Text style={styles.tarrifFlagPriceText}>+ R$0,01343 /kwH</Text>
                        </View>
                    </View>

                    <View style={styles.main}>
                        {/* Outros detalhes da residência */}
                    </View>

                    <View style={styles.footer}>
                        {/* Informações adicionais */}
                    </View>
                </ScrollView>
            )}
        </View>
    );
};

export default ResidenceDetails;
