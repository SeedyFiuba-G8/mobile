import React, { useState } from 'react';
import { StyleSheet, View, DeviceEventEmitter } from 'react-native';
import { Text, Card, Button, IconButton } from 'react-native-paper';
import colors from '../../constants/colors';

import { completeProjectStage } from '../../api/projectsApi';

import type { Stage } from '../../api/projectsApi';

import ProjectStagesModal from './ProjectStagesModal';

type Props = {
    title: string;
    city: string;
    country: string;
    cover_image_uri?: string;
    description: string;
    projectId: string;
    onRefresh: () => void;
    stages: Array<Stage>;
    currentStage: number;
    approvedStage: number;
    status: string;
};

export default function ReviewedProjectCard(props: Props): React.ReactElement {
    const onCardPress = () => {
        console.log('Pressed review request card');
    };

    const [releasing, setReleasing] = useState(false);

    const onReleaseFundsPress = async () => {
        setReleasing(true);
        const response = await completeProjectStage(
            props.projectId,
            props.currentStage
        );
        setReleasing(false);
        if (response.successful) {
            console.log('Successfully approved fund release');
            props.onRefresh();
        }
    };

    const allStagesReleased = props.currentStage === props.stages.length - 1;
    const projectIsFinished = props.status.toLowerCase() === 'finished';

    const projectIsFunding = props.status.toLowerCase() === 'funding';

    const [projectStagesModalVisible, setProjectStagesModalVisible] =
        useState(false);
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
                <View
                    style={{
                        alignSelf: 'stretch',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 20,
                    }}
                >
                    {projectIsFunding ? (
                        <Text
                            style={{
                                ...styles.stageInfoText,
                                fontWeight: 'bold',
                            }}
                        >
                            Project is in funding stage
                        </Text>
                    ) : (
                        <>
                            <Text
                                style={{
                                    ...styles.stageInfoText,
                                    fontWeight: 'bold',
                                }}
                            >
                                {`Stage ${props.currentStage + 1} out of ${
                                    props.stages.length
                                }`}
                            </Text>
                            {!allStagesReleased ? (
                                <Text style={styles.stageInfoText}>
                                    {`Next release is ${
                                        props.stages[props.currentStage + 1]
                                            .cost
                                    } ETH`}
                                </Text>
                            ) : null}
                        </>
                    )}
                </View>
            </Card.Content>

            <View style={styles.statusSection}>
                <View
                    style={{
                        flexDirection: 'row',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {!projectIsFinished && !projectIsFunding ? (
                        <Button
                            icon='lock-open-variant'
                            color={colors.primary.light}
                            mode='contained'
                            onPress={onReleaseFundsPress}
                            loading={releasing}
                            disabled={releasing}
                        >
                            <Text style={{ color: colors.white }}>
                                Advance Stage
                            </Text>
                        </Button>
                    ) : null}
                    <IconButton
                        icon='format-list-numbered'
                        color={colors.primary.light}
                        onPress={() => setProjectStagesModalVisible(true)}
                    />
                </View>
            </View>
            <ProjectStagesModal
                visible={projectStagesModalVisible}
                setVisible={setProjectStagesModalVisible}
                stages={props.stages}
                currentStage={props.currentStage}
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
    stageInfoText: {
        color: colors.primary.light,
    },
});
