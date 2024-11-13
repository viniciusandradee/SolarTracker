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

    inputWrapperImage: {
        flexDirection: 'row',
        width: '70%',
        alignItems: 'center',
        backgroundColor:  colors.quinary,
        borderRadius: 8,
        paddingRight: 10,
        height: 40,
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: colors.quinary,
        color: colors.black,
        fontSize: 16,
        paddingLeft: 20,
        borderRadius: 8,
    },
    inputIcon: {
        width: 20,
        height: 20,
        tintColor: colors.tertiary,
    },

    passwordContainer: {
        marginTop: 10,
        width: '70%',
        alignItems: 'flex-end'
    },
    passwordText: {
        color: colors.tertiary,
        fontSize: 12,
        textAlign: 'right',
    },

    buttonLoginContainer: {
        alignItems: 'center',
    },

    buttonLogin: {
        width: '50%',
        height: 30,
        backgroundColor: colors.secondary,
        borderRadius: 6,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonLoginText: {
        color: colors.quinary,
        fontWeight: 'bold',
        fontSize: 14,

    },


    googleButton: {
        marginTop: 30,
        width: '45%',
        height: 25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        borderWidth: 1,
        borderColor: colors.tertiary,
        borderRadius: 4,

        backgroundColor: 'transparent',
    },

    logoGoogle: {
        width: 21,
        height: 21,
        marginRight: 10,
    },

    googleText: {
        color: colors.tertiary,
    },


    //FOOTER

    footer: {
        width: '70%',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 70,
        alignItems: 'flex-start'
    },

    textCreateAccount: {
        color: colors.tertiary,
        fontSize: 12,
        marginBottom: 10,
    },

    buttonCreateAccount: {
        borderWidth: 1,
        borderColor: colors.tertiary,
        borderRadius: 6,
        height: 30,
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonTextCreateAccount: {
        color: colors.tertiary,
        fontSize: 12,
    }

});

export default styles;