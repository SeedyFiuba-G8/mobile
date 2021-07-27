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
import type { Project } from '../api/projectsApi';
import type { RootState } from '../reducers';

// APIs
import { getAllProjects } from '../api/projectsApi';
import colors from '../constants/colors';
import { useSelector } from 'react-redux';
import categories from '../constants/categories';
import statuses from '../constants/statuses';

// Image Management
import * as ImagePicker from 'expo-image-picker';

export default function DashboardScreen({
    navigation,
}: MaterialTopTabBarProps): React.ReactElement {
    const [refreshing, setRefreshing] = React.useState(false);
    const [projects, setProjects] = React.useState<Array<Project>>([]);
    const searchBarVisible = useSelector(
        (state: RootState) => state.interface.searchBarVisible
    );

    const [searchStatus, setSearchStatus] = useState('all');
    const [searchCategory, setSearchCategory] = useState('all');

    const onSearchStatusChange = (status: string) => {
        setSearchStatus(status);
    };

    const onSearchCategoryChange = (category: string) => {
        setSearchCategory(category);
    };

    const onCreatePress = () => {
        navigation.navigate('ProjectCreation', {
            edition: false,
        });
    };

    useEffect(() => {
        onRefresh();
    }, [searchStatus, searchCategory]);

    const onRefresh = async () => {
        setRefreshing(true);
        const querySearchStatus =
            searchStatus === 'all' ? undefined : searchStatus.toUpperCase();
        const querySearchCategory =
            searchCategory === 'all' ? undefined : searchCategory;
        const projects = await getAllProjects(
            querySearchStatus,
            querySearchCategory
        );

        if (projects.successful) {
            console.log(projects.data);
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
                {searchBarVisible ? (
                    <View style={{ marginHorizontal: 20 }}>
                        <FilterBar
                            feature='Category'
                            options={categories}
                            filter={searchCategory}
                            onChangeFilter={onSearchCategoryChange}
                        />
                        <FilterBar
                            feature='Status'
                            options={statuses}
                            filter={searchStatus}
                            onChangeFilter={onSearchStatusChange}
                        />
                    </View>
                ) : null}
                <ProjectList
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    projects={projects}
                    showStatus={false}
                    showAdvanceStageButton={false}
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
