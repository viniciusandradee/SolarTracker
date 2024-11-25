import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { ref, get, set } from 'firebase/database';

import styles from './style';

import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { LoggedDrawer, LoggedNavigation } from '@/types';
import { database, realtimeDatabase } from 'firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import colors from '@/styles/colors';
import { calculateEnergyBill } from '@/utils/energyCalculations';



type ResidenceDetailsRouteProp = RouteProp<LoggedDrawer, 'ResidenceDetails'>;

const ResidenceDetails = () => {
    const route = useRoute<ResidenceDetailsRouteProp>();
    const navigation = useNavigation<LoggedNavigation>();
    const { residenceId } = route.params;

    const [residenceData, setResidenceData] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [kwh, setKwh] = useState<string>('');
    const [calculatedBill, setCalculatedBill] = useState<string | null>(null);

    const [emissionGlobal, setEmissionGlobal] = useState<number>(0);
    const [emissionBrazil, setEmissionBrazil] = useState<number>(0);

    const [isPanelConnected, setIsPanelConnected] = useState<boolean>(false);
    const [panelDetails, setPanelDetails] = useState<any | null>(null);
    const [sensorData, setSensorData] = useState<any | null>(null);
    const [consumptionData, setConsumptionData] = useState<any | null>(null);


    const getTariffDetails = (tariffFlag: string) => {
        let priceFlag = 0;
        let color = '';

        switch (tariffFlag) {
            case 'Green':
                priceFlag = 0;
                color = 'green';
                break;
            case 'Yellow':
                priceFlag = 0.01885;
                color = 'yellow';
                break;
            case 'Red 1':
                priceFlag = 0.03971;
                color = 'red';
                break;
            case 'Red 2':
                priceFlag = 0.09246;
                color = 'red';
                break;
            default:
                priceFlag = 0.20;
                color = 'grey';
                break;
        }

        return { priceFlag, color };
    };
    let priceFlag = 0;
    let priceColor = '';
    if (residenceData) {
        const tariffDetails = getTariffDetails(residenceData.tariffFlag.flag);
        priceFlag = tariffDetails.priceFlag;
        priceColor = tariffDetails.color;
    }


    type StateRates = {
        [key: string]: {
            tusdRate: number;
            teRate: number;
            cosip: number;
        };
    };

    const stateRates: StateRates = {
        "São Paulo": { tusdRate: 0.48245, teRate: 0.34009, cosip: 11.07 },
        "Rio de Janeiro": { tusdRate: 0.45000, teRate: 0.33000, cosip: 10.50 },
        "Minas Gerais": { tusdRate: 0.47000, teRate: 0.32000, cosip: 11.00 },
        "Bahia": { tusdRate: 0.55000, teRate: 0.37000, cosip: 12.00 },
        "Distrito Federal": { tusdRate: 0.47000, teRate: 0.33000, cosip: 11.50 },
        "Pernambuco": { tusdRate: 0.49500, teRate: 0.34500, cosip: 10.80 },
        "Paraná": { tusdRate: 0.44500, teRate: 0.30000, cosip: 9.90 },
        "Santa Catarina": { tusdRate: 0.43000, teRate: 0.31000, cosip: 10.20 },
        "Goiás": { tusdRate: 0.46000, teRate: 0.32000, cosip: 11.10 },
        "Amazonas": { tusdRate: 0.55000, teRate: 0.40000, cosip: 12.50 },
        "Ceará": { tusdRate: 0.46500, teRate: 0.34000, cosip: 11.30 },
        "Espírito Santo": { tusdRate: 0.44000, teRate: 0.31000, cosip: 10.60 },
        "Maranhão": { tusdRate: 0.50000, teRate: 0.33000, cosip: 11.00 },
        "Pará": { tusdRate: 0.54000, teRate: 0.38000, cosip: 12.00 },
        "Rio Grande do Sul": { tusdRate: 0.47000, teRate: 0.32000, cosip: 11.20 },
        "Alagoas": { tusdRate: 0.48000, teRate: 0.33000, cosip: 10.70 },
        "Piauí": { tusdRate: 0.46000, teRate: 0.31000, cosip: 10.90 },
        "Sergipe": { tusdRate: 0.46000, teRate: 0.32000, cosip: 10.50 },
        "Rondônia": { tusdRate: 0.55000, teRate: 0.37000, cosip: 11.80 },
        "Acre": { tusdRate: 0.56000, teRate: 0.38000, cosip: 12.00 },
        "Tocantins": { tusdRate: 0.48000, teRate: 0.33000, cosip: 10.60 },
        "Mato Grosso": { tusdRate: 0.49000, teRate: 0.34000, cosip: 11.00 },
        "Mato Grosso do Sul": { tusdRate: 0.47000, teRate: 0.32000, cosip: 10.80 },
        "Roraima": { tusdRate: 0.56000, teRate: 0.38000, cosip: 12.30 },
    };


    const handleCalculate = () => {
        if (!residenceData) return;

        const rates = stateRates[residenceData.state] || { tusdRate: 0.50000, teRate: 0.35000, cosip: 12.00 }; // Valores padrão

        const energyParams = {
            tusdRate: rates.tusdRate,
            teRate: rates.teRate,
            kwhConsumed: Number(kwh),
            additionalFlag: 0.0672,
            cosip: rates.cosip,
            state: residenceData.state
        };

        const result = calculateEnergyBill(energyParams);
        setCalculatedBill(result);

        // Cálculo de emissões
        const yearlyConsumption = Number(kwh) * 12; // kWh anual
        const globalEmission = yearlyConsumption * 0.5; // kgCO2/ano global
        const brazilEmission = yearlyConsumption * 0.1; // kgCO2/ano Brasil

        setEmissionGlobal(globalEmission);
        setEmissionBrazil(brazilEmission);
    };

    const fetchSensorData = async () => {
        try {
            const sensorRef = ref(realtimeDatabase, `sensor`);
            const consumptionRef = ref(realtimeDatabase, `energia`);
    
            const sensorSnapshot = await get(sensorRef);
            const consumptionSnapshot = await get(consumptionRef);
    
            if (sensorSnapshot.exists()) {
                setSensorData(sensorSnapshot.val());
            } else {
                console.log('No sensor data found.');
            }
    
            if (consumptionSnapshot.exists()) {
                setConsumptionData(consumptionSnapshot.val());
            } else {
                console.log('No energy data found.');
            }
        } catch (error) {
            console.error('Error fetching sensor data:', error);
        }
    };
    


    const fetchSolarPanelStatus = async () => {
        try {
            const panelRef = ref(realtimeDatabase, `solarPanels/${residenceId}`);
            const snapshot = await get(panelRef);
            if (snapshot.exists()) {
                setIsPanelConnected(true);
                setPanelDetails(snapshot.val());
            } else {
                setIsPanelConnected(false);
            }
        } catch (error) {
            console.error('Error fetching solar panel status:', error);
        }
    };
    


    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            setKwh('');
            setCalculatedBill(null);
            setEmissionGlobal(0);
            setEmissionBrazil(0);
            const fetchData = async () => {
                await fetchResidenceData();
                await fetchSolarPanelStatus();
                await fetchSensorData();
                setLoading(false);
            };

            fetchData();
        }, [residenceId])
    );

    const fetchResidenceData = async () => {
        try {
            const docRef = doc(database, 'residences', residenceId);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                setResidenceData(docSnap.data());
            } else {
                console.log('No document found!');
            }
        } catch (error) {
            console.error('Error fetching residence data:', error);
        }
    };
    

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
                    {isPanelConnected ? (
                        <View>
                            <View style={styles.panelDetailsContainer}>
                                <Text style={styles.panelText}>Solar Panel Details</Text>
                            </View>

                            {/* Consumption Data */}
                            {consumptionData && Object.values(consumptionData.consumo).length > 0 && (
                                <View style={styles.dataContainer}>
                                    <Text style={styles.dataTitle}>Consumption Data</Text>
                                    {Object.values(consumptionData.consumo).map((value, index) => (
                                        <Text key={index} style={styles.dataText}>
                                            {String(value)} kWh
                                        </Text>
                                    ))}
                                </View>
                            )}

                            {/* Sensor Data */}
                            {sensorData && (
                                <View style={styles.dataContainer}>
                                    <Text style={styles.dataTitle}>Sensor Data</Text>
                                    {sensorData.temperatura && (
                                        <Text style={styles.dataText}>
                                            Temperature: {(Object.values(sensorData.temperatura) as number[]).slice(-1)[0]}°C
                                        </Text>
                                    )}
                                    {sensorData.umidade && (
                                        <Text style={styles.dataText}>
                                            Humidity: {(Object.values(sensorData.umidade) as number[]).slice(-1)[0]}%
                                        </Text>
                                    )}
                                </View>
                            )}
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={styles.connectButton}
                            onPress={() => navigation.navigate('SolarPanelAddition', { residenceId })}
                        >
                            <Text style={styles.connectButtonText}>Connect to Solar Panel</Text>
                        </TouchableOpacity>
                    )}
                </ScrollView>
            ) : (
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.header}>
                        <View style={styles.infosContainer}>
                            <View style={styles.infosResidenceContainer}>
                                <Text style={styles.nameText}>{residenceData.name}</Text>
                            </View>

                            <View style={styles.infosResidenceContainer}>
                                <Text style={[styles.tariffFlagText, { color: priceColor }]}>
                                    {residenceData.tariffFlag.flag}
                                </Text>
                            </View>

                            <View style={styles.infosResidenceContainer}>
                                <Text style={styles.stateText}>{residenceData.state}</Text>
                            </View>
                        </View>

                        <View style={styles.tarrifFlagPriceContainer}>
                            <Text style={[styles.tarrifFlagPriceText]}>
                                + R$ {priceFlag} /kWh
                            </Text>
                        </View>
                    </View>

                    <View style={styles.main}>

                        <View style={styles.energyBillContainer}>
                            <Text style={styles.energyBillText}>Current energy bill</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter kWh consumed"
                                placeholderTextColor="#6A6767"
                                value={kwh}
                                onChangeText={setKwh}
                                keyboardType="numeric"
                            />
                            <TouchableOpacity onPress={handleCalculate} style={styles.calculateButton}>
                                <Text style={styles.calculateButtonText}>Calcular</Text>
                            </TouchableOpacity>
                            {calculatedBill && <Text style={styles.resultText}>{calculatedBill}</Text>}
                            <View style={styles.line}></View>

                            <Text style={styles.savingsText}>With solar energy, your savings would be ≅ 80% to 90% per month.</Text>
                            <Text style={styles.savingsText2}>Average rate of R$ 30 to R$ 60</Text>

                        </View>


                        <View style={styles.sustentableEnergyContainer}>
                            <View style={styles.helpContainer}>
                                <Text style={styles.co2Text}>
                                    You are helping to avoid the emission of {emissionBrazil.toFixed() || 0} kg of CO₂ per year!
                                </Text>
                            </View>
                            <View style={styles.helpContainer}>
                                <Text style={styles.economyText}>
                                    Globally: Avoiding {emissionGlobal.toFixed() || 0} kgCO₂/year is equivalent to:{"\n"}{"\n"}
                                    • Do not <Text style={styles.spanDrive}>drive a car</Text> for {Math.round(((emissionGlobal || 0) / 1800) * 12)} months.{"\n"}
                                    • Plant around {Math.round((emissionGlobal || 0) / 22.5)} <Text style={styles.spanTree}>trees</Text>.
                                </Text>
                                <View style={styles.line2}></View>
                                <Text style={styles.economyText}>
                                    In Brazil: Avoiding {emissionBrazil.toFixed() || 0} kgCO₂/year is equivalent to:{"\n"}{"\n"}
                                    • Do not <Text style={styles.spanDrive}>drive</Text> for {Math.round(((emissionBrazil || 0) / 1800) * 12)} month.{"\n"}
                                    • Plant about {Math.round((emissionBrazil || 0) / 22.5)} <Text style={styles.spanTree}>trees</Text>.
                                </Text>
                            </View>
                        </View>

                        <View style={styles.solarPanelEconomyContainer}>
                            <Text style={styles.solarPanelTitle}>Economy with Solar Panels</Text>

                            <Text style={styles.firstLineText}>
                                Typical system of <Text style={styles.spanEnergy}>3 kWp</Text>:
                            </Text>
                            <Text style={styles.solarPanelText}>
                                • Average cost: R$ 18,000.{"\n"}
                                • Monthly energy generation: 360 to 450 kWh.{"\n"}
                                • Average monthly savings: Cost per kWh: R$ 0.70/kWh, ~R$ 250 to R$ 300/month.{"\n"}
                                • Return on investment: Around 5 to 7 years, depending on consumption and local tariff.
                            </Text>
                        </View>
                    </View>

                </ScrollView>
            )}
        </View>
    );
};

export default ResidenceDetails;
