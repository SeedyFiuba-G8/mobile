import React from 'react';
import { ScrollView, RefreshControl, StyleSheet } from 'react-native';
import ProjectCard from './ProjectCard';

// Types
import type { Project } from '../../api/projectsApi';
type Props = {
    refreshing: boolean;
    onRefresh: () => void;
    projects: Array<Project>;
    editable?: boolean;
};

export default function ProjectList(props: Props): React.ReactElement {
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
            {props.projects.map((project, index) => {
                return (
                    <ProjectCard
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
                        progress={Math.random()}
                        backer_count={Math.floor(Math.random() * 100)}
                        id={project.id}
                        draft
                    />
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollview: {
        flex: 1,
        alignSelf: 'stretch',
    },
});

const randomImageIds = [1031, 1, 10, 100, 1002, 1010, 1011];
