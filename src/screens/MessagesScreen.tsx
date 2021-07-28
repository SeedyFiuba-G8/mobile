import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import MessageCard from '../components/Messages/MessageCard';
import { RootStackParamList } from '../types';

import firebase from 'firebase';
import firebaseConfig from '../firebase/config';
import 'firebase/database';
import 'firebase/storage';
import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import type { RootState } from '../reducers';
import { getProfile } from '../api/profileApi';
import { ActivityIndicator } from 'react-native-paper';

type ProfileScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Messages'
>;

type Props = {
    navigation: ProfileScreenNavigationProp;
};

type ChatEntry = {
    pictureUri?: string;
    name: string;
    userId: string;
};

export default function MessagesScreen(props: Props): React.ReactElement {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }

    const [chatEntries, setChatEntries] = useState<Array<ChatEntry>>([]);
    const myUserId = useSelector((state: RootState) => state.session.id);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        const existingChatRefs = firebase
            .database()
            .ref('unique_chat/' + myUserId);
        const myChats = await (await existingChatRefs.get()).val();
        if (!myChats) {
            setChatEntries([]);
            setRefreshing(false);
            return;
        }

        const profiles = [] as Array<ChatEntry>;

        await Promise.all(
            (myChats as Array<string>).map(async (userId, index) => {
                const profile = await getProfile(userId);
                if (profile.successful) {
                    console.log(`Pushing data for ${profile.data.firstName}`);
                    profiles.push({
                        pictureUri: profile.data.profilePicUrl,
                        name: `${profile.data.firstName} ${profile.data.lastName}`,
                        userId: userId,
                    });
                }
            })
        );
        setChatEntries(profiles);
        setRefreshing(false);
    };
    useEffect(() => {
        onRefresh();
    }, []);

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            {chatEntries.map((entry, index) => {
                return (
                    <MessageCard
                        key={index}
                        pictureUri={entry.pictureUri}
                        name={entry.name}
                        previewMessage='Tap to see messages'
                        onPress={() =>
                            props.navigation.navigate('MessagesChat', {
                                userId: entry.userId,
                                name: entry.name,
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
