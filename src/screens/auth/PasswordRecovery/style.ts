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

    logoSolarTracker: {
        width: 120,
        height: 120,
    },

    title: {
        fontSize: 36,
        color: colors.quinary,
        fontFamily: 'OdorMeanCheyRegular',

    },

    // MAIN
    main: {
        marginTop: 40,
    },
    inputContainer: {
        alignItems: 'center',
    },

    inputWrapper: {
        width: '70%',
        marginBottom: 20,
    },

    input: {
        flex: 1,
        height: 40,
        backgroundColor: '#F4F4F4',
        color: colors.tertiary,
        fontSize: 16,
        paddingLeft: 20,
        borderRadius: 8,
    },

    buttonConfirmContainer: {
        alignItems: 'center',
    },

    buttonConfirm: {
        width: '50%',
        height: 30,
        backgroundColor: colors.secondary,
        borderRadius: 6,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonConfirmText: {
        color: colors.quinary,
        fontWeight: 'bold',
        fontSize: 14,

    },


    //FOOTER

    footer: {
        width: '70%',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 70,
        alignItems: 'center'
    },

    buttonGoBackLogin: {
        borderWidth: 1,
        borderColor: colors.tertiary,
        borderRadius: 6,
        height: 30,
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonTextGoBackLogin: {
        color: colors.tertiary,
        fontSize: 12,
    }

});

export default styles;