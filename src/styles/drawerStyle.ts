import { StyleSheet } from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.primary,
    },

    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },

    backgroundMenu: {
        backgroundColor: colors.white,
    },

    drawerLabel: {
        color: colors.tertiary,
        fontSize: 16,
        marginVertical: 10,
        flex: 1,
    },
    
    menu: {
        color: colors.tertiary,
    },

    menuContainer: {
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 50,
        
    },

    menuNavigation: {
        marginLeft: 30
    },
    
    itemStyle: {
        height: 50,
        marginTop: 15,
        justifyContent: 'center',
        paddingVertical: 5,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        
    },
    HomeIcon:{
        width: 30,
        height: 26, 
        marginRight: 15
    },
    ProfileIcon:{
        width: 30,
        height: 30, 
        marginRight: 15
    },

    signOutButton: {
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: colors.tertiary,
        marginTop: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
    },

    signOutText: {
        color: colors.tertiary,
        fontSize: 16,
    }
});

export default styles;
