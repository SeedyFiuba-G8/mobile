import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import { FAB, Text } from 'react-native-paper';

// Components
import ProjectList from '../components/Project/ProjectList';

// Navigation
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
// Types
import { getNearProjects, Project } from '../api/projectsApi';

// APIs
import colors from '../constants/colors';
import * as Location from 'expo-location';

// Image Management
export default function NearProjectsScreen({
    navigation,
}: MaterialTopTabBarProps): React.ReactElement {
    const [refreshing, setRefreshing] = React.useState(false);
    const [projects, setProjects] = React.useState<Array<Project>>([]);
    const onCreatePress = () => {
        navigation.navigate('ProjectCreation', {
            edition: false,
        });
    };
    const [locationGranted, setLocationGranted] = useState(false);

    useEffect(() => {
        onRefresh();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setLocationGranted(false);
            setRefreshing(false);
            return;
        }
        setLocationGranted(true);

        const location = await Location.getCurrentPositionAsync();
        const projects = await getNearProjects(
            location.coords.latitude,
            location.coords.longitude,
            50
        );

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
                {locationGranted ? (
                    <ProjectList
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        projects={projects}
                        showStatus={false}
                        showAdvanceStageButton={false}
                        dashboardNavigation={navigation}
                    />
                ) : (
                    <View
                        style={{
                            margin: 20,
                        }}
                    >
                        <Text style={{ color: colors.darkGrey }}>
                            SeedyFiuba needs access to your location to show you
                            projects near you.
                        </Text>
                    </View>
                )}
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
