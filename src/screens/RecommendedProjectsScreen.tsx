import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import { FAB } from 'react-native-paper';

// Components
import ProjectList from '../components/Project/ProjectList';

// Navigation
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
// Types
import { getRecommendedProjects, Project } from '../api/projectsApi';

// APIs
import colors from '../constants/colors';

// Image Management
export default function RecommendedProjectsScreen({
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
        const projects = await getRecommendedProjects();

        if (projects.successful) {
            setProjects(
                projects.data.projects.filter(
                    (project) => project.status.toLowerCase() !== 'draft'
                )
            );
        }
        setRefreshing(false);
    };

    useEffect(() => {
        onRefresh();
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
