import React from 'react';
import { ScrollView, RefreshControl, StyleSheet } from 'react-native';
import ProjectCard from './ProjectCard';
import { Text } from 'react-native-paper';

// Types
import type { Project } from '../../api/projectsApi';
import colors from '../../constants/colors';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';

type MyProjectsScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'MyProjects'
>;

type Props = {
    refreshing: boolean;
    onRefresh: () => void;
    projects: Array<Project>;
    editable?: boolean;
    showStatus: boolean;
    showAdvanceStageButton: boolean;
    myProjectsNavigation?: MyProjectsScreenNavigationProp;
    dashboardNavigation?: MaterialTopTabBarProps['navigation'];
};

export default function ProjectList(props: Props): React.ReactElement {
    return (
        <>
            {props.projects.length > 0 ? (
                props.projects.map((project, index) => {
                    const totalFunds = project.stages
                        .map((stage) => stage.cost)
                        .reduce((a, b) => a + b);
                    return (
                        <ProjectCard
                            key={index}
                            title={project.title}
                            city={project.city}
                            country={project.country}
                            cover_image_uri={project.coverPicUrl}
                            description={project.description}
                            progress={project.totalFunded / totalFunds}
                            backer_count={Math.floor(Math.random() * 100)}
                            id={project.id}
                            status={project.status}
                            showStatus={props.showStatus}
                            showAdvanceStageButton={
                                props.showAdvanceStageButton
                            }
                            currentStage={project.currentStage}
                            totalStages={project.stages.length}
                            myProjectsNavigation={props.myProjectsNavigation}
                            dashboardNavigation={props.dashboardNavigation}
                        />
                    );
                })
            ) : (
                <Text style={styles.noProjectsText}>No projects to show.</Text>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    scrollview: {
        flex: 1,
        alignSelf: 'stretch',
    },
    noProjectsText: {
        alignSelf: 'center',
        color: colors.darkGrey,
        margin: 12,
        fontSize: 16,
    },
});

const randomImageIds = [1031, 1, 10, 100, 1002, 1010, 1011];
