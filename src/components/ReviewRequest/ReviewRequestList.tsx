import React from 'react';
import { ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

// Types
import type { Project } from '../../api/projectsApi';
import colors from '../../constants/colors';
import ReviewRequestCard from './ReviewRequestCard';

type DraftProject = {
    title: string;
    city: string;
    country: string;
    description: string;
    id: string;
};

type Props = {
    refreshing: boolean;
    onRefresh: () => void;
    projects: Array<DraftProject>;
    editable?: boolean;
};

export default function ReviewRequestList(props: Props): React.ReactElement {
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
                        <ReviewRequestCard
                            key={index}
                            title={project.title}
                            city={project.city}
                            country={project.country}
                            cover_image_uri={`https://picsum.photos/id/${
                                randomImageIds[
                                    Math.floor(
                                        Math.random() * randomImageIds.length
                                    )
                                ]
                            }/700`}
                            description={project.description}
                            id={project.id}
                        />
                    );
                })
            ) : (
                <Text style={styles.noProjectsText}>
                    You have no review requests.
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
