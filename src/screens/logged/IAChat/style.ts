import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        minHeight: '100%',
        backgroundColor: colors.primary
    },

    main:{
        marginVertical: 40,
        width: '80%',
        justifyContent: 'center',
        alignSelf: 'center',
    },

    input: {
        backgroundColor: colors.quinary,
        borderRadius: 4,
        height: 45,
        color: colors.tertiary,
        paddingLeft: 15,
    },

    sendButton: {
        marginTop: 25,
        width: '60%',
        backgroundColor: colors.tertiary,
        height: 35,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },

    sendText :{
        textAlign: 'center',
        color: colors.quinary
    },

    textLoading: {
        color: colors.quinary,
        marginTop: 20,
        textAlign: 'center'
    },

    responseContainer: {
        marginTop: 40,
        backgroundColor: colors.secondary,
        borderRadius: 4,
        width: '100%',
        minHeight: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },

    
    responseTitle: {
        marginVertical: 10,
        fontSize: 24,
        color: colors.quaternary
    },

    responseTextContainer: {
        maxHeight: 2400,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },

    responseText: {
        color: colors.quinary,
        textAlign: 'center',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },

});

export default styles;