import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        minHeight: '100%',
        backgroundColor: colors.primary
    },

    loadingView: {
        backgroundColor: colors.primary
    },

    // HEADER


    header: {
        display: 'flex',
        marginTop: 20,

    },

    infosContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    infosResidenceContainer: {
        backgroundColor: colors.tertiary,
        width: '28%',
        height: 35,

        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },

    nameText: {
        color: colors.quinary,
        textAlign: 'center',
    },

    tariffFlagText: {
        textAlign: 'center',
    },

    stateText: {
        color: colors.quinary,
        textAlign: 'center',
    },



    tarrifFlagPriceContainer: {
        backgroundColor: '#807979',
        marginTop: 25,

        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',

        width: '25%',
        height: 35,

        borderRadius: 6,


    },

    tarrifFlagPriceText: {
        color: colors.black,
        textAlign: 'center'
    },


    // MAIN
    main: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 40
    },

    energyBillContainer: {
        backgroundColor: colors.tertiary,
        width: '90%',
        height: 250,
        borderRadius: 6,
        alignItems: 'center',
        paddingBottom: 20,
        flexGrow: 1,
    },

    expandedContainer: {
        flexGrow: 1,
        minHeight: 200,
    },

    

    energyBillText: {
        marginTop: 15,
        textAlign: 'center',
        color: colors.quinary,
        fontSize: 18,
    },

    calculateButton: {
        marginTop: 15,
        backgroundColor: colors.secondary,
        borderRadius: 4,
        width: '25%',
        height: 25,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },

    calculateButtonText: {
        color: colors.quinary,
        fontSize: 12,
    },

    resultText: {
        color: colors.quinary,
        fontSize: 12,
        marginTop: 20,
    },


    input: {
        marginTop: 10,
        backgroundColor: colors.quinary,
        width: '45%',
        height: 20,
        borderRadius: 4,
        paddingLeft: 10,
        fontSize: 10,
    },

    line: {
        marginTop: 20,
        backgroundColor: colors.quinary,
        height: 1,
        width: '90%'
    },

    savingsText: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 12,
        color: colors.quinary
    },
    savingsText2: {
        marginTop: 15,
        textAlign: 'center',
        fontSize: 12,
        color: colors.quinary

    },

    sustentableEnergyContainer: {
        marginTop: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },

    helpContainer: {
        width: '40%',
        height: 180,
        backgroundColor: colors.tertiary,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },


    co2Text: {
        textAlign: 'center',
        color: colors.quinary,
        fontSize: 12,
        paddingHorizontal: 5
    },

    economyText: {
        textAlign: 'justify',
        color: colors.quinary,
        fontSize: 10,
        paddingHorizontal: 5
    },

    line2: {
        backgroundColor: colors.quinary,
        height: 1,
        width: '90%',
        marginVertical: 15,
    },

    spanDrive: {
        color: '#C1121F'
    },

    spanTree: {
        color: '#13D447'
    },

    solarPanelEconomyContainer: {
        marginTop: 30,
        marginBottom: 40,
        backgroundColor: colors.tertiary,
        width: '90%',
        height: 200,
        borderRadius: 6,

        alignItems: 'center'
    },

    solarPanelTitle: {
        marginTop: 10,
        color: colors.quinary,
        fontSize: 20
    },

    solarPanelText: {
        marginTop: 10,
        width: '85%',
        textAlign: 'justify',
        paddingLeft: 10,
        paddingRight: 10,
    },


    firstLineText: {
        marginTop: 10,

        fontSize: 14,
        width: '85%',
    },

    spanEnergy: {
        color: 'yellow'
    },

});

export default styles;