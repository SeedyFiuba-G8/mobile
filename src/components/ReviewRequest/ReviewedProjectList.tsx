import React from 'react';
import { ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

// Types
import colors from '../../constants/colors';
import ReviewedProjectCard from './ReviewedProjectCard';
import type { Project } from '../../api/projectsApi';
type Props = {
    refreshing: boolean;
    onRefresh: () => void;
    projects: Array<Project>;
    editable?: boolean;
};

export default function ReviewedProjectList(props: Props): React.ReactElement {
    return (
        <ScrollView
            style={styles.scrollview}
            refreshControl={
                <RefreshControl
                    refreshing={props.refreshing}
                    onRefresh={props.onRefresh}
                />
            }
        >
            {props.projects.length > 0 ? (
                props.projects.map((project, index) => {
                    return (
                        <ReviewedProjectCard
                            key={index}
                            title={project.title}
                            city={project.city}
                            country={project.country}
                            cover_image_uri={project.coverPicUrl}
                            description={project.description}
                            projectId={project.id}
                            onRefresh={props.onRefresh}
                            stages={project.stages}
                        />
                    );
                })
            ) : (
                <Text style={styles.noProjectsText}>
                    You are currently not reviewing any projects.
                </Text>
            )}
        </ScrollView>
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
