import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';

// Components
import {
    Divider,
    Subheading,
    Title,
    Text,
    FAB,
    Avatar,
    ProgressBar,
    Chip,
    ActivityIndicator,
    IconButton,
} from 'react-native-paper';
import SponsorProjectModal from '../components/Sponsor/SponsorProjectModal';
import StageItem from '../components/Project/StageItem';

// Types
import type { GetProjectApiResponse } from '../api/projectsApi';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// APIs
import {
    getProject,
    fundProject,
    likeProject,
    dislikeProject,
    rateProject,
} from '../api/projectsApi';
import { getProfile } from '../api/profileApi';

// Hooks
import { RootStackParamList } from '../types';
import colors from '../constants/colors';
import SponsorDisclaimerModal from '../components/Sponsor/SponsorDisclaimerModal';

// Util
import { updateBalance } from '../util/transactions';

type ProjectVisualizationScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'ProjectVisualization'
>;

type ProjectVisualizationScreenRouteProp = RouteProp<
    RootStackParamList,
    'ProjectVisualization'
>;

type Props = {
    route: ProjectVisualizationScreenRouteProp;
    navigation: ProjectVisualizationScreenNavigationProp;
};

const IconLabel = (props: {
    icon: string;
    text: string;
    onPress?: () => void;
}) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <View>
                <Avatar.Icon
                    icon={props.icon}
                    color={colors.darkGrey}
                    style={styles.icon}
                    size={35}
                />
            </View>
            <View>
                <Subheading style={styles.subheading} onPress={props.onPress}>
                    {props.text}
                </Subheading>
            </View>
        </View>
    );
};

export default function ProjectVisualizationScreen(
    props: Props
): React.ReactElement {
    const [project, setProject] = useState<GetProjectApiResponse>();
    const [loading, setLoading] = useState(true);

    const [publishedDate, setPublishedDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [creatorName, setCreatorName] = useState('');
    const [totalGoal, setTotalGoal] = useState(0);

    const [donation, setDonation] = useState(0);
    const [sponsorProjectModalVisible, setSponsorProjectModalVisible] =
        useState(false);

    const [processingDonation, setProcessingDonation] = useState(false);
    const [sponsorDisclaimerModalVisible, setSponsorDisclaimerModalVisible] =
        useState(false);
    const onRefresh = async (loadingScreen: boolean) => {
        if (loadingScreen) {
            setLoading(true);
        }
        const projectResponse = await getProject(props.route.params.projectId);
        if (projectResponse.successful) {
            const project_temp = projectResponse.data;
            console.log(project_temp);
            setPublishedDate(new Date(project_temp.publishedOn));
            setEndDate(new Date(project_temp.finalizedBy));
            setProject(project_temp);
            setTotalGoal(
                project_temp.stages
                    .map((stage) => stage.cost)
                    .reduce((a, b) => a + b)
            );
            console.log(project_temp.stages);
            const creatorProfileResponse = await getProfile(
                project_temp.userId
            );
            if (creatorProfileResponse.successful) {
                const creator_profile_temp = creatorProfileResponse.data;
                setCreatorName(
                    `${creator_profile_temp.firstName} ${creator_profile_temp.lastName}`
                );
            }
        }
        if (loadingScreen) {
            setLoading(false);
        }
    };

    useEffect(() => {
        onRefresh(true);
    }, [props.route.params.projectId]);

    const onSponsorProjectPress = () => {
        setSponsorProjectModalVisible(true);
    };
    const remainingDays = Math.max(
        Math.ceil(
            (endDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24)
        ),
        0
    );

    const onCreatorNamePress = () => {
        if (project) {
            props.navigation.navigate('Profile', { userId: project?.userId });
        }
    };

    const onSponsorModalOkPress = (enteredDonation: string) => {
        setDonation(parseFloat(enteredDonation));
        setSponsorProjectModalVisible(false);
        setSponsorDisclaimerModalVisible(true);
    };

    const onConfirmDonation = async () => {
        setProcessingDonation(true);
        const response = await fundProject(
            props.route.params.projectId,
            donation
        );
        setProcessingDonation(false);
        if (response.successful) {
            setSponsorDisclaimerModalVisible(false);
            onRefresh(false);
            updateBalance();
        }
    };

    const onLikePress = async () => {
        if (project === undefined) return;

        if (project.liked) {
            setProject({ ...project, liked: false });
            const result = await dislikeProject(project.id);
            if (result.successful) onRefresh(false);
        } else {
            setProject({ ...project, liked: true });
            const result = await likeProject(project.id);
            if (result.successful) onRefresh(false);
        }
    };

    const onRateProject = async (rating: number) => {
        if (project === undefined) return;
        setProject({ ...project, rated: rating });
        const result = await rateProject(project.id, rating);
        if (result.successful) onRefresh(false);
    };

    console.log(remainingDays);
    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                style={styles.scrollview}
                contentContainerStyle={styles.container}
            >
                {loading ? (
                    <ActivityIndicator size='large' animating={true} />
                ) : (
                    <>
                        <Image
                            style={styles.coverImage}
                            source={{ uri: project?.coverPicUrl }}
                        />
                        <View style={styles.basicInfoView}>
                            <View style={styles.titleAndLikesView}>
                                <Title style={styles.title}>
                                    {project?.title}
                                </Title>
                                <View
                                    style={{
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: colors.darkGrey,
                                            margin: 0,
                                        }}
                                    >
                                        {project?.likes}
                                    </Text>
                                    <IconButton
                                        icon='heart'
                                        color={
                                            project?.liked
                                                ? colors.red
                                                : colors.darkGrey
                                        }
                                        style={{ margin: 0 }}
                                        size={30}
                                        onPress={onLikePress}
                                    />
                                </View>
                            </View>
                            <IconLabel icon='tag' text={project?.type ?? ''} />
                            <IconLabel
                                icon='account'
                                text={creatorName}
                                onPress={onCreatorNamePress}
                            />
                            <Divider style={styles.divider} />

                            <Title style={styles.objectiveTitle}>
                                Objective
                            </Title>
                            <Text>{project?.objective}</Text>

                            <Divider style={styles.divider} />

                            <Title style={styles.objectiveTitle}>
                                Description
                            </Title>
                            <Text>{project?.description}</Text>

                            <Divider style={styles.divider} />

                            <Title style={styles.objectiveTitle}>Funding</Title>
                            <IconLabel
                                icon='calendar'
                                text={`Published on ${publishedDate.getDate()}/${publishedDate.getMonth()}/${publishedDate.getFullYear()}`}
                            />
                            <ProgressBar
                                progress={
                                    (project?.totalFunded ?? 0) / totalGoal
                                }
                                style={{ height: 10 }}
                            />
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <View
                                    style={{
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...styles.statTextMain,
                                            color: colors.primary.light,
                                        }}
                                    >{`ETH ${project?.totalFunded.toFixed(
                                        5
                                    )}`}</Text>
                                    <Text
                                        style={{
                                            ...styles.statTextSecondary,
                                            color: colors.primary.light,
                                        }}
                                    >{`out of ETH ${totalGoal.toFixed(
                                        5
                                    )}`}</Text>
                                </View>
                                <View
                                    style={{
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...styles.statTextMain,
                                            color: colors.darkGrey,
                                        }}
                                    >
                                        {project?.contributors}
                                    </Text>
                                    <Text
                                        style={{
                                            ...styles.statTextSecondary,
                                            color: colors.darkGrey,
                                        }}
                                    >
                                        backers
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...styles.statTextMain,
                                            color: colors.darkGrey,
                                        }}
                                    >
                                        {remainingDays}
                                    </Text>
                                    <Text
                                        style={{
                                            ...styles.statTextSecondary,
                                            color: colors.darkGrey,
                                        }}
                                    >
                                        days left
                                    </Text>
                                </View>
                            </View>

                            <Divider style={styles.divider} />

                            <Title style={styles.objectiveTitle}>
                                Progress
                            </Title>
                            <View style={{ alignItems: 'center' }}>
                                {project?.stages.map((stage, index) => (
                                    <StageItem
                                        key={index}
                                        index={index}
                                        stage={stage}
                                        totalItems={project?.stages.length}
                                        completed={
                                            index < project?.currentStage
                                        }
                                    />
                                ))}
                            </View>
                            <Divider style={styles.divider} />
                            <Title style={styles.objectiveTitle}>Tags</Title>
                            <View style={styles.tagView}>
                                {project?.tags.map((tag, index) => {
                                    return (
                                        <Chip style={styles.tag} key={index}>
                                            {tag}
                                        </Chip>
                                    );
                                })}
                            </View>
                            <Divider style={styles.divider} />
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignSelf: 'stretch',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                {[1, 2, 3, 4, 5].map((number, index) => {
                                    return (
                                        <IconButton
                                            key={index}
                                            icon='star'
                                            color={
                                                project === undefined ||
                                                project.rated < number
                                                    ? colors.grey
                                                    : colors.yellow
                                            }
                                            style={{ margin: 0 }}
                                            onPress={() =>
                                                onRateProject(number)
                                            }
                                        />
                                    );
                                })}
                                <Text style={{ color: colors.darkGrey }}>
                                    {`${project?.rating.mean.toFixed(2)} (${
                                        project?.rating.samples
                                    })`}
                                </Text>
                            </View>
                        </View>
                    </>
                )}
            </ScrollView>
            <SponsorProjectModal
                visible={sponsorProjectModalVisible}
                setVisible={setSponsorProjectModalVisible}
                onOkClick={onSponsorModalOkPress}
                onCancelClick={() => setSponsorProjectModalVisible(false)}
            />
            <SponsorDisclaimerModal
                visible={sponsorDisclaimerModalVisible}
                setVisible={setSponsorDisclaimerModalVisible}
                onOkClick={() => onConfirmDonation()}
                onCancelClick={() => setSponsorDisclaimerModalVisible(false)}
                processingDonation={processingDonation}
            />
            {project?.status.toLowerCase() === 'funding' ? (
                <FAB
                    style={styles.fab}
                    icon='hand-heart'
                    onPress={onSponsorProjectPress}
                    label='Sponsor this project'
                />
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        paddingBottom: 100,
    },
    viewContent: {
        alignItems: 'center',
    },
    scrollview: {
        flex: 1,
        alignSelf: 'stretch',
    },
    title: {
        fontSize: 30,
    },
    subheading: {
        color: colors.darkerGrey,
        fontSize: 15,
    },
    basicInfoView: {
        margin: 5,
        marginTop: 30,
    },
    coverImage: {
        width: 350,
        height: 245,
        alignSelf: 'center',
    },
    objectiveTitle: {
        color: colors.primary.light,
    },
    divider: {
        marginVertical: 10,
    },
    fab: {
        color: colors.primary.light,
        backgroundColor: colors.primary.light,
        position: 'absolute',
        margin: 16,
        alignSelf: 'center',
        bottom: 0,
    },
    icon: {
        backgroundColor: 'transparent',
    },
    statTextMain: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    statTextSecondary: {
        fontSize: 13,
    },
    tagView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        margin: 2,
    },
    stageText: {
        fontWeight: 'bold',
        color: colors.darkGrey,
        fontSize: 16,
    },
    stageItemText: {
        color: colors.darkGrey,
        fontSize: 14,
    },
    stageTextCompleted: {
        fontWeight: 'bold',
        color: colors.primary.light,
        fontSize: 16,
    },
    stageItemTextCompleted: {
        color: colors.primary.light,
        fontSize: 14,
    },
    titleAndLikesView: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
