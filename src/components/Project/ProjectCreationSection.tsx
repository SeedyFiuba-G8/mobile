import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import {
    Button,
    Divider,
    IconButton,
    TextInput,
    Title,
    Text,
    Snackbar,
} from 'react-native-paper';
import IconSubtitle from './IconSubtitle';
import { Picker } from '@react-native-picker/picker';
import TagAdder from './TagAdder';
import FundDeadlineSelector from './FundDeadlineSelector';
import ReviewerList from './ReviewerList';
import { loadUserImage, loadUserImageResult } from '../../util/image-util';
import firebase from 'firebase';
import 'firebase/storage';
import firebaseConfig from '../../firebase/config';
import categories from '../../constants/categories';
import StageItemInput from './StageItemInput';
import { countries } from 'countries-list';
import { createProject, getProject } from '../../api/projectsApi';
import uuid from 'react-native-uuid';

type Reviewer = {
    email: string;
    status: string;
};
type Stage = {
    description: string;
    cost: string;
};

type Props = {
    projectId: string;
    edition: boolean;
};

export default function ProjectCreationSection(
    props: Props
): React.ReactElement {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }

    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState<Array<string>>([]);
    const [date, setDate] = React.useState<Date>(new Date());
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [objective, setObjective] = React.useState('');
    const [stages, setStages] = React.useState<Array<Stage>>([
        { description: '', cost: '' },
    ]);
    const [image, setImage] = useState<loadUserImageResult>();
    const [creating, setCreating] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [publishing, setPublishing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        onEditProjectLoad();
    }, [props.edition]);

    const onEditProjectLoad = async () => {
        setLoading(true);
        if (props.edition) {
            const projectResponse = await getProject(props.projectId);
            if (projectResponse.successful) {
                const project_temp = projectResponse.data;
                setTitle(project_temp.title);
                setDescription(project_temp.description);
                setObjective(project_temp.objective);
                setDate(new Date(project_temp.finalizedBy));
                setCategory(project_temp.type);
                setCity(project_temp.city);
                setCountry(project_temp.country);
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

    const onDeleteStagePress = (delete_index: number) => {
        const stage_modified = stages.filter((stage, index) => {
            return index !== delete_index;
        });
        setStages(stage_modified);
    };

    const onAddStagePress = () => {
        const stage_modified = [...stages, { description: '', cost: '' }];
        setStages(stage_modified);
    };

    const [reviewers, setReviewers] = useState<Array<Reviewer>>([]);

    const onCreateButtonPress = async () => {
        setCreating(true);
        const coverImageURL = await uploadImage();
        const projectCreationResponse = await createProject(
            title,
            description,
            category,
            objective,
            country,
            city,
            date.toJSON(),
            tags,
            reviewers.map((reviewer) => reviewer.email),
            stages.map((stage) => {
                return {
                    cost: parseFloat(stage.cost),
                    description: stage.description,
                };
            }),
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
        if (props.edition) {
            const result = await updateProject(
                props.projectId,
                title,
                description,
                category,
                objective,
                country,
                city,
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
    return (
        <View style={{ alignSelf: 'stretch', alignItems: 'center' }}>
            <Title style={styles.titlePrimary}>Project Title</Title>
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
                onChangeText={(newObjective) => setObjective(newObjective)}
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
                    onValueChange={(itemValue) => setCategory(itemValue)}
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
                <FundDeadlineSelector date={date} setDate={setDate} />
            </View>

            <Divider style={styles.divider} />
            <IconSubtitle icon='map-marker' text='Location' />
            <View style={styles.subsection}>
                <Text style={styles.subtitle}>Country</Text>
                <Picker
                    style={styles.categorySelector}
                    selectedValue={country}
                    onValueChange={(itemValue) => setCountry(itemValue)}
                    mode='dropdown'
                    dropdownIconColor={colors.primary.light}
                >
                    {Object.values(countries)
                        .sort((a, b) => (a.name > b.name ? 1 : -1))
                        .map((country, index) => {
                            return (
                                <Picker.Item
                                    label={country.name}
                                    value={country.name}
                                    key={index}
                                />
                            );
                        })}
                </Picker>
            </View>

            <TextInput
                style={styles.input}
                label='City'
                mode='outlined'
                onChangeText={(city) => setCity(city)}
                value={city}
            />
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
                            <Text style={{ color: 'white' }}>Save</Text>
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
                            <Text style={{ color: 'white' }}>Delete</Text>
                        </Button>
                    </View>
                </>
            )}
            <Snackbar
                visible={statusBarVisible}
                onDismiss={() => {
                    setStatusBarVisible(false);
                }}
            >
                {statusBarText}
            </Snackbar>
        </View>
    );
}
