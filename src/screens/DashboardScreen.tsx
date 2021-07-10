import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    RefreshControl,
    DeviceEventEmitter,
} from 'react-native';
import { Button } from 'react-native-paper';

// Components
import ProjectList from '../components/Project/ProjectList';

// Navigation
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';

// Types
import type { Project } from '../api/projectsApi';

// APIs
import { getAllProjects } from '../api/projectsApi';

// Hooks

export default function DashboardScreen({
    navigation,
}: MaterialTopTabBarProps): React.ReactElement {
    const [refreshing, setRefreshing] = React.useState(false);
    const [projects, setProjects] = React.useState<Array<Project>>([]);

    const onRefresh = async () => {
        setRefreshing(true);
        const projects = await getAllProjects();
        if (projects.successful) {
            setProjects(projects.data.projects);
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
            <ProjectList
                refreshing={refreshing}
                onRefresh={onRefresh}
                projects={projects}
            />
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
