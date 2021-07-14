import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import ReviewRequestList from '../components/ReviewRequest/ReviewRequestList';
import { getReviewRequests } from '../api/projectsApi';

import type { ReviewRequest } from '../api/projectsApi';
import ReviewerList from '../components/Project/ReviewerList';

export default function ReviewRequestsScreen(): React.ReactElement {
    const [refreshing, setRefreshing] = useState(false);
    const [reviewRequests, setReviewRequests] = useState<Array<ReviewRequest>>(
        []
    );
    const onRefresh = async () => {
        setRefreshing(true);
        const reviewRequestResponse = await getReviewRequests();
        if (reviewRequestResponse.successful) {
            console.log(reviewRequestResponse.data.requests);
            setReviewRequests(reviewRequestResponse.data.requests);
        }
        setRefreshing(false);
    };

    useEffect(() => {
        onRefresh();
    }, []);
    return (
        <View style={styles.container}>
            <ReviewRequestList
                refreshing={refreshing}
                onRefresh={onRefresh}
                reviewRequests={reviewRequests}
            />
        </View>
    );
}

const mockProjects = [
    {
        title: 'Test project 1',
        city: 'Buenos Aires',
        country: 'Argentina',
        description: 'Dejar de tomar falopita',
        id: '123123123',
    },
    {
        title: 'Test project 2',
        city: 'Chapadmalal',
        country: 'Argentina',
        description: 'Tomar MAS falopita',
        id: '123123123',
    },
    {
        title: 'Test project 3',
        city: 'Zapala',
        country: 'Argentina',
        description: 'Dejar de hacer proyectos que hablen de la falopita',
        id: '123123123',
    },
];

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
