import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import colors from '../constants/colors';

import Message from '../components/Messages/Message';
import { useEffect, useState } from 'react';

import firebase from 'firebase';
import firebaseConfig from '../firebase/config';
import 'firebase/database';
import { useSelector } from 'react-redux';
import type { RootState } from '../reducers';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { RouteProp } from '@react-navigation/native';
import { notifyMessage } from '../api/notifsApi';

type MessageChatScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'MessagesChat'
>;
type MessageChatScreenRouteProp = RouteProp<
    RootStackParamList,
    'MessagesChat'
>;

type Props = {
    route: MessageChatScreenRouteProp;
    navigation: MessageChatScreenNavigationProp;
};

type MessageType = {
    message: string;
    sentByMe: boolean;
};

const genChatRef = (userId1: string, userId2: string): string => {
    if (userId1 < userId2) {
        return userId1 + '_' + userId2;
    } else {
        return userId2 + '_' + userId1;
    }
};

export default function MessageChatScreen(props: Props): React.ReactElement {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }

    const [messages, setMessages] = useState<Array<MessageType>>([]);
    const myUserId = useSelector((state: RootState) => state.session.id);
    const otherUserId = props.route.params.userId;
    const [chatExistenceChecked, setChatExistenceChecked] = useState(false);
    const chatId = genChatRef(myUserId, otherUserId);
    const [typingMessage, setTypingMessage] = useState('');

    const onSendMessagePress = async () => {
        console.log('Attempting to send message');
        const chatRef = firebase.database().ref('chat/' + chatId);
        const messageId = chatRef.push().key;
        if (messageId) {
            chatRef.child(messageId).set({
                messageId: messageId,
                message: typingMessage,
                senderId: myUserId,
                receiverId: otherUserId,
            });
            notifyMessage(typingMessage, otherUserId);
            setTypingMessage('');
        }

        if (chatExistenceChecked) return;
        setChatExistenceChecked(true);

        // Check for my existing chats
        const existingChatRefs = firebase
            .database()
            .ref('unique_chat/' + myUserId);
        const myChats = await (await existingChatRefs.get()).val();
        if (!myChats) {
            console.log('Setting chat');
            existingChatRefs.set([otherUserId]);
        } else {
            console.log(myChats);

            if (!myChats.includes(otherUserId)) {
                existingChatRefs.set([...myChats, otherUserId]);
            }
        }

        // Check for other people existing chats

        const otherExistingChatRefs = firebase
            .database()
            .ref('unique_chat/' + otherUserId);
        const otherChats = await (await otherExistingChatRefs.get()).val();
        if (!otherChats) {
            console.log('Setting chat');
            otherExistingChatRefs.set([myUserId]);
        } else {
            console.log(otherChats);

            if (!otherChats.includes(myUserId)) {
                otherExistingChatRefs.set([...otherChats, myUserId]);
            }
        }
    };

    const addNewMessage = (newMessage: MessageType) => {
        setMessages((oldMessages) => [
            ...oldMessages,
            { message: newMessage.message, sentByMe: newMessage.sentByMe },
        ]);
    };

    useEffect(() => {
        firebase
            .database()
            .ref('chat/' + chatId)
            .on('child_added', (snapshot) => {
                const newMessage = snapshot.val();
                addNewMessage({
                    message: newMessage.message,
                    sentByMe: newMessage.senderId === myUserId,
                });
            });
    }, []);

    const scrollRef = React.useRef<ScrollView | null>();
    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollableContainer}
                ref={(ref) => (scrollRef.current = ref)}
                onContentSizeChange={() => scrollRef.current?.scrollToEnd()}
            >
                {messages.map((message, index) => {
                    return (
                        <Message
                            key={index}
                            mine={message.sentByMe}
                            message={message.message}
                        />
                    );
                })}
            </ScrollView>
            <View style={styles.bottomBar}>
                <TextInput
                    style={styles.textInput}
                    mode='outlined'
                    onChangeText={(text) => setTypingMessage(text)}
                    value={typingMessage}
                />
                <IconButton
                    icon='send'
                    size={30}
                    color={colors.white}
                    style={{ backgroundColor: colors.primary.light }}
                    onPress={onSendMessagePress}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollableContainer: {
        alignSelf: 'stretch',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 10,
    },
    bottomBar: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textInput: {
        backgroundColor: '#ffffff',
        flex: 1,
    },
});
