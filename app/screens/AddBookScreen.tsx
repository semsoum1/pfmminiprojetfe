import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const AddBookScreen = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const navigation = useNavigation();


    const handleAddBook = async () => {
        if (!title || !author || !description) {
            Alert.alert("Erreur", "Veuillez remplir tous les champs.");
            return;
        }

        try {
            const token = await AsyncStorage.getItem("token");

            const response = await axios.post(
                "http://192.168.1.172:8080/api/livres",
                { title, author, description },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            Alert.alert("Succès", "Livre ajouté avec succès.");
            navigation.goBack();
        } catch (error) {
            console.error("Erreur lors de l'ajout du livre :", error);
            Alert.alert("Erreur", "Impossible d'ajouter le livre.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Ajouter un nouveau livre</Text>

            <TextInput
                placeholder="Titre"
                style={styles.input}
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                placeholder="Auteur"
                style={styles.input}
                value={author}
                onChangeText={setAuthor}
            />

            <TextInput
                placeholder="Description"
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
            />

            <TouchableOpacity style={styles.button} onPress={handleAddBook}>
                <Text style={styles.buttonText}>Ajouter</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default AddBookScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#f7f7f7",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: "#fff",
    },
    textArea: {
        height: 100,
        textAlignVertical: "top",
    },
    button: {
        backgroundColor: "#3a416f",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
