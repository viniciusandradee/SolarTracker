import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        minHeight: '100%',
        backgroundColor: '#003049'
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
        color: '#fff',
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
        color: '#669BBC',
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
        backgroundColor: '#669BBC',
        borderRadius: 6,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonConfirmText: {
        color: '#FFF',
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
        borderColor: '#669BBC',
        borderRadius: 6,
        height: 30,
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonTextGoBackLogin: {
        color: '#669BBC',
        fontSize: 12,
    }

});

export default styles;