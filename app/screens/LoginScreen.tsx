import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { AuthContext } from '@/context/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);

    return (
        <View style={{ padding: 20 }}>
            <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={{ marginBottom: 10 }} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ marginBottom: 10 }} />
            <Button title="Login" onPress={() => login(username, password)} />
            <Text onPress={() => navigation.navigate('Register')} style={{ marginTop: 20, color: 'blue' }}>Register</Text>
        </View>
    );
};

export default LoginScreen;
