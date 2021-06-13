import React from 'react';
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import { Text, Card, Paragraph } from 'react-native-paper';
import ProjectCard from '../components/Project/ProjectCard';

// Navigation
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function DashboardScreen({
    navigation,
}: MaterialTopTabBarProps): React.ReactElement {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(300).then(() => setRefreshing(false));
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollview}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {dummy_projects.map((project, index) => {
                    return (
                        <ProjectCard
                            key={index}
                            title={project.title}
                            author={project.author}
                            cover_image_uri={project.cover_image_uri}
                            description={project.description}
                            progress={project.progress}
                            backer_count={project.backer_count}
                        />
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    scrollview: {
        flex: 1,
        alignSelf: 'stretch',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

const dummy_projects = [
    {
        title: 'Beautiful building',
        author: 'Grupo 8',
        cover_image_uri: 'https://picsum.photos/id/1031/700',
        description:
            'We would like to build a new building for FIUBA, with the aim to provide an amazing space \
            for all students to perform their daily activities and... ',
        progress: 0.55,
        backer_count: 355,
    },
    {
        title: 'Coffee Machine',
        author: 'Tony',
        cover_image_uri: 'https://picsum.photos/id/1060/700',
        description:
            'Imagine you could get up in the morning, put some water and ground coffee into a machine, and receive delicious coffee in a matter of minutes. \
            This machine... ',
        progress: 0.15,
        backer_count: 23,
    },
];
