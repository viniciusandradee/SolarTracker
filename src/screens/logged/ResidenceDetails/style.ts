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
        color: 'yellow',
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


    // FOOTER

    footer: {

    },

});

export default styles;