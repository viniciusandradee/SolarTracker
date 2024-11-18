import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        minHeight: '100%',
        backgroundColor: colors.primary
    },

    // HEADER

    header: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 40
    },

    // MAIN
    main: {
        display: 'flex',
        alignItems: 'center',
        marginVertical: 40,
    },

    textEnergy: {
        color: colors.quinary,
    },

    textNoResidence: {
        color: colors.quinary,
        marginTop: 30
    },

    residenceButton: {
        width: '40%',
        height: 26,

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        
        backgroundColor: colors.tertiary,
        
        borderRadius: 6,
        marginTop: 20,
    },

    plusIcon: {
        marginRight: 15,
    },

    residenceText: {
        color: colors.quinary
    },

    registeredResidences: {
        width: '60%',
        height: 72,

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: colors.tertiary,
        
        borderRadius: 6,
        marginTop: 40,
    },

    energyIcon: {
        marginRight: 20,
        width: 35,
        height: 35,
        position: 'absolute',
        left: 25
    },

    registeredResidencesText: {
        color: colors.quinary,
        fontSize: 18,
        textAlign: 'center',
    },

    stateText: {
        position: 'absolute',
        left: 5,
        bottom: 2,
        fontSize: 12,
        color: "#3423A6"
    },

    solarPanelText: {
        position: "absolute",
        right: 5,
        bottom: 2,
        fontSize: 12,
        color: "#3423A6"
    }
});

export default styles;