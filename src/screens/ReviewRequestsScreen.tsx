import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import ReviewRequestList from '../components/ReviewRequest/ReviewRequestList';
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

export default function ReviewRequestsScreen(
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
            setReviewRequests(
                reviewRequestResponse.data.requests.filter(
                    (request, index) => request.status === 'PENDING'
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
            <ReviewRequestList
                refreshing={refreshing}
                onRefresh={onRefresh}
                reviewRequests={reviewRequests}
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
