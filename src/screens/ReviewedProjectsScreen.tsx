import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import ReviewedProjectList from '../components/ReviewRequest/ReviewedProjectList';
import { getReviewingProjects } from '../api/projectsApi';

import type { Project } from '../api/projectsApi';

export default function ReviewedProjectsScreen(): React.ReactElement {
    const [refreshing, setRefreshing] = useState(false);
    const [projects, setProjects] = useState<Array<Project>>([]);
    const onRefresh = async () => {
        setRefreshing(true);
        const reviewRequestResponse = await getReviewingProjects();
        if (reviewRequestResponse.successful) {
            console.log(reviewRequestResponse.data.projects);
            setProjects(reviewRequestResponse.data.projects);
        }
        setRefreshing(false);
    };

    useEffect(() => {
        onRefresh();
    }, []);
    return (
        <View style={styles.container}>
            <ReviewedProjectList
                refreshing={refreshing}
                onRefresh={onRefresh}
                projects={projects}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
