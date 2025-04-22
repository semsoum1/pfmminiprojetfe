import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { registerUser } from '@/services/api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            await registerUser(username, password);
            Alert.alert('Registration successful', 'You can now log in.', [
                { text: 'OK', onPress: () => navigation.navigate('Login') }
            ]);
        } catch (error) {
            Alert.alert('Registration failed', 'Please try again.');
            console.error(error);
        }
    };

    return (
        <View style={{ padding: 20 }}>
    <TextInput
        placeholder="Username"
    value={username}
    onChangeText={setUsername}
    autoCapitalize="none"
    style={{ marginBottom: 10, borderWidth: 1, padding: 8, borderRadius: 5 }}
    />
    <TextInput
    placeholder="Password"
    value={password}
    onChangeText={setPassword}
    secureTextEntry
    style={{ marginBottom: 10, borderWidth: 1, padding: 8, borderRadius: 5 }}
    />
    <Button title="Register" onPress={handleRegister} />
    </View>
);
};

export default RegisterScreen;
