import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, TextInput, HelperText } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { DeviceEventEmitter } from 'react-native';

// Contexts
import { useTheme } from '../contexts/ThemeProvider';

// Hooks
import { useSelector } from 'react-redux';

//Actions
import { LoggingInFlowState } from '../actions/UpdateLoginStatusAction';

// Constants
import colors from '../constants/colors';

// Types
import { AuthStackParamList } from '../types';

// Facebook
import * as Facebook from 'expo-facebook';

type SignInScreenNavigationProp = StackNavigationProp<
    AuthStackParamList,
    'SignIn'
>;

type SignInScreenRouteProp = RouteProp<AuthStackParamList, 'SignIn'>;

type Props = {
    navigation: SignInScreenNavigationProp;
    route: SignInScreenRouteProp;
};

export default function SignInScreen(props: Props): React.ReactNode {
    const { isDarkTheme } = useTheme();
    const styles = React.useMemo(
        () => createThemedStyles(isDarkTheme),
        [isDarkTheme]
    );

    const [loginData, setLoginData] = React.useState({
        email: '',
        password: '',
    });

    const onLoginButtonClick = async () => {
        DeviceEventEmitter.emit('login', loginData.email, loginData.password);
    };

    const onLoginWithFacebookButtonClick = async () => {
        await Facebook.initializeAsync({
            appId: '513914706402789',
            appName: 'SeedyFiubaG8',
        });
        try {
            const { token } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile', 'email'],
            });
            DeviceEventEmitter.emit('loginFacebook', token);
        } catch (e) {
            console.log(e);
        }
    };

    const onCreateNewAccountClick = () => {
        props.navigation.navigate('SignUp');
    };

    const loginState = useSelector((state) => state.login.loggedInState);
    const loginWasNotSuccesful = () => {
        return loginState === LoggingInFlowState.CredentialsError;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>SeedyFiuba</Text>

            <TextInput
                style={styles.input}
                onChangeText={(text) => {
                    setLoginData({
                        ...loginData,
                        email: text,
                    });
                }}
                label="Email"
                theme={createThemedTextInputTheme(isDarkTheme)}
                error={loginWasNotSuccesful()}
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
                theme={createThemedTextInputTheme(isDarkTheme)}
                error={loginWasNotSuccesful()}
            />
            <HelperText type="error" visible={loginWasNotSuccesful()}>
                Invalid email or password.
            </HelperText>
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
                <Text style={{ color: 'white' }}>Sign in</Text>
            </Button>
            <Text style={styles.loginOptionSeparator}>or</Text>

            <Button style={styles.button} onPress={onCreateNewAccountClick}>
                <Text style={{ color: 'white' }}>Create new account</Text>
            </Button>
            <Button
                style={styles.facebookLoginButton}
                onPress={onLoginWithFacebookButtonClick}
            >
                <Text style={{ color: 'white' }}>Sign in with Facebook</Text>
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
            height: 50,
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
            height: 50,
            borderRadius: 6,
        },
        debug: {
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 64,
            color: colors.primary.dark,
        },
        input: {
            alignSelf: 'stretch',
            margin: 32,
            marginTop: 0,
            backgroundColor: isDarkTheme ? colors.white : '#EEEEEE',
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
            color: isDarkTheme ? colors.white : colors.black,
        },
        loginOptionSeparator: {
            fontSize: 20,
            fontWeight: '200',
            marginTop: 16,
            marginBottom: 16,
            color: isDarkTheme ? colors.white : colors.black,
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
