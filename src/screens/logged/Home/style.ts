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
        marginTop: 40
    },

    titleLogo: {

    },

    textEnergy: {
        color: colors.quinary
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
        marginTop: 60,
    },

    energyIcon: {
        marginRight: 20,
        width: 35,
        height: 35,
    },

    registeredResidencesText: {
        color: colors.quinary,
        fontSize: 18,
        textAlign: 'center',
    },
});

export default styles;