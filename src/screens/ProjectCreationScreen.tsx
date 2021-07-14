import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import {
    Text,
    TextInput,
    Button,
    Divider,
    Snackbar,
    Title,
    Avatar,
    ActivityIndicator,
} from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import colors from '../constants/colors';
import { DatePickerModal } from 'react-native-paper-dates';

//Components
import TagAdder from '../components/Project/TagAdder';
import FundDeadlineSelector from '../components/Project/FundDeadlineSelector';
import ReviewerList from '../components/Project/ReviewerList';

// Contexts
import { useTheme } from '../contexts/ThemeProvider';

// API
import {
    createProject,
    getProject,
    updateProject,
    deleteProject,
} from '../api/projectsApi';

// Hooks
import { useSelector } from 'react-redux';

// Types
import type { RootState } from '../reducers/index';
import { countries } from 'countries-list';
import { RootStackParamList } from '../types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useEffect } from 'react';

// Constants
import categories from '../constants/categories';

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

const IconSubtitle = (props: { icon: string; text: string }) => {
    const { isDarkTheme } = useTheme();
    const styles = React.useMemo(
        () => createThemedStyles(isDarkTheme),
        [isDarkTheme]
    );
    return (
        <View style={styles.labelTitleView}>
            <Avatar.Icon
                icon={props.icon}
                color={colors.darkGrey}
                style={styles.icon}
                size={35}
            />
            <Title style={styles.titleSecondary}>{props.text}</Title>
        </View>
    );
};

type Reviewer = {
    email: string;
    status: string;
};

export default function ProjectCreationScreen(
    props: Props
): React.ReactElement {
    const { isDarkTheme } = useTheme();
    const styles = React.useMemo(
        () => createThemedStyles(isDarkTheme),
        [isDarkTheme]
    );
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState<Array<string>>([]);
    const [date, setDate] = React.useState<Date>(new Date());
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [objective, setObjective] = React.useState('');
    const [goal, setGoal] = React.useState('');

    const [statusBarVisible, setStatusBarVisible] = useState(false);
    const [statusBarText, setStatusBarText] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [reviewers, setReviewers] = useState<Array<Reviewer>>([]);

    const [loading, setLoading] = useState(false);

    const [creating, setCreating] = useState(false);

    const onEditProjectLoad = async () => {
        setLoading(true);
        if (props.route.params.edition) {
            const projectResponse = await getProject(
                props.route.params.projectId
            );
            if (projectResponse.successful) {
                const project_temp = projectResponse.data;
                console.log(project_temp);
                setTitle(project_temp.title);
                setDescription(project_temp.description);
                setObjective(project_temp.objective);
                setDate(new Date(project_temp.finalizedBy));
                setCategory('productivity');
                setCity(project_temp.city);
                setCountry(project_temp.country);
                setTags(project_temp.tags);
                setReviewers(project_temp.reviewers);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        onEditProjectLoad();
    }, [props.route.params.edition]);

    const element = <TextInput.Affix text='ETH' />;
    const onCreateButtonPress = async () => {
        setCreating(true);
        const projectCreationResponse = await createProject(
            title,
            description,
            category,
            objective,
            country,
            city,
            date.toJSON(),
            tags,
            reviewers.map((reviewer, index) => reviewer.email)
        );
        if (projectCreationResponse.successful) {
            setCreating(false);
            props.navigation.replace('MyProjects', {
                showNotification: 'Project created successfully!',
                projectId: projectCreationResponse.data.id,
            });
        }
    };

    const onConfirmChangesButtonPress = async () => {
        if (props.route.params.edition) {
            const result = await updateProject(
                props.route.params.projectId,
                title,
                description,
                category,
                objective,
                country,
                city,
                date.toJSON(),
                tags,
                reviewers
                    .filter((reviewer, index) => reviewer.status === 'PENDING')
                    .map((reviewer, index) => reviewer.email)
            );
            if (result.successful) {
                setStatusBarText('Project modified successfully!');
                setStatusBarVisible(true);
            }
        }
    };

    const onDeleteButtonPress = async () => {
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
    };

    const isPublishable = reviewers.some(
        (reviewer, index) => reviewer.status === 'ACCEPTED'
    );
    return (
        <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.container}
        >
            {loading ? (
                <ActivityIndicator size='large' animating={true} />
            ) : (
                <>
                    <Title style={styles.titlePrimary}>Project Title</Title>
                    <TextInput
                        style={styles.input}
                        theme={createThemedTextInputTheme(isDarkTheme)}
                        onChangeText={(newTitle) => setTitle(newTitle)}
                        value={title}
                        mode='outlined'
                        placeholder='Give your project a name'
                    />
                    <IconSubtitle icon='bullseye-arrow' text='Objective' />
                    <TextInput
                        style={styles.descriptionInput}
                        theme={createThemedTextInputTheme(isDarkTheme)}
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
                        theme={createThemedTextInputTheme(isDarkTheme)}
                        multiline={true}
                        onChangeText={(newDescription) =>
                            setDescription(newDescription)
                        }
                        mode='outlined'
                        placeholder='Give a more detailed description of your project'
                        numberOfLines={10}
                        value={description}
                    />

                    <Divider style={styles.divider} />
                    <IconSubtitle icon='shape' text='Category' />
                    <View style={styles.subsection}>
                        <Picker
                            style={styles.categorySelector}
                            selectedValue={category}
                            onValueChange={(itemValue, itemIndex) =>
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
                    <TextInput
                        style={{
                            ...styles.input,
                            backgroundColor: 'transparent',
                        }}
                        theme={createThemedTextInputTheme(isDarkTheme)}
                        mode='outlined'
                        keyboardType='numeric'
                        onChangeText={(newGoal) => setGoal(newGoal)}
                        right={element}
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
                            onValueChange={(itemValue, itemIndex) =>
                                setCountry(itemValue)
                            }
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
                            color='white'
                            disabled={creating}
                            icon='lightbulb'
                        >
                            <Text style={{ color: 'white' }}>Create</Text>
                        </Button>
                    ) : (
                        <>
                            <Button
                                style={
                                    isPublishable
                                        ? styles.publishButton
                                        : styles.publishButtonDisabled
                                }
                                disabled={!isPublishable}
                                icon='send'
                                color='white'
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
                                    color='white'
                                >
                                    <Text style={{ color: 'white' }}>
                                        Save
                                    </Text>
                                </Button>
                                <Button
                                    style={styles.deleteProjectButon}
                                    onPress={onDeleteButtonPress}
                                    icon='delete'
                                    color='white'
                                >
                                    <Text style={{ color: 'white' }}>
                                        Delete
                                    </Text>
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
                </>
            )}
        </ScrollView>
    );
}

const createThemedStyles = (isDarkTheme: boolean) => {
    const styles = StyleSheet.create({
        container: {
            margin: 10,
            paddingVertical: 10,
            alignItems: 'center',
            backgroundColor: isDarkTheme ? colors.black : colors.white,
        },
        button: {
            backgroundColor: isDarkTheme
                ? colors.primary.dark
                : colors.primary.light,
            justifyContent: 'center',
            height: 50,
            borderRadius: 6,
            margin: 32,
            alignSelf: 'stretch',
        },
        input: {
            alignSelf: 'stretch',
            marginHorizontal: 32,
            marginVertical: 10,
            marginTop: 0,
            backgroundColor: isDarkTheme ? colors.white : '#EEEEEE',
            fontWeight: '300',
        },
        descriptionInput: {
            alignSelf: 'stretch',
            marginHorizontal: 32,
            marginVertical: 10,
            marginTop: 0,
            backgroundColor: isDarkTheme ? colors.white : '#EEEEEE',
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
            color: colors.darkerGrey,
        },
        titleSecondary: {
            alignSelf: 'flex-start',
            fontSize: 20,
            color: colors.grey,
        },
        icon: {
            backgroundColor: 'transparent',
        },
        labelTitleView: {
            flexDirection: 'row',
            marginLeft: 30,
            alignSelf: 'flex-start',
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
            backgroundColor: colors.primary.light,
            justifyContent: 'center',
            height: 50,
            borderRadius: 6,
            alignSelf: 'stretch',
            marginRight: 5,
            flex: 1,
        },
        deleteProjectButon: {
            backgroundColor: colors.red,
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
            backgroundColor: colors.primary.darkerLight,
            justifyContent: 'center',
            height: 50,
            borderRadius: 6,
            alignSelf: 'stretch',
            marginVertical: 10,
            marginHorizontal: 36,
        },
    });
    return styles;
};

const createThemedTextInputTheme = (isDarkTheme: boolean) => {
    const theme = {
        colors: {
            placeholder: colors.grey,
            primary: isDarkTheme ? colors.primary.dark : colors.primary.light,
            text: colors.black,
        },
    };
    return theme;
};
