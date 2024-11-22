import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

import styles from './style';
import colors from '@/styles/colors';
import { useFocusEffect } from '@react-navigation/native';

const IAChat = () => {
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUserInputChange = (text: string) => {
        setUserInput(text);
    };

    const handleSendMessage = async () => {
        if (!userInput.trim()) {
            alert('Please enter a message!');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('https://solartrackerapi-host.up.railway.app/chatbot', {
                prompt: userInput,
            });
            setResponse(response.data.response);
        } catch (error) {
            console.error('Error calling the API:', error);
            setResponse('Error getting response from the AI.');
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
          setUserInput('');
          setResponse('');
        }, [])
      );

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.main}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your message"
                    value={userInput}
                    onChangeText={handleUserInputChange}
                />
                <TouchableOpacity onPress={handleSendMessage} disabled={loading} style={styles.sendButton}>
                    <Text style={styles.sendText}>{loading ? 'Sending...' : 'Send'}</Text>
                </TouchableOpacity>
                {loading && <Text style={styles.textLoading}>Loading...</Text>}
                {response && (
                    <View style={styles.responseContainer}>
                        <Text style={styles.responseTitle}>AI Response:</Text>
                        <ScrollView contentContainerStyle={styles.responseTextContainer}>
                            <Text style={styles.responseText}>{response}</Text>
                        </ScrollView>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

export default IAChat;
