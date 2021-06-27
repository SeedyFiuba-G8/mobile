import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';

// Components
import ProjectList from '../components/Project/ProjectList';
import {
    Divider,
    Subheading,
    Title,
    Text,
    FAB,
    Avatar,
    ProgressBar,
} from 'react-native-paper';

// Types
import type { Project } from '../api/projectsApi';
import type { RootState } from '../reducers/index';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// APIs
import { getProject } from '../api/projectsApi';

// Hooks
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../types';
import colors from '../constants/colors';
import data from '../components/DrawerContent/Contents/other';

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
    const onRefresh = async () => {
        const project_temp = await getProject(props.route.params.projectId);
        setProject(project_temp);
    };

    useEffect(() => {
        onRefresh();
    }, [props.route.params.projectId]);

    const date = new Date(project?.publishedOn);
    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                style={styles.scrollview}
                contentContainerStyle={styles.container}
            >
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

                    <Title style={styles.objectiveTitle}>Objective</Title>
                    <Text>{project?.objective}</Text>

                    <Divider style={styles.divider} />

                    <Title style={styles.objectiveTitle}>Description</Title>
                    <Text>{project?.description}</Text>

                    <Divider style={styles.divider} />

                    <Title style={styles.objectiveTitle}>Goal</Title>
                    <IconLabel
                        icon='calendar'
                        text={`Published on ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}
                    />
                    <ProgressBar progress={0.7} style={{ height: 10 }} />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, alignItems: 'flex-start' }}>
                            <Text>
                                Insertar aca la cantidad de plata obtenida
                            </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-start' }}>
                            <Text>Insertar aca la cantidad de backers</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-start' }}>
                            <Text>Insertar aca los dias restantes</Text>
                        </View>
                    </View>
                </View>
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
});
