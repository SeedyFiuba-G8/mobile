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
    Button,
} from 'react-native-paper';

// Types
import type { Project } from '../api/projectsApi';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// APIs
import { getProject } from '../api/projectsApi';

// Hooks
import { RootStackParamList } from '../types';
import colors from '../constants/colors';

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

const IconLabel = (props: { icon: string; text: string }) => {
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
                <Subheading style={styles.subheading}>{props.text}</Subheading>
            </View>
        </View>
    );
};

export default function ProjectVisualizationScreen(
    props: Props
): React.ReactElement {
    const [project, setProject] = useState<Project>();
    const [loading, setLoading] = useState(true);

    const onRefresh = async () => {
        setLoading(true);
        const project_temp = await getProject(props.route.params.projectId);
        setProject(project_temp);
        setLoading(false);
    };

    useEffect(() => {
        onRefresh();
    }, [props.route.params.projectId]);

    const publishedDate = new Date(project?.publishedOn);
    const endDate = new Date(project?.finalizedBy);

    const remainingDays = Math.max(
        Math.ceil(
            (endDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24)
        ),
        0
    );

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
                            source={{ uri: 'https://picsum.photos/350/300' }}
                        />
                        <View style={styles.basicInfoView}>
                            <Title style={styles.title}>{project?.title}</Title>
                            <IconLabel
                                icon='map-marker'
                                text={`Created in ${project?.city}, ${project?.country}`}
                            />
                            <IconLabel icon='tag' text={`Entretainment`} />
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

                            <Title style={styles.objectiveTitle}>
                                Progress
                            </Title>
                            <IconLabel
                                icon='calendar'
                                text={`Published on ${publishedDate.getDate()}/${publishedDate.getMonth()}/${publishedDate.getFullYear()}`}
                            />
                            <IconLabel
                                icon='stairs-up'
                                text={`Currently on stage ${3}`}
                            />
                            <ProgressBar
                                progress={0.7}
                                style={{ height: 10 }}
                            />
                            <View style={{ flexDirection: 'row' }}>
                                <View
                                    style={{
                                        flex: 1,
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...styles.statTextMain,
                                            color: colors.primary.light,
                                        }}
                                    >{`ETH ${25}`}</Text>
                                    <Text
                                        style={{
                                            ...styles.statTextSecondary,
                                            color: colors.primary.light,
                                        }}
                                    >{`out of ETH ${55}`}</Text>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...styles.statTextMain,
                                            color: colors.darkGrey,
                                        }}
                                    >
                                        {145}
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
                                        flex: 1,
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

                            <Title style={styles.objectiveTitle}>Tags</Title>
                            <View style={styles.tagView}>
                                {mockTags.map((tag, index) => {
                                    return (
                                        <Chip style={styles.tag} key={index}>
                                            {tag}
                                        </Chip>
                                    );
                                })}
                            </View>
                            <Divider style={styles.divider} />
                            <Button
                                onPress={() =>
                                    console.log('See comments pressed')
                                }
                            >
                                Comments
                            </Button>
                        </View>
                    </>
                )}
            </ScrollView>
            <FAB
                style={styles.fab}
                icon='ethereum'
                onPress={() => console.log('Pressed')}
                label='Sponsor this project'
            />
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
        height: 300,
        alignSelf: 'center',
    },
    objectiveTitle: {
        color: colors.darkGrey,
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
});

const mockTags = ['Entretainment', 'Game', 'Politics', 'Indie'];
