import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../app/screens/LoginScreen';
import RegisterScreen from '../app/screens/RegisterScreen';
import BookListScreen from '../app/screens/BookListScreen';
import { AuthContext } from '@/context/AuthContext';

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Books: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    const { userToken } = useContext(AuthContext);

    return (
        <Stack.Navigator>
            {userToken == null ? (
                <>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                </>
            ) : (
                <Stack.Screen name="Books" component={BookListScreen} />
            )}
        </Stack.Navigator>
    );
};

export default AppNavigator;
