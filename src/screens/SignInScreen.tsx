import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, TextInput, DarkTheme } from 'react-native-paper';

// Contexts
import { useTheme } from '../contexts/ThemeProvider';

// Hooks
import { useDispatch, useSelector } from 'react-redux';

//Actions
import {
    updateLoginStatusAction,
    LoggingInFlowState,
} from '../actions/UpdateLoginStatusAction';

// Constants
import colors from '../constants/colors';

export default function SignInScreen(): React.ReactNode {
    const { isDarkTheme } = useTheme();
    const styles = React.useMemo(
        () => createThemedStyles(isDarkTheme),
        [isDarkTheme]
    );

    const [loginData, setLoginData] = React.useState({
        username: '',
        password: '',
    });

    const dispatch = useDispatch();

    const onLoginButtonClick = () => {
        console.log('Sending log in request. Data:', loginData);
        dispatch(
            updateLoginStatusAction(LoggingInFlowState.WaitingForAuthResponse)
        );
    };

    const loginState = useSelector((state) => state.login.loggedInState);
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>SeedyFiuba</Text>

            <TextInput
                style={styles.input}
                onChangeText={(text) => {
                    setLoginData({
                        ...loginData,
                        username: text,
                    });
                }}
                label="Username"
                theme={textInputTheme}
            />

            <TextInput
                style={styles.input}
                secureTextEntry={true}
                onChangeText={(text) => {
                    setLoginData({
                        ...loginData,
                        password: text,
                    });
                }}
                label="Password"
                theme={textInputTheme}
            />

            <Button
                style={styles.button}
                onPress={onLoginButtonClick}
                loading={
                    loginState === LoggingInFlowState.WaitingForAuthResponse
                }
                disabled={
                    loginState === LoggingInFlowState.WaitingForAuthResponse
                }
            >
                <Text style={{ color: 'white' }}>Entrar</Text>
            </Button>
            <Text style={styles.loginOptionSeparator}>or</Text>

            <Button style={styles.facebookLoginButton}>
                <Text style={{ color: 'white' }}>Sign in with Facebook</Text>
            </Button>

            <Button style={styles.googleLoginButton}>
                <Text style={{ color: 'grey' }}>Sign in with Google</Text>
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
        },

        // COPY PASTED FROM PROJECT
        button: {
            backgroundColor: colors.primary.dark,
            justifyContent: 'center',
            alignSelf: 'stretch',
            paddingVertical: 12,
            paddingHorizontal: 32,
            marginTop: 10,
            marginHorizontal: 32,
            borderRadius: 6,
        },
        facebookLoginButton: {
            backgroundColor: '#3b5998',
            justifyContent: 'center',
            alignSelf: 'stretch',
            paddingVertical: 12,
            paddingHorizontal: 32,
            marginTop: 10,
            marginHorizontal: 32,
            borderRadius: 6,
        },
        googleLoginButton: {
            backgroundColor: '#FFFFFF',
            justifyContent: 'center',
            alignSelf: 'stretch',
            paddingVertical: 12,
            paddingHorizontal: 32,
            marginTop: 10,
            marginHorizontal: 32,
            borderRadius: 6,
        },
        debug: {
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 64,
            color: colors.primary.dark,
        },
        input: {
            //borderWidth: 1,
            //borderColor: colors.primary.light,
            alignSelf: 'stretch',
            margin: 32,
            marginTop: 0,
            height: 64,
            //paddingHorizontal: 16,
            backgroundColor: colors.white,
            fontSize: 24,
            fontWeight: '300',
        },
        inputText: {
            fontSize: 20,
            fontWeight: '200',
        },
        logo: {
            fontSize: 40,
            fontWeight: '300',
            margin: 32,
            color: colors.white,
        },
        loginOptionSeparator: {
            fontSize: 20,
            fontWeight: '200',
            marginTop: 16,
            marginBottom: 16,
            color: colors.white,
        },
    });

    return styles;
};

const textInputTheme = {
    colors: {
        placeholder: colors.black,
        text: colors.black,
    },
};
