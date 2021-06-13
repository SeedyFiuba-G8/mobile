import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
    Menu,
    Text,
    TextInput,
    Button,
    Paragraph,
    Dialog,
    Portal,
    Checkbox,
} from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import colors from '../constants/colors';
// Contexts
import { useTheme } from '../contexts/ThemeProvider';

export default function SettingsScreen(): React.ReactElement {
    const { isDarkTheme } = useTheme();
    const styles = React.useMemo(
        () => createThemedStyles(isDarkTheme),
        [isDarkTheme]
    );
    const [selectedLanguage, setSelectedLanguage] = useState();
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>New Project</Text>

            <TextInput
                style={styles.input}
                label='Title'
                theme={createThemedTextInputTheme(isDarkTheme)}
            />
            <TextInput
                style={styles.descriptionInput}
                label='Description'
                theme={createThemedTextInputTheme(isDarkTheme)}
                multiline={true}
            />

            <View style={styles.categorySelectorSection}>
                <View
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                >
                    <Text style={styles.categoryText}>Category</Text>
                </View>
                <View style={styles.categorySelectorDropdownSection}>
                    <Picker
                        style={styles.categorySelector}
                        selectedValue={selectedLanguage}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedLanguage(itemValue)
                        }
                        mode='dropdown'
                        dropdownIconColor={colors.primary.light}
                    >
                        <Picker.Item label='Entretainment' value='java' />
                        <Picker.Item label='Productivity' value='js' />
                    </Picker>
                </View>
            </View>
            <Button style={styles.button}>
                <Text style={{ color: 'white' }}>Create</Text>
            </Button>
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
            position: 'absolute',
            bottom: 10,
            width: '80%',
            margin: 10,
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
        },
        categorySelectorSection: {
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
