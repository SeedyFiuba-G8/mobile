import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

// Components
import ProjectList from '../components/Project/ProjectList';

// Navigation
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';

// Types
import type { Project } from '../api/projectsApi';
import type { RootState } from '../reducers/index';

// APIs
import { getUserProjects } from '../api/projectsApi';

// Hooks
import { useSelector } from 'react-redux';

export default function DashboardScreen({
    navigation,
}: MaterialTopTabBarProps): React.ReactElement {
    const [refreshing, setRefreshing] = React.useState(false);
    const userId = useSelector((state: RootState) => state.session.id);
    const [projects, setProjects] = React.useState<Array<Project>>([]);

    const onRefresh = async () => {
        setRefreshing(true);
        const projects = await getUserProjects(userId);
        setProjects(projects.projects);
        setRefreshing(false);
    };

    useEffect(() => {
        onRefresh();
    }, []);

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
