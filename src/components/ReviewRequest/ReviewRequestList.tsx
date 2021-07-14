import React from 'react';
import { ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

// Types
import type { Project } from '../../api/projectsApi';
import colors from '../../constants/colors';
import ReviewRequestCard from './ReviewRequestCard';
import type { ReviewRequest } from '../../api/projectsApi';
type Props = {
    refreshing: boolean;
    onRefresh: () => void;
    reviewRequests: Array<ReviewRequest>;
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
            {props.reviewRequests.length > 0 ? (
                props.reviewRequests.map((reviewRequest, index) => {
                    return (
                        <ReviewRequestCard
                            key={index}
                            title={reviewRequest.title}
                            city={reviewRequest.city}
                            country={reviewRequest.country}
                            cover_image_uri={`https://picsum.photos/id/${
                                randomImageIds[
                                    Math.floor(
                                        Math.random() * randomImageIds.length
                                    )
                                ]
                            }/700`}
                            description={reviewRequest.description}
                            projectId={reviewRequest.projectId}
                            onRefresh={props.onRefresh}
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
