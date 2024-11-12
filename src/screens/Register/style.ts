import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        minHeight: '100%',
        backgroundColor: '#003049'
    },
    //container: {
    //    flex: 1,
    //    width: '100%',
    //},

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
        color: '#fff',
        fontFamily: 'OdorMeanCheyRegular',

    },


    // MAIN

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
        backgroundColor: '#F4F4F4',
        borderRadius: 8,
        paddingRight: 10,
        height: 40,
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: '#F4F4F4',
        color: '#669BBC',
        fontSize: 16,
        paddingLeft: 20,
        borderRadius: 8,
    },
    inputIcon: {
        width: 20,
        height: 20,
        tintColor: '#669BBC',
    },

    passwordContainer: {
        marginTop: 10,
        width: '70%',
        alignItems: 'flex-end'
    },
    passwordText: {
        color: '#669BBC',
        fontSize: 12,
        textAlign: 'right',
    },

    buttonRegisterContainer: {
        alignItems: 'center',
    },

    buttonRegister: {
        width: '50%',
        height: 30,
        backgroundColor: '#669BBC',
        borderRadius: 6,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonRegisterText: {
        color: '#FFF',
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
        borderColor: '#669BBC',
        borderRadius: 4,

        backgroundColor: 'transparent',
    },

    logoGoogle: {
        width: 21,
        height: 21,
        marginRight: 10,
    },

    googleText: {
        color: '#669BBC',
    },

    buttonHovered: {
        backgroundColor: '#000',
    },


    //FOOTER

    footer: {
        width: '70%',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 70,
        alignItems: 'flex-start'
    },

    textGoToLogin: {
        color: '#669BBC',
        fontSize: 12,
        marginBottom: 10,
    },

    buttonGoToLogin: {
        borderWidth: 1,
        borderColor: '#669BBC',
        borderRadius: 6,
        height: 30,
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonTextGoToLogin: {
        color: '#669BBC',
        fontSize: 12,
    }

});

export default styles;