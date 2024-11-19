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

    textEmail:{
        color: colors.quinary,
        fontSize: 16,
    },

    textName:{
        color: colors.quinary,
        fontSize: 16,

    },

    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: colors.quinary,
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        color: colors.quinary
    },


    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    addButton: {
        backgroundColor: 'green',
        borderRadius: 4,
        width: '30%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },

    addText: {

    },

    deleteButton: {
        backgroundColor: 'red',
        borderRadius: 4,
        width: '30%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },

    deleteText: {

    }
});

export default styles;