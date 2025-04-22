import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { fetchBooks, borrowBook, returnBook } from '@/services/api';

type Book = {
    id: number;
    title: string;
    author: string;
    available: boolean;
};

export default function BookListScreen() {
    const [books, setBooks] = useState<Book[]>([]);

    const loadBooks = async () => {
        const data = await fetchBooks();
        setBooks(data);
    };

    useEffect(() => {
        loadBooks();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={books}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.bookItem}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text>{item.author}</Text>
                        {item.available ? (
                            <Button title="Borrow" onPress={async () => {
                                await borrowBook(item.id);
                                loadBooks();
                            }} />
                        ) : (
                            <Button title="Return" onPress={async () => {
                                await returnBook(item.id);
                                loadBooks();
                            }} />
                        )}
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    bookItem: {
        marginBottom: 20
    },
    title: {
        fontWeight: 'bold'
    }
});
