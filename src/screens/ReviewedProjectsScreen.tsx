import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import ReviewedProjectList from '../components/ReviewRequest/ReviewedProjectList';
import { getReviewRequests } from '../api/projectsApi';

import { ReviewerCenterTabParamList } from '../types';
import type { ReviewRequest } from '../api/projectsApi';

import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { RouteProp } from '@react-navigation/native';

type ReviewRequestsScreenNavigationProp = MaterialTopTabNavigationProp<
    ReviewerCenterTabParamList,
    'ReviewRequests'
>;
type ReviewRequestsScreenRouteProp = RouteProp<
    ReviewerCenterTabParamList,
    'ReviewRequests'
>;

type Props = {
    route: ReviewRequestsScreenRouteProp;
    navigation: ReviewRequestsScreenNavigationProp;
};

export default function ReviewedProjectsScreen(
    props: Props
): React.ReactElement {
    const [refreshing, setRefreshing] = useState(false);
    const [reviewRequests, setReviewRequests] = useState<Array<ReviewRequest>>(
        []
    );
    const onRefresh = async () => {
        setRefreshing(true);
        const reviewRequestResponse = await getReviewRequests();
        if (reviewRequestResponse.successful) {
            console.log(reviewRequestResponse.data.requests);
            /* REMOVE MOCK
            setReviewRequests(
                reviewRequestResponse.data.requests.filter(
                    (request, index) => request.status === 'PENDING'
                )
            );*/
        }
        setReviewRequests(MockProjects);
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
                reviewRequests={reviewRequests}
            />
        </View>
    );
}

const MockProjects = [
    {
        projectId: '123123123',
        userId: '123123123',
        title: 'Que se me deje de enfriar el mate',
        description: 'Necesito que el mate deje de enfriarse',
        type: 'Productivity',
        objective: 'Lograr que mi mate no se enfrie mais',
        country: 'Argentina',
        city: 'Buenos Aires',
        publishedOn: '2021-07-24T21:12:40.070Z',
        finalizedBy: '2021-07-24T21:12:40.070Z',
        status: 'ACCEPTED',
    },
    {
        projectId: '123123123',
        userId: '123123123',
        title: 'Torta que no engorda',
        description: 'Necesito que la torta deje de engordar',
        type: 'Productivity',
        objective: 'Lograr la una torta que no engorde',
        country: 'Argentina',
        city: 'Buenos Aires',
        publishedOn: '2021-07-24T21:12:40.070Z',
        finalizedBy: '2021-07-24T21:12:40.070Z',
        status: 'ACCEPTED',
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
