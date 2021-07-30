import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
    DeviceEventEmitter,
    ScrollView,
    RefreshControl,
} from 'react-native';

// Components
import ProjectList from '../components/Project/ProjectList';
import { Snackbar } from 'react-native-paper';
import FilterBar from '../components/FilterBar';

// Types
import type { Project } from '../api/projectsApi';
import type { RootState } from '../reducers/index';

// APIs
import { getUserProjects } from '../api/projectsApi';

// Hooks
import { useSelector } from 'react-redux';

// Constant
import colors from '../constants/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { RouteProp } from '@react-navigation/native';
import statuses from '../constants/statuses';

type MyProjectsScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'MyProjects'
>;

type MyProjectsScreenRouteProp = RouteProp<RootStackParamList, 'MyProjects'>;

type Props = {
    route: MyProjectsScreenRouteProp;
    navigation: MyProjectsScreenNavigationProp;
};
export default function DashboardScreen(props: Props): React.ReactElement {
    const [refreshing, setRefreshing] = React.useState(false);
    const userId = useSelector((state: RootState) => state.session.id);
    const [projects, setProjects] = React.useState<Array<Project>>([]);

    const [statusBarVisible, setStatusBarVisible] = React.useState(false);
    const [statusBarText, setStatusBarText] = React.useState('');

    const onRefresh = async () => {
        setRefreshing(true);
        const projectsResponse = await getUserProjects(userId);
        if (projectsResponse.successful) {
            setProjects(projectsResponse.data.projects);
        }
        setRefreshing(false);
    };

    const [filter, setFilter] = React.useState('all');
    const changeFilter = (newFilter: string) => {
        setFilter(newFilter);
    };

    useEffect(() => {
        onRefresh();
    }, [props.route.params?.showNotification, props.route.params?.projectId]);

    useEffect(() => {
        if (props.route.params?.showNotification) {
            setStatusBarText(props.route.params.showNotification);
            setStatusBarVisible(true);
        }
    }, [props.route.params?.showNotification, props.route.params?.projectId]);

    useEffect(() => {
        DeviceEventEmitter.addListener(
            'viewProject',
            (data: { projectId: string }) => {
                props.navigation.navigate('ProjectVisualization', {
                    projectId: data.projectId,
                });
            }
        );

        DeviceEventEmitter.addListener(
            'editProject',
            (data: { projectId: string }) => {
                props.navigation.navigate('ProjectCreation', {
                    edition: true,
                    projectId: data.projectId,
                });
            }
        );
        return () => {
            DeviceEventEmitter.removeAllListeners('viewProject');
            DeviceEventEmitter.removeAllListeners('editProject');
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
            >
                <View style={styles.filterBar}>
                    <FilterBar
                        filter={filter}
                        onChangeFilter={changeFilter}
                        feature='Status'
                        options={[...statuses, 'Draft']}
                    />
                </View>
                <View style={styles.container}>
                    <ProjectList
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        projects={projects.filter(
                            (project) =>
                                filter === 'all' ||
                                project.status.toLowerCase() === filter
                        )}
                        showStatus={true}
                        showAdvanceStageButton={true}
                        myProjectsNavigation={props.navigation}
                    />
                </View>
            </ScrollView>
            <Snackbar
                visible={statusBarVisible}
                onDismiss={() => {
                    setStatusBarVisible(false);
                }}
            >
                {statusBarText}
            </Snackbar>
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
    filterText: {
        fontSize: 16,
        color: colors.darkGrey,
    },
    filterBar: {
        marginHorizontal: 20,
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
