import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, TextInput, HelperText } from 'react-native-paper';

// Contexts
import { useTheme } from '../contexts/ThemeProvider';

// Hooks
import { useDispatch } from 'react-redux';

//Actions
import {
    updateLoginStatusAction,
    LoggingInFlowState,
} from '../actions/UpdateLoginStatusAction';

// Constants
import colors from '../constants/colors';
import { loginApi } from '../api/loginApi';

export default function SignInScreen(): React.ReactNode {
    const { isDarkTheme } = useTheme();
    const styles = React.useMemo(
        () => createThemedStyles(isDarkTheme),
        [isDarkTheme]
    );

    const [signUpData, setSignUpData] = React.useState({
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        confirmPassword: '',
    });

    const dispatch = useDispatch();

    const onLoginButtonClick = async () => {
        dispatch(
            updateLoginStatusAction(LoggingInFlowState.WaitingForAuthResponse)
        );
        const loginResult = await loginApi.logIn(
            loginData.username,
            loginData.password
        );
        console.log(loginResult.loginSuccessful);
        dispatch(
            updateLoginStatusAction(
                loginResult.loginSuccessful
                    ? LoggingInFlowState.LoggedIn
                    : LoggingInFlowState.CredentialsError
            )
        );
    };

    const passwordsMatch = () => {
        return signUpData.password === signUpData.confirmPassword;
    };
    const loginWasNotSuccesful = () => false;
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Register</Text>

            <TextInput
                style={styles.input}
                onChangeText={(text) => {
                    setSignUpData({
                        ...signUpData,
                        email: text,
                    });
                }}
                label="Email"
                theme={createThemedTextInputTheme(isDarkTheme)}
                error={false}
            />

            <TextInput
                style={styles.input}
                onChangeText={(text) => {
                    setSignUpData({
                        ...signUpData,
                        firstname: text,
                    });
                }}
                label="First name"
                theme={createThemedTextInputTheme(isDarkTheme)}
                error={loginWasNotSuccesful()}
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => {
                    setSignUpData({
                        ...signUpData,
                        lastname: text,
                    });
                }}
                label="Last name"
                theme={createThemedTextInputTheme(isDarkTheme)}
                error={loginWasNotSuccesful()}
            />
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                onChangeText={(text) => {
                    setSignUpData({
                        ...signUpData,
                        password: text,
                    });
                }}
                label="Password"
                theme={createThemedTextInputTheme(isDarkTheme)}
                error={!passwordsMatch()}
            />
            <View style={styles.inputWithHelperTextView}>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={(text) => {
                        setSignUpData({
                            ...signUpData,
                            confirmPassword: text,
                        });
                    }}
                    label="Confirm password"
                    theme={createThemedTextInputTheme(isDarkTheme)}
                    error={!passwordsMatch()}
                />
                <HelperText
                    type="error"
                    visible={!passwordsMatch()}
                    style={styles.helperText}
                >
                    Passwords do not mach.
                </HelperText>
            </View>
            <Button style={styles.button} onPress={onLoginButtonClick}>
                <Text style={{ color: 'white' }}>Create account</Text>
            </Button>
        </View>
    );
}

const createThemedStyles = (isDarkTheme: boolean) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDarkTheme ? colors.black : colors.white,
        },
        button: {
            backgroundColor: isDarkTheme
                ? colors.primary.dark
                : colors.primary.light,
            justifyContent: 'center',
            alignSelf: 'stretch',
            paddingVertical: 12,
            paddingHorizontal: 32,
            marginTop: 10,
            marginHorizontal: 32,
            borderRadius: 6,
        },
        input: {
            alignSelf: 'stretch',
            marginHorizontal: 32,
            marginTop: 20,
            backgroundColor: isDarkTheme ? colors.white : '#EEEEEE',
            fontWeight: '300',
        },
        inputWithHelperTextView: {
            alignSelf: 'stretch',
        },
        inputText: {
            fontSize: 20,
            fontWeight: '200',
        },
        logo: {
            fontSize: 40,
            fontWeight: '300',
            margin: 32,
            color: isDarkTheme ? colors.white : colors.black,
        },
        helperText: {
            marginHorizontal: 20,
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
