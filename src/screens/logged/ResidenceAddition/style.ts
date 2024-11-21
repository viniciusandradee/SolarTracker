import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        minHeight: '100%',
        backgroundColor: colors.primary
    },

    // MAIN
    main: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 40
    },

    registerResidenceContainer: {
        width: '80%',
        height: 250,

        display: 'flex',
        alignItems: 'center',

        backgroundColor: colors.tertiary,

        borderRadius: 6,
        marginTop: 20,
    },
    
    newResidenceText: {
        marginTop: 15,
        fontSize: 26,
        fontWeight: 'bold',
        color: colors.quinary
    },

    inputContainer: {
        marginTop: 20,
        alignItems: 'center',
        flexDirection: 'row',
    },

    inputText: {
        color: colors.quinary,
        fontSize: 16,
        marginRight: 10,
    },

    pickerContainer: {
        height: 35,
        width: '60%',
        backgroundColor: colors.quinary,
        borderRadius: 8,
        justifyContent: 'center', 
        paddingLeft: 5,
        marginLeft: 5,
    },

    pickerContainer1: {
        height: 35,
        width: '40%',
        backgroundColor: colors.quinary,
        borderRadius: 8,
        justifyContent: 'center', 
        paddingLeft: 5,
        marginLeft: 5,
    },

    picker: {
        color: colors.black,
    },

    input: {
        height: 35,
        width: '60%',
        backgroundColor: colors.quinary,
        color: colors.black,
        fontSize: 14,
        paddingLeft: 15,
        borderRadius: 8,
    },
    
    inputSolarPanel: {
        height: 35,
        width: '40%',
        backgroundColor: colors.quinary,
        color: colors.black,
        fontSize: 16,
        paddingLeft: 15,
        borderRadius: 8,
    },

    registerResidence: {
        width: '60%',
        height: 35,
        
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        
        backgroundColor: colors.tertiary,
        
        borderRadius: 6,
        marginTop: 40,
    },
    addText: {
        fontSize: 18,
        color: colors.quinary
    },
});

export default styles;