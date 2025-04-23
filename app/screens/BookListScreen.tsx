import React, { useEffect, useState } from "react";

import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app/(tabs)/HomePage';


type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ListBooks'>;
const books = [
    { id: 1, title: 'Book 1', author: 'Auteur 1' },
    { id: 2, title: 'Book 2', author: 'Auteur 2' }
];
const handleEdit = (book: any) => {
    navigation.navigate('EditBook', { book }); // 👈 ici book est bien défini
};

const navigation = useNavigation<NavigationProp>();

navigation.navigate("AddBook");

interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
}

const ListBooksScreen = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigation = useNavigation();

    const fetchBooks = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.get("http://192.168.1.172:8080/api/livres", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBooks(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des livres :", error);
            Alert.alert("Erreur", "Impossible de charger les livres.");
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchBooks();
        }, [])
    );

    const handleDeleteBook = async (id: number) => {
        Alert.alert(
            "Confirmation",
            "Voulez-vous vraiment supprimer ce livre ?",
            [
                { text: "Annuler", style: "cancel" },
                {
                    text: "Supprimer",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const token = await AsyncStorage.getItem("token");
                            await axios.delete(`http://192.168.1.172:8080/api/livres/${id}`, {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            });
                            fetchBooks();
                            Alert.alert("Succès", "Livre supprimé.");
                        } catch (error) {
                            console.error("Erreur suppression :", error);
                            Alert.alert("Erreur", "Échec de la suppression.");
                        }
                    },
                },
            ]
        );
    };

    const renderBook = ({ item }: { item: Book }) => (
        <View style={styles.card}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.bookAuthor}>Auteur : {item.author}</Text>
            <Text style={styles.bookDescription}>{item.description}</Text>

            <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => navigation.navigate("EditBook", { book: books })}
                >
                    <Text style={styles.actionText}>✏️ Modifier</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: "#d9534f" }]}
                    onPress={() => handleDeleteBook(item.id)}
                >
                    <Text style={styles.actionText}>🗑️ Supprimer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#3a416f" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={books}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderBook}
                contentContainerStyle={{ paddingBottom: 80 }}
            />

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate("AddBook")}
            >
                <Text style={styles.fabText}>＋</Text>
            </TouchableOpacity>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        padding: 16,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#3a416f",
    },
    bookAuthor: {
        fontSize: 14,
        color: "#666",
        marginTop: 4,
    },
    bookDescription: {
        marginTop: 8,
        fontSize: 14,
        color: "#444",
    },
    actions: {
        flexDirection: "row",
        marginTop: 12,
        justifyContent: "space-between",
    },
    actionButton: {
        padding: 10,
        backgroundColor: "#3a416f",
        borderRadius: 6,
    },
    actionText: {
        color: "#fff",
        fontWeight: "bold",
    },
    fab: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#3a416f",
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        elevation: 4,
    },
    fabText: {
        fontSize: 30,
        color: "#fff",
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});


export default ListBooksScreen;