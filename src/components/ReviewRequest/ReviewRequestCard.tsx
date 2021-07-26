import React, { useState } from 'react';
import { StyleSheet, View, DeviceEventEmitter } from 'react-native';
import {
    Text,
    Card,
    ProgressBar,
    Button,
    IconButton,
} from 'react-native-paper';
import colors from '../../constants/colors';

import {
    acceptReviewRequest,
    rejectReviewRequest,
} from '../../api/projectsApi';
import ProjectStagesModal from './ProjectStagesModal';

import type { Stage } from '../../api/projectsApi';

type Props = {
    title: string;
    city: string;
    country: string;
    cover_image_uri: string;
    description: string;
    projectId: string;
    onRefresh: () => void;
    stages: Array<Stage>;
};

export default function ReviewRequestCard(props: Props): React.ReactElement {
    const onCardPress = () => {
        console.log(props.stages);
    };

    const [projectStagesModalVisible, setProjectStagesModalVisible] =
        useState(false);

    const onAccept = async () => {
        setAccepting(true);
        const response = await acceptReviewRequest(props.projectId);
        if (response.successful) {
            console.log('Successfully accepted reviewership');
            props.onRefresh();
        }
    };

    const onReject = async () => {
        setRejecting(true);
        const response = await rejectReviewRequest(props.projectId);
        if (response.successful) {
            console.log('Successfully rejected reviewership');
            props.onRefresh();
        }
    };

    const [accepting, setAccepting] = useState(false);
    const [rejecting, setRejecting] = useState(false);
    return (
        <Card style={styles.card} onPress={onCardPress}>
            <Card.Cover
                style={styles.cover}
                source={{ uri: props.cover_image_uri }}
            />
            <Card.Title
                title={props.title}
                subtitle={`${props.city}, ${props.country}`}
            />
            <Card.Content>
                <Text>{props.description}</Text>
            </Card.Content>

            <View style={styles.statusSection}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}
                >
                    <Button
                        icon='check-bold'
                        color={colors.primary.light}
                        mode='contained'
                        onPress={onAccept}
                        loading={accepting}
                        disabled={accepting || rejecting}
                    >
                        <Text style={{ color: colors.white }}>Accept</Text>
                    </Button>
                    <Button
                        icon='close-thick'
                        color={colors.darkerGrey}
                        mode='contained'
                        onPress={onReject}
                        loading={rejecting}
                        disabled={accepting || rejecting}
                    >
                        <Text style={{ color: colors.white }}>Decline</Text>
                    </Button>
                    <IconButton
                        size={20}
                        style={{ margin: 0 }}
                        icon='format-list-numbered'
                        color={colors.primary.light}
                        onPress={() => setProjectStagesModalVisible(true)}
                        disabled={accepting || rejecting}
                    />
                </View>
            </View>
            <ProjectStagesModal
                visible={projectStagesModalVisible}
                setVisible={setProjectStagesModalVisible}
                stages={props.stages}
            />
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignSelf: 'stretch',
        marginVertical: 10,
        marginHorizontal: 20,
        height: 400,
    },
    title: {
        alignSelf: 'flex-start',
    },
    statusSection: {
        alignSelf: 'stretch',
        flex: 1,
        position: 'absolute',
        bottom: 10,
        padding: 10,
        width: '100%',
    },
    cover: {
        height: 150,
    },
    progressText: {
        color: colors.primary.light,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    progressTextPercentage: {
        color: colors.primary.light,
        fontWeight: 'bold',
    },
    draftText: {
        color: colors.darkGrey,
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'italic',
        margin: 5,
    },
});
