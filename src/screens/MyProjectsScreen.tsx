import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

// Components
import ProjectList from '../components/Project/ProjectList';
import { Text, Avatar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

// Navigation
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';

// Types
import type { Project } from '../api/projectsApi';
import type { RootState } from '../reducers/index';

// APIs
import { getUserProjects } from '../api/projectsApi';

// Hooks
import { useSelector } from 'react-redux';

// Constant
import colors from '../constants/colors';

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

    const [filter, setFilter] = React.useState('all');

    useEffect(() => {
        onRefresh();
    }, []);

    return (
        <>
            <View style={styles.filterBar}>
                <Avatar.Icon
                    icon='filter'
                    size={25}
                    style={styles.icon}
                    color={colors.darkGrey}
                />
                <Text style={styles.filterText}>View:</Text>
                <Picker
                    style={styles.categorySelector}
                    selectedValue={filter}
                    onValueChange={(itemValue, itemIndex) =>
                        setFilter(itemValue)
                    }
                    mode='dropdown'
                >
                    <Picker.Item label='All' value='all' />
                    <Picker.Item label='Published' value='published' />
                    <Picker.Item label='Draft' value='draft' />
                </Picker>
            </View>
            <View style={styles.container}>
                <ProjectList
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    projects={projects}
                />
            </View>
        </>
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
    filterText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.darkGrey,
    },
    filterBar: {
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 0,
        backgroundColor: '#ddd',
        alignSelf: 'stretch',
        borderRadius: 5,
        padding: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    categorySelector: {
        alignSelf: 'stretch',
        flex: 1,
        height: 25,
    },
    icon: {
        backgroundColor: 'transparent',
    },
});
