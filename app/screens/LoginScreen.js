import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoginButton from '../components/LoginButton';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useEmailStore } from '../context/EmailContext';
import CreateAccountButton from '../components/CreateAccountButton';

const alert = (title, message) => {
    if (typeof window !== 'undefined' && window.alert) {
        window.alert(`${title}: ${message}`);
    }
};

export default function LoginForm() {
    const navigation = useNavigation();
    const { setEmail } = useEmailStore();
    const [emailInput, setEmailInput] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = () => {
        if (!emailInput || !password) {
            alert('Error', 'Please fill in all fields');
            return;
        }
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput)) {
            alert('Error', 'Please enter a valid email address');
            return;
        }
        // Length validation: min 5, max 20 characters
        if (emailInput.length < 5 || emailInput.length > 20) {
            alert('Error', 'Email must be between 5 and 20 characters');
            return;
        }
        if (password.length < 5 || password.length > 20) {
            alert('Error', 'Password must be between 5 and 20 characters');
            return;
        }
        //Assume: Loging is successfull
        alert('Success', `Welcome, ${emailInput}!`);
        // Save email to context
        setEmail(emailInput);
        // Navigate to MainTabs (bottom tab navigator)
        navigation.navigate('MainTabs');
        // Reset form
        setEmailInput('');
        setPassword('');
    };
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.titleContainer}>
                  
                    <Text style={styles.title}>Login</Text>
                </View>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={emailInput}
                    onChangeText={setEmailInput}
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />

                <LoginButton onPress={handleSubmit} />
                <Text style={styles.label}>Don't have an account?</Text>
                <CreateAccountButton onPress={() => navigation.navigate('Registration')} />
                <Text style={styles.copyright}>© {new Date().getFullYear()} UNBC. All rights reserved.</Text>
            </SafeAreaView >
        </SafeAreaProvider>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
    }, label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        marginTop: 15,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    copyright: {
        textAlign: 'center',
        color: '#666',
        fontSize: 12,
        marginTop: 'auto',
        paddingTop: 20,
    },
});