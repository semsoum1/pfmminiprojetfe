import React, { useEffect, useState } from "react";
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
import { useRoute, useNavigation } from "@react-navigation/native";

const EditBookScreen = () => {
    const { params } = useRoute<any>();
    const navigation = useNavigation();
    const [title, setTitle] = useState(params?.book?.title || "");
    const [author, setAuthor] = useState(params?.book?.author || "");
    const [description, setDescription] = useState(params?.book?.description || "");

    const handleEditBook = async () => {
        try {
            const token = await AsyncStorage.getItem("token");

            await axios.put(
                `http://192.168.1.172:8080/api/livres/${params.livre.id}`,
                { title, author, description },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            Alert.alert("Succès", "Livre modifié avec succès.");
            navigation.goBack();
        } catch (error) {
            console.error("Erreur lors de la modification du livre :", error);
            Alert.alert("Erreur", "Impossible de modifier le livre.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Modifier le livre</Text>

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

            <TouchableOpacity style={styles.button} onPress={handleEditBook}>
                <Text style={styles.buttonText}>Enregistrer les modifications</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default EditBookScreen;

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
