import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, TextInput, Button, Divider, Snackbar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import colors from '../constants/colors';
import { DatePickerModal } from 'react-native-paper-dates';

//Components
import TagAdder from '../components/Project/TagAdder';
import FundDeadlineSelector from '../components/Project/FundDeadlineSelector';

// Contexts
import { useTheme } from '../contexts/ThemeProvider';

// API
import { createProject } from '../api/projectsApi';

// Hooks
import { useSelector } from 'react-redux';

// Types
import type { RootState } from '../reducers/index';

export default function SettingsScreen(): React.ReactElement {
    const { isDarkTheme } = useTheme();
    const styles = React.useMemo(
        () => createThemedStyles(isDarkTheme),
        [isDarkTheme]
    );
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState<Array<string>>([]);
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [goal, setGoal] = React.useState('');
    const authToken = useSelector((state: RootState) => state.session.token);

    const [statusBarVisible, setStatusBarVisible] = useState(false);
    const [statusBarText, setStatusBarText] = useState('');

    const onCreateButtonPress = async () => {
        if (date !== undefined) {
            const projectResult = await createProject(
                title,
                description,
                category,
                'Objetivo',
                'Argentina',
                'Buenos Aires',
                date.toString(),
                authToken
            );
            if (projectResult.successful) {
                console.log(
                    `Success creating project with id ${projectResult.id}`
                );
                setStatusBarText('Project created successfully!');
                setStatusBarVisible(true);
            }
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.logo}>Tell us about your project!</Text>

                <TextInput
                    style={styles.input}
                    label='Title'
                    theme={createThemedTextInputTheme(isDarkTheme)}
                    mode='outlined'
                    onChangeText={(newTitle) => setTitle(newTitle)}
                />
                <TextInput
                    style={styles.descriptionInput}
                    label='Description'
                    theme={createThemedTextInputTheme(isDarkTheme)}
                    multiline={true}
                    onChangeText={(newDescription) =>
                        setDescription(newDescription)
                    }
                />

                <Divider style={styles.divider} />

                <View style={styles.titledSection}>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={styles.categoryText}>Category</Text>
                    </View>
                    <View style={styles.categorySelectorDropdownSection}>
                        <Picker
                            style={styles.categorySelector}
                            selectedValue={category}
                            onValueChange={(itemValue, itemIndex) =>
                                setCategory(itemValue)
                            }
                            mode='dropdown'
                            dropdownIconColor={colors.primary.light}
                        >
                            <Picker.Item
                                label='Entretainment'
                                value='entretainment'
                            />
                            <Picker.Item
                                label='Productivity'
                                value='productivity'
                            />
                            <Picker.Item label='Other' value='other' />
                        </Picker>
                    </View>
                </View>

                <View style={styles.titledSection}>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={styles.categoryText}>Tags</Text>
                    </View>
                    <View style={styles.categorySelectorDropdownSection}>
                        <TagAdder tags={tags} setTags={setTags} />
                    </View>
                </View>

                <Divider style={styles.divider} />

                <TextInput
                    style={styles.input}
                    label='Fund goal (ETH)'
                    theme={createThemedTextInputTheme(isDarkTheme)}
                    mode='outlined'
                    keyboardType='numeric'
                    onChangeText={(newGoal) => setGoal(newGoal)}
                />

                <View style={styles.titledSection}>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={styles.categoryText}>Fund by</Text>
                    </View>
                    <View style={styles.categorySelectorDropdownSection}>
                        <FundDeadlineSelector date={date} setDate={setDate} />
                    </View>
                </View>
                <Button style={styles.button} onPress={onCreateButtonPress}>
                    <Text style={{ color: 'white' }}>Create</Text>
                </Button>
            </ScrollView>
            <Snackbar
                visible={statusBarVisible}
                onDismiss={() => setStatusBarVisible(false)}
            >
                {statusBarText}
            </Snackbar>
        </View>
    );
}

const createThemedStyles = (isDarkTheme: boolean) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
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
            height: 200,
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
            marginHorizontal: 32,
            marginVertical: 20,
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
