import React, {useEffect} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import RegisterScreen from "../screens/RegisterScreen";
import AddBookScreen from "../screens/AddBookScreen";
import EditBookScreen from "../screens/EditBookScreen";
import LoginScreen from "@/app/screens/LoginScreen";
import BookListScreen from "@/app/screens/BookListScreen";



    export type RootStackParamList = {
    Login: undefined;
    Register: undefined
    AddBook: undefined
    EditBook: { bookId: number }
    BookList: undefined


};

const Stack = createStackNavigator<RootStackParamList>();

export default function HomePage() {

    useEffect(() => {

    }, []);
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: '#2196F3',
                },
                headerTintColor: '#fff',
            }}>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
            <Stack.Screen name="AddBook" component={AddBookScreen} options={{headerShown: false}}/>
            <Stack.Screen name="EditBook" component={EditBookScreen} options={{headerShown: false}}/>
            <Stack.Screen name="BookList" component={BookListScreen}  />

        </Stack.Navigator>

    );
}