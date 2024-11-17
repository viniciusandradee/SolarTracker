import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';

import styles from './style';

import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { LoggedDrawer } from '@/types';  // Importe o tipo que você já definiu
import { database } from 'firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import colors from '@/styles/colors';

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

                        <View style={styles.energyBillContainer}>
                            <Text style={styles.energyBillText}>Current energy bill</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Type here...'
                                placeholderTextColor={'#6A6767'}
                            />
                            <View style={styles.line}></View>

                            <Text style={styles.savingsText}>With solar energy, your savings would be (Y - (30 to 50)) per month.</Text>
                            <Text style={styles.savingsText2}>≅ 80% to 90% savings</Text>
                        </View>


                        <View style={styles.sustentableEnergyContainer}>
                            <View style={styles.helpContainer}>
                                <Text style={styles.co2Text}>You are helping to avoid the emission of 180 kg of CO₂ per year!</Text>
                            </View>
                            <View style={styles.helpContainer}>
                                <Text style={styles.economyText}>Globally: Avoiding 900 kgCO₂/year is equivalent to:</Text>
                                <Text style={styles.economyText}>• Do not <Text style={styles.spanDrive}>drive a car</Text> for 6 months.</Text>
                                <Text style={styles.economyText}>• Plant around 40 <Text style={styles.spanTree}>trees</Text>.</Text>

                                <Text style={styles.economyText}>In Brazil: Avoiding 180 kgCO₂/year is equivalent to:</Text>
                                <Text style={styles.economyText}>• Do not <Text style={styles.spanDrive}>drive</Text> for 1 month.</Text>
                                <Text style={styles.economyText}>• Plant about 8 <Text style={styles.spanTree}>trees</Text>.</Text>
                            </View>
                        </View>

                        <View style={styles.solarPanelEconomyContainer}>
                            <Text style={styles.solarPanelTitle}>Economy with solar panels</Text>
                            <Text style={styles.solarPanelText}>
                                Sistema típico de <Text style={styles.spanEnergy}>3 kWp</Text>:{"\n"}
                                • Custo médio: R$ 18.000.{"\n"}
                                • Energia gerada mensalmente: 360 a 450 kWh.{"\n"}
                                • Economia média mensal: Custo do kWh: R$ 0,70/kWh, seria ~R$ 250 a R$ 300/mês.{"\n"}
                                • Retorno do investimento: Cerca de 5 a 7 anos, dependendo do consumo e da tarifa local.
                            </Text>
                        </View>
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
