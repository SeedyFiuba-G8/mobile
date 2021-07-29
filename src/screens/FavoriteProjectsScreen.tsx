import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    RefreshControl,
    DeviceEventEmitter,
} from 'react-native';
import { FAB } from 'react-native-paper';

// Components
import ProjectList from '../components/Project/ProjectList';
import FilterBar from '../components/FilterBar';

// Navigation
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
// Types
import {
    getLikedProjects,
    getRecommendedProjects,
    Project,
} from '../api/projectsApi';
import type { RootState } from '../reducers';

// APIs
import colors from '../constants/colors';
import { useSelector } from 'react-redux';

// Image Management
export default function FavoriteProjectsScreen({
    navigation,
}: MaterialTopTabBarProps): React.ReactElement {
    const [refreshing, setRefreshing] = React.useState(false);
    const [projects, setProjects] = React.useState<Array<Project>>([]);
    const onCreatePress = () => {
        navigation.navigate('ProjectCreation', {
            edition: false,
        });
    };

    useEffect(() => {
        onRefresh();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        const projects = await getLikedProjects();

        if (projects.successful) {
            setProjects(
                projects.data.projects.filter(
                    (project, index) =>
                        project.status.toLowerCase() !== 'draft'
                )
            );
        }
        setRefreshing(false);
    };

    useEffect(() => {
        onRefresh();
    }, []);

    useEffect(() => {
        DeviceEventEmitter.addListener(
            'viewProject',
            (data: { projectId: string }) => {
                navigation.navigate('ProjectVisualization', {
                    projectId: data.projectId,
                });
            }
        );
        return () => {
            DeviceEventEmitter.removeAllListeners('viewProject');
        };
    });

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
                contentContainerStyle={styles.scrollContainer}
            >
                <ProjectList
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    projects={projects}
                    showStatus={false}
                    showAdvanceStageButton={false}
                    dashboardNavigation={navigation}
                />
            </ScrollView>
            <FAB
                style={styles.fab}
                icon='lightbulb'
                label='create'
                onPress={onCreatePress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollview: {
        flex: 1,
        alignSelf: 'stretch',
    },
    scrollContainer: {
        paddingBottom: 75,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: colors.primary.light,
    },
});
