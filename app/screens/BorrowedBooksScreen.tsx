import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { fetchBooks, returnBook } from '@/services/api';

type Book = {
    id: number;
    title: string;
    author: string;
    available: boolean;
};

export default function BorrowedBooksScreen() {
    const [borrowedBooks, setBorrowedBooks] = useState<Book[]>([]);

    const loadBorrowedBooks = async () => {
        const data = await fetchBooks();
        const filtered = data.filter((book: Book) => !book.available);
        setBorrowedBooks(filtered);
    };

    useEffect(() => {
        loadBorrowedBooks();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={borrowedBooks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.bookItem}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text>{item.author}</Text>
                        <Button title="Return" onPress={async () => {
                            await returnBook(item.id);
                            loadBorrowedBooks();
                        }} />
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
