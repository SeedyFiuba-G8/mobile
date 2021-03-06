import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
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
import TagAdder from '../components/Project/TagAdder';

// Image Management
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

    const [tags, setTags] = useState<Array<string>>([]);
    useEffect(() => {
        onRefresh();
    }, [searchStatus, searchCategory, tags]);

    const onRefresh = async () => {
        setRefreshing(true);
        const querySearchStatus =
            searchStatus === 'all' ? undefined : searchStatus.toUpperCase();
        const querySearchCategory =
            searchCategory === 'all' ? undefined : searchCategory;
        const projects = await getAllProjects(
            querySearchStatus,
            querySearchCategory,
            tags
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
                        <View
                            style={{
                                backgroundColor: '#dddddd',
                                borderRadius: 5,
                                marginTop: 10,
                            }}
                        >
                            <TagAdder tags={tags} setTags={setTags} />
                        </View>
                    </View>
                ) : null}
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
