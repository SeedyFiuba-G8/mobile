import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import {
    Text,
    TextInput,
    Button,
    Divider,
    Snackbar,
    Title,
    ActivityIndicator,
    IconButton,
} from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import colors from '../constants/colors';
//Components
import TagAdder from '../components/Project/TagAdder';
import FundDeadlineSelector from '../components/Project/FundDeadlineSelector';
import ReviewerList from '../components/Project/ReviewerList';
import uuid from 'react-native-uuid';

// Contexts

// API
import {
    createProject,
    getProject,
    updateProject,
    deleteProject,
    publishProject,
} from '../api/projectsApi';
// Hooks

// Types
import { RootStackParamList } from '../types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useEffect } from 'react';

// Constants
import categories from '../constants/categories';

// Util
import { loadUserImage } from '../util/image-util';
import type { loadUserImageResult } from '../util/image-util';

// Firebase
import firebase from 'firebase';
import 'firebase/storage';
import firebaseConfig from '../firebase/config';
import IconSubtitle from '../components/Project/IconSubtitle';
import StageItemInput from '../components/Project/StageItemInput';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';

type ProjectCreationScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'ProjectCreation'
>;

type ProjectCreationScreenRouteProp = RouteProp<
    RootStackParamList,
    'ProjectCreation'
>;

type Props = {
    route: ProjectCreationScreenRouteProp;
    navigation: ProjectCreationScreenNavigationProp;
};

type Stage = {
    description: string;
    cost: string;
};

type Reviewer = {
    email: string;
    status: string;
};

export default function ProjectCreationScreen(
    props: Props
): React.ReactElement {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }
    const [category, setCategory] = useState(categories[0]);
    const [tags, setTags] = useState<Array<string>>([]);
    const [date, setDate] = React.useState<Date>(
        new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
    );
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [objective, setObjective] = React.useState('');
    const [stages, setStages] = React.useState<Array<Stage>>([
        { description: '', cost: '' },
    ]);

    const [statusBarVisible, setStatusBarVisible] = useState(false);
    const [statusBarText, setStatusBarText] = useState('');
    const [reviewers, setReviewers] = useState<Array<Reviewer>>([]);

    const [image, setImage] = useState<loadUserImageResult>();
    const [loading, setLoading] = useState(false);
    parseInt;
    const [creating, setCreating] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [publishing, setPublishing] = useState(false);

    const [location, setLocation] = useState<LocationObject>();

    const onEditProjectLoad = async () => {
        setLoading(true);
        if (props.route.params.edition) {
            const projectResponse = await getProject(
                props.route.params.projectId
            );
            if (projectResponse.successful) {
                const project_temp = projectResponse.data;
                setTitle(project_temp.title);
                setDescription(project_temp.description);
                setObjective(project_temp.objective);
                setDate(new Date(project_temp.finalizedBy));
                setCategory(project_temp.type);
                setTags(project_temp.tags);
                setReviewers(project_temp.reviewers);
                setStages(
                    project_temp.stages.map((stage) => {
                        return {
                            cost: stage.cost.toString(),
                            description: stage.description,
                        };
                    })
                );
                if (project_temp.coverPicUrl) {
                    setImage({ uri: project_temp.coverPicUrl });
                }
            }
        }
        setLoading(false);
    };

    const showAlert = (message?: string) => {
        if (message) {
            setStatusBarText(message);
        } else {
            setStatusBarText('Unexpected error.');
        }
        setStatusBarVisible(true);
    };

    useEffect(() => {
        onEditProjectLoad();
    }, [props.route.params.edition]);

    useEffect(() => {
        const getLocation = async () => {
            const { status } =
                await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setStatusBarText(
                    'SeedyFiuba has no access to your location. Your project will not be listed in geographic searches.'
                );
                setStatusBarVisible(true);
                return;
            }
            const location = await Location.getCurrentPositionAsync();
            setLocation(location);
        };
        getLocation();
    }, []);

    const onCreateButtonPress = async () => {
        setCreating(true);
        const coverImageURL = await uploadImage();
        const projectCreationResponse = await createProject(
            title,
            description,
            category,
            objective,
            date.toJSON(),
            tags,
            reviewers.map((reviewer) => reviewer.email),
            stages.map((stage) => {
                return {
                    cost: parseFloat(stage.cost),
                    description: stage.description,
                };
            }),
            location?.coords.latitude,
            location?.coords.longitude,
            coverImageURL
        );
        setCreating(false);
        if (projectCreationResponse.successful) {
            props.navigation.replace('MyProjects', {
                showNotification: 'Project created successfully!',
                projectId: projectCreationResponse.data.id,
            });
        } else {
            showAlert(projectCreationResponse.errorMessage);
        }
    };

    const onConfirmChangesButtonPress = async () => {
        setSaving(true);
        const new_image_uri = await uploadImage();
        if (props.route.params.edition) {
            const result = await updateProject(
                props.route.params.projectId,
                title,
                description,
                category,
                objective,
                date.toJSON(),
                tags,
                reviewers
                    .filter((reviewer) => reviewer.status === 'PENDING')
                    .map((reviewer) => reviewer.email),
                new_image_uri ?? image?.uri
            );
            if (result.successful) {
                setStatusBarText('Project modified successfully!');
                setStatusBarVisible(true);
            }
        }
        setSaving(false);
    };

    const onDeleteButtonPress = async () => {
        setDeleting(true);
        if (props.route.params.edition) {
            const result = await deleteProject(props.route.params.projectId);
            if (result.successful) {
                props.navigation.pop();
                props.navigation.replace('MyProjects', {
                    showNotification: 'Project deleted successfully!',
                    projectId: props.route.params.projectId,
                });
            }
        }
        setDeleting(false);
    };

    const onPublishButtonPress = async () => {
        setPublishing(true);
        if (props.route.params.edition) {
            const result = await publishProject(props.route.params.projectId);
            if (result.successful) {
                props.navigation.pop();
                props.navigation.replace('MyProjects', {
                    showNotification: 'Your project has been published!',
                    projectId: props.route.params.projectId,
                });
            }
        }
        setPublishing(false);
    };
    const onModifyStageTitle = (index: number, title: string) => {
        const stage_modified = [...stages];
        stage_modified[index].description = title;
        setStages(stage_modified);
    };

    const onModifyStageGoal = (index: number, goal: string) => {
        const stage_modified = [...stages];
        stage_modified[index].cost = goal;
        setStages(stage_modified);
    };

    const onAddStagePress = () => {
        const stage_modified = [...stages, { description: '', cost: '' }];
        setStages(stage_modified);
    };

    const onDeleteStagePress = (delete_index: number) => {
        const stage_modified = stages.filter((stage, index) => {
            return index !== delete_index;
        });
        setStages(stage_modified);
    };

    const onSelectCoverImagePress = async () => {
        const result = await loadUserImage([5, 3]);
        if (!result) {
            return;
        }
        setImage(result);
    };

    const uploadImage = async (): Promise<string | undefined> => {
        if (!image || !image.blob) return;
        const ref = firebase
            .storage()
            .ref()
            .child(`public/project/${uuid.v4()}`);
        await ref.put(image.blob);
        const newURL = await ref.getDownloadURL();
        console.log(newURL);
        return newURL;
    };

    const onRemoveImagePress = () => {
        setImage(undefined);
    };

    const isPublishable = reviewers.some(
        (reviewer) => reviewer.status === 'ACCEPTED'
    );
    return (
        <>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.container}
            >
                {loading ? (
                    <ActivityIndicator size='large' animating={true} />
                ) : (
                    <View
                        style={{ alignSelf: 'stretch', alignItems: 'center' }}
                    >
                        <Title style={styles.titlePrimary}>
                            Project Title
                        </Title>
                        <TextInput
                            style={styles.input}
                            onChangeText={(newTitle) => setTitle(newTitle)}
                            value={title}
                            mode='outlined'
                            placeholder='Give your project a name'
                        />
                        <IconSubtitle icon='bullseye-arrow' text='Objective' />
                        <TextInput
                            style={styles.descriptionInput}
                            multiline={true}
                            onChangeText={(newObjective) =>
                                setObjective(newObjective)
                            }
                            mode='outlined'
                            placeholder='Briefly describe what you hope to accomplish'
                            numberOfLines={5}
                            value={objective}
                        />

                        <IconSubtitle icon='text' text='Description' />
                        <TextInput
                            style={styles.descriptionInput}
                            multiline={true}
                            onChangeText={(newDescription) =>
                                setDescription(newDescription)
                            }
                            mode='outlined'
                            placeholder='Give a more detailed description of your project'
                            numberOfLines={10}
                            value={description}
                        />

                        <IconSubtitle icon='image' text='Cover Image' />
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                alignSelf: 'stretch',
                                marginHorizontal: 28,
                                flexDirection: 'row',
                            }}
                        >
                            {!image ? (
                                <>
                                    <Button
                                        icon='image-plus'
                                        color={colors.darkerGrey}
                                        onPress={onSelectCoverImagePress}
                                        labelStyle={{ fontSize: 14 }}
                                    >
                                        Add Image
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        icon='image-edit'
                                        color={colors.darkerGrey}
                                        labelStyle={{ fontSize: 14 }}
                                        onPress={onSelectCoverImagePress}
                                    >
                                        Change
                                    </Button>
                                    <Button
                                        icon='image-remove'
                                        color={colors.red}
                                        labelStyle={{ fontSize: 14 }}
                                        onPress={onRemoveImagePress}
                                    >
                                        Remove
                                    </Button>
                                </>
                            )}
                        </View>
                        {image ? (
                            <Image
                                source={{
                                    uri: image.uri,
                                }}
                                style={styles.coverImagePreview}
                            />
                        ) : null}

                        <Divider style={styles.divider} />
                        <IconSubtitle icon='shape' text='Category' />
                        <View style={styles.subsection}>
                            <Picker
                                style={styles.categorySelector}
                                selectedValue={category}
                                onValueChange={(itemValue) =>
                                    setCategory(itemValue)
                                }
                                mode='dropdown'
                            >
                                {categories.map((category, index) => {
                                    return (
                                        <Picker.Item
                                            label={category}
                                            value={category}
                                            key={index}
                                        />
                                    );
                                })}
                            </Picker>
                        </View>

                        <IconSubtitle icon='tag' text='Tags' />
                        <View style={styles.subsection}>
                            <TagAdder tags={tags} setTags={setTags} />
                        </View>

                        <Divider
                            style={{
                                alignSelf: 'stretch',
                                margin: 10,
                            }}
                        />
                        <IconSubtitle icon='currency-usd' text='Goal' />
                        {stages.map((stage, index) => {
                            return (
                                <StageItemInput
                                    key={index}
                                    index={index}
                                    onModifyGoal={onModifyStageGoal}
                                    onModifyTitle={onModifyStageTitle}
                                    totalItems={stages.length}
                                    onDeleteStagePress={onDeleteStagePress}
                                    stage={stages[index]}
                                />
                            );
                        })}
                        <IconButton
                            icon='plus-circle-outline'
                            color={colors.darkGrey}
                            size={30}
                            onPress={onAddStagePress}
                        />

                        <Divider
                            style={{
                                alignSelf: 'stretch',
                                margin: 10,
                            }}
                        />
                        <IconSubtitle icon='calendar' text='Deadline' />
                        <View style={styles.subsection}>
                            <FundDeadlineSelector
                                date={date}
                                setDate={setDate}
                            />
                        </View>

                        <Divider style={styles.divider} />
                        <IconSubtitle icon='shield-account' text='Reviewers' />
                        <View style={{ ...styles.subsection, padding: 5 }}>
                            <ReviewerList
                                reviewers={reviewers}
                                setReviewers={setReviewers}
                                showStatus={props.route.params.edition}
                            />
                        </View>
                        {!props.route.params.edition ? (
                            <Button
                                style={styles.button}
                                onPress={onCreateButtonPress}
                                loading={creating}
                                color={colors.primary.light}
                                disabled={creating}
                                icon='lightbulb'
                                mode='contained'
                            >
                                <Text style={{ color: 'white' }}>Create</Text>
                            </Button>
                        ) : (
                            <>
                                <Button
                                    style={styles.publishButton}
                                    disabled={!isPublishable || publishing}
                                    loading={publishing}
                                    icon='send'
                                    color={colors.primary.light}
                                    onPress={onPublishButtonPress}
                                    mode='contained'
                                >
                                    <Text
                                        style={{
                                            color: 'white',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Publish
                                    </Text>
                                </Button>
                                <View style={styles.editButtonView}>
                                    <Button
                                        style={styles.confirmChangesButton}
                                        onPress={onConfirmChangesButtonPress}
                                        icon='content-save'
                                        color={colors.primary.light}
                                        mode='contained'
                                        disabled={saving}
                                        loading={saving}
                                    >
                                        <Text style={{ color: 'white' }}>
                                            Save
                                        </Text>
                                    </Button>
                                    <Button
                                        style={styles.deleteProjectButon}
                                        onPress={onDeleteButtonPress}
                                        icon='delete'
                                        color={colors.red}
                                        mode='contained'
                                        labelStyle={{ color: 'white' }}
                                        disabled={deleting}
                                        loading={deleting}
                                    >
                                        <Text style={{ color: 'white' }}>
                                            Delete
                                        </Text>
                                    </Button>
                                </View>
                            </>
                        )}
                    </View>
                )}
            </ScrollView>
            <Snackbar
                visible={statusBarVisible}
                onDismiss={() => {
                    setStatusBarVisible(false);
                }}
            >
                {statusBarText}
            </Snackbar>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    button: {
        justifyContent: 'center',
        height: 50,
        borderRadius: 6,
        margin: 32,
        alignSelf: 'stretch',
    },
    input: {
        alignSelf: 'stretch',
        flex: 1,
        marginHorizontal: 32,
        marginVertical: 10,
        marginTop: 0,
        backgroundColor: '#EEEEEE',
        fontWeight: '300',
    },
    descriptionInput: {
        alignSelf: 'stretch',
        marginHorizontal: 32,
        marginVertical: 10,
        marginTop: 0,
        backgroundColor: '#EEEEEE',
        fontWeight: '300',
    },
    inputText: {
        fontSize: 20,
        fontWeight: '200',
    },
    logo: {
        fontSize: 30,
        fontWeight: '300',
        margin: 32,
        color: colors.primary.light,
        alignSelf: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    titledSection: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        marginHorizontal: 32,
    },
    categoryText: {
        fontSize: 20,
        color: colors.primary.light,
    },
    categorySelectorDropdownSection: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.primary.light,
        borderRadius: 10,
        margin: 5,
    },
    categorySelector: {
        alignSelf: 'stretch',
        height: 50,
    },
    divider: {
        alignSelf: 'stretch',
        margin: 10,
        height: 1,
    },
    titlePrimary: {
        alignSelf: 'flex-start',
        marginLeft: 30,
        fontSize: 25,
        color: colors.primary.light,
    },
    titleSecondary: {
        alignSelf: 'flex-start',
        fontSize: 20,
        color: colors.primary.light,
    },
    subsection: {
        alignSelf: 'stretch',
        marginHorizontal: 32,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.darkGrey,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: colors.darkGrey,
        marginLeft: 10,
    },
    reviewerItemText: {
        color: colors.darkerGrey,
        fontSize: 16,
        marginVertical: 5,
    },
    editButtonView: {
        flexDirection: 'row',
        flex: 1,
        marginHorizontal: 36,
        marginBottom: 10,
    },
    confirmChangesButton: {
        justifyContent: 'center',
        height: 50,
        borderRadius: 6,
        alignSelf: 'stretch',
        marginRight: 5,
        flex: 1,
    },
    deleteProjectButon: {
        justifyContent: 'center',
        height: 50,
        borderRadius: 6,
        alignSelf: 'stretch',
    },
    publishButtonDisabled: {
        backgroundColor: colors.darkGrey,
        justifyContent: 'center',
        height: 50,
        borderRadius: 6,
        alignSelf: 'stretch',
        marginVertical: 10,
        marginHorizontal: 36,
    },
    publishButton: {
        justifyContent: 'center',
        height: 50,
        borderRadius: 6,
        alignSelf: 'stretch',
        marginVertical: 10,
        marginHorizontal: 36,
    },
    coverImagePreview: {
        alignSelf: 'center',
        flex: 1,
        width: 280,
        height: 168,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.darkGrey,
    },
});
