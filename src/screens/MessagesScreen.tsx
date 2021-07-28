import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import MessageCard from '../components/Messages/MessageCard';
import { RootStackParamList } from '../types';

import firebase from 'firebase';
import firebaseConfig from '../firebase/config';
import 'firebase/database';
import 'firebase/storage';
import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import type { RootState } from '../reducers';
type ProfileScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Messages'
>;

type Props = {
    navigation: ProfileScreenNavigationProp;
};
export default function MessagesScreen(props: Props): React.ReactElement {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }

    const [chatIds, setChatIds] = useState<Array<string>>([]);
    const myUserId = useSelector((state: RootState) => state.session.id);

    const onRefresh = async () => {
        const existingChatRefs = firebase
            .database()
            .ref('unique_chat/' + myUserId);
        const myChats = await (await existingChatRefs.get()).val();
        setChatIds(myChats);
    };
    useEffect(() => {
        onRefresh();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {chatIds.map((otherId, index) => {
                return (
                    <MessageCard
                        key={index}
                        pictureUri='https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg'
                        name='Nicolas Aguerre'
                        previewMessage='Holis'
                        onPress={() =>
                            props.navigation.navigate('MessagesChat', {
                                userId: otherId,
                                name: 'Nicolas Aguerre',
                            })
                        }
                    />
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
