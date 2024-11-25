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


    inputLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.primary || '#333',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.quinary || '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        marginBottom: 16,
    },
    addButton: {
        backgroundColor: colors.primary || '#007BFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

});

export default styles;