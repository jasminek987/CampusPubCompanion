import { TouchableOpacity, Text, StyleSheet } from 'react-native';
export default function LoginButton({ onPress }) {
    const handlePress = () => onPress();
    
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        backgroundColor: '#006400',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});