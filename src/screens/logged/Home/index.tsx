import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text, ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { database, auth } from '../../../../firebaseConfig';


import styles from './style';
import { LoggedNavigation } from '@/types';


const Home = () => {
    const navigation = useNavigation<LoggedNavigation>();
    const [residences, setResidences] = useState<any[]>([]);  // criar um tipo para as residências se necessário?
    const [reload, setReload] = useState(false);


    const goToResidenceAddition = () => {
        navigation.navigate('ResidenceAddition');
    };

    const goToResidenceDetails = (residenceId: string) => {
        navigation.navigate('ResidenceDetails', { residenceId });
    };

    
    useFocusEffect(
        React.useCallback(() => {
            const fetchResidences = async () => {
                if (!auth.currentUser) return;

                const userId = auth.currentUser.uid;
                const q = query(collection(database, 'residences'), where('userId', '==', userId));

                try {
                    const querySnapshot = await getDocs(q);
                    const residencesList: any[] = [];
                    querySnapshot.forEach((doc) => {
                        residencesList.push({ id: doc.id, ...doc.data() });
                    });
                    residencesList.sort((a, b) => a.name.localeCompare(b.name));

                    setResidences(residencesList);
                } catch (error) {
                    console.error('Error fetching residences:', error);
                }
            };

            fetchResidences();
        }, [reload])
    );



    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.main}>
                <Text style={styles.textEnergy}>Add your home and monitor your energy</Text>
                <TouchableOpacity style={styles.residenceButton} onPress={goToResidenceAddition}>
                    <Image source={require('../../../../assets/Images/plusIcon.png')} style={styles.plusIcon} />
                    <Text style={styles.residenceText}>Add residence</Text>
                </TouchableOpacity>
                {residences.length > 0 ? (
                    residences.map((residence) => (
                        <TouchableOpacity
                            key={residence.id}
                            style={styles.registeredResidences}
                            onPress={() => goToResidenceDetails(residence.id)}
                        >
                            <Image
                                source={
                                    residence.hasSolarPanel
                                        ? require('../../../../assets/Images/solarPanelIcon.png')
                                        : require('../../../../assets/Images/noSolarPanelIcon.png')
                                }
                                style={styles.energyIcon}
                            />
                            <Text style={styles.registeredResidencesText}>{residence.name}</Text>
                            <Text style={styles.stateText}>{residence.state}</Text>
                            {residence.hasSolarPanel ? (
                                <Text style={styles.solarPanelText}>Solar Panel Installed</Text>
                            ) : (
                                <Text style={styles.solarPanelText}>No Solar Panel</Text>
                            )}
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.textNoResidence}>No residences added yet</Text>
                )}
            </View>
        </ScrollView>
    );
};

export default Home;
