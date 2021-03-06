import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Card, ProgressBar } from 'react-native-paper';
import colors from '../../constants/colors';
import { RootStackParamList } from '../../types';
type MyProjectsScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'MyProjects'
>;

type Props = {
    title: string;
    cover_image_uri?: string;
    description: string;
    progress: number;
    backer_count: number;
    id: string;
    status: string;
    showStatus: boolean;
    showAdvanceStageButton: boolean;
    currentStage: number;
    totalStages: number;
    myProjectsNavigation?: MyProjectsScreenNavigationProp;
    dashboardNavigation?: MaterialTopTabBarProps['navigation'];
    blocked: boolean;
    type: string;
};
export default function ProjectCard(props: Props): React.ReactElement {
    const onCardPress = () => {
        if (props.blocked) return;
        if (props.status?.toLowerCase() === 'draft' ?? false) {
            if (props.myProjectsNavigation) {
                props.myProjectsNavigation.navigate('ProjectCreation', {
                    projectId: props.id,
                    edition: true,
                });
            }
        } else {
            if (props.myProjectsNavigation) {
                props.myProjectsNavigation.navigate('ProjectVisualization', {
                    projectId: props.id,
                });
            } else if (props.dashboardNavigation) {
                props.dashboardNavigation.navigate('ProjectVisualization', {
                    projectId: props.id,
                });
            }
        }
    };

    const isInProgress = props.status.toLowerCase() === 'in_progress';

    const generateFundingOrProgressStat = (): React.ReactElement | null => {
        switch (props.status.toLowerCase()) {
            case 'in_progress':
                return (
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={styles.progressTextPercentage}>
                            Working on
                        </Text>
                        <Text style={styles.progressText}>{`stage ${
                            props.currentStage + 1
                        } of ${props.totalStages}`}</Text>
                    </View>
                );
            case 'funding':
                return (
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={styles.progressTextPercentage}>
                            {`${Math.round(props.progress * 100)}%`}
                        </Text>
                        <Text style={styles.progressText}>Funded</Text>
                    </View>
                );
            case 'completed':
                return (
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Text style={styles.progressText}>Completed</Text>
                    </View>
                );
            default:
                return null;
        }
    };

    const generateProgressBar = (): React.ReactElement => {
        if (isInProgress) {
            return (
                <ProgressBar
                    progress={props.currentStage / props.totalStages}
                    style={{ alignSelf: 'stretch' }}
                />
            );
        } else {
            return (
                <ProgressBar
                    progress={props.progress}
                    style={{ alignSelf: 'stretch' }}
                />
            );
        }
    };
    const generateStatusText = (): React.ReactElement | null => {
        if (props.status && props.showStatus) {
            switch (props.status.toLowerCase()) {
                case 'draft':
                    return (
                        <View
                            style={{
                                backgroundColor: colors.darkGrey,
                            }}
                        >
                            <Text style={styles.statusText}>Draft</Text>
                        </View>
                    );
                case 'funding':
                    return (
                        <View style={{ backgroundColor: colors.primary.light }}>
                            <Text style={styles.statusText}>Funding</Text>
                        </View>
                    );
                case 'completed':
                    return (
                        <View style={{ backgroundColor: colors.primary.light }}>
                            <Text style={styles.statusText}>Finished</Text>
                        </View>
                    );
                case 'in_progress':
                    return (
                        <View style={{ backgroundColor: colors.primary.light }}>
                            <Text style={styles.statusText}>In Progress</Text>
                        </View>
                    );
                default:
                    return null;
            }
        }
        return null;
    };

    return (
        <Card
            style={
                !props.blocked
                    ? styles.card
                    : { ...styles.card, backgroundColor: '#dddddd' }
            }
            onPress={onCardPress}
        >
            {generateStatusText()}
            <Card.Cover
                style={styles.cover}
                source={{ uri: props.cover_image_uri }}
            />
            <Card.Title title={props.title} subtitle={`${props.type}`} />
            <Card.Content>
                <Text>{props.description}</Text>
            </Card.Content>

            <View style={styles.statusSection}>
                <View style={{ flexDirection: 'row' }}>
                    {generateFundingOrProgressStat()}

                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Text style={styles.progressTextPercentage}>
                            {props.backer_count}
                        </Text>
                        <Text style={styles.progressText}>Backers</Text>
                    </View>
                </View>
                {generateProgressBar()}
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignSelf: 'stretch',
        marginVertical: 10,
        marginHorizontal: 20,
        height: 450,
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
    statusText: {
        color: colors.white,
        fontSize: 14,
        margin: 5,
        alignSelf: 'center',
    },
    finishedText: {
        color: colors.primary.light,
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'italic',
        margin: 5,
    },
    advanceButton: {
        marginTop: 10,
        marginHorizontal: 40,
    },
});
