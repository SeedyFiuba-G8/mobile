import * as React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import {
    Text,
    Button,
    TextInput,
    HelperText,
    Snackbar,
} from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { DeviceEventEmitter } from 'react-native';

// Contexts
import { useTheme } from '../contexts/ThemeProvider';

// Hooks
import { useSelector, useDispatch } from 'react-redux';

//Actions
import {
    LoggingInFlowState,
    updateLoginStatusAction,
} from '../actions/UpdateLoginStatusAction';

// Constants
import colors from '../constants/colors';

// Types
import { AuthStackParamList } from '../types';
import type { RootState } from '../reducers/index';

// Facebook
import * as Facebook from 'expo-facebook';
import { createSession, createSessionFacebook } from '../api/sessionApi';
import { persistSessionData } from '../session/SessionUtil';
import { updateSessionCredentialsAction } from '../actions/UpdateSessionCredentialsAction';
import { getProfile } from '../api/profileApi';
import { updateNameAction } from '../actions/UpdateNameAction';
import { updateBalanceAction } from '../actions/UpdateBalanceAction';
import { updateWalletAddressAction } from '../actions/UpdateWalletAddressAction';
import { RouteProp } from '@react-navigation/native';
import { useEffect, useState } from 'react';

type SignInScreenNavigationProp = StackNavigationProp<
    AuthStackParamList,
    'SignIn'
>;

type SignInScreenRouteProp = RouteProp<AuthStackParamList, 'SignIn'>;

type Props = {
    navigation: SignInScreenNavigationProp;
    route: SignInScreenRouteProp;
};

export default function SignInScreen(props: Props): React.ReactElement {
    const [loginData, setLoginData] = React.useState({
        email: '',
        password: '',
    });

    const [snackbarVisible, setSnackbarVisible] = useState(false);

    const updateProfileInfo = async (userId: string) => {
        const profileResponse = await getProfile(userId);
        if (profileResponse.successful) {
            dispatch(
                updateNameAction(
                    profileResponse.data.firstName,
                    profileResponse.data.lastName,
                    profileResponse.data.profilePicUrl
                )
            );
            if (profileResponse.data.balance !== undefined) {
                dispatch(updateBalanceAction(profileResponse.data.balance));
            }
            if (profileResponse.data.address !== undefined) {
                dispatch(
                    updateWalletAddressAction(profileResponse.data.address)
                );
            }
        }
    };

    useEffect(() => {
        if (props.route.params.email !== undefined) {
            setLoginData({ ...loginData, email: props.route.params.email });
        }
        if (props.route.params.justRegistered) {
            setSnackbarVisible(true);
        }
    }, [props.route.params]);

    const expoToken = useSelector(
        (state: RootState) => state.expoToken.expoToken
    );

    const dispatch = useDispatch();
    const loginFunction = async (email: string, password: string) => {
        dispatch(
            updateLoginStatusAction(LoggingInFlowState.WaitingForAuthResponse)
        );
        const loginResult = await createSession(email, password, expoToken);

        if (loginResult.successful) {
            persistSessionData(loginResult.data.id, loginResult.data.token);
            dispatch(
                updateSessionCredentialsAction(
                    loginResult.data.id,
                    loginResult.data.token
                )
            );
            await updateProfileInfo(loginResult.data.id);
            dispatch(updateLoginStatusAction(LoggingInFlowState.LoggedIn));
            return;
        }
        dispatch(updateLoginStatusAction(LoggingInFlowState.CredentialsError));
    };

    const loginFunctionFacebook = async (fbToken: string) => {
        dispatch(
            updateLoginStatusAction(LoggingInFlowState.WaitingForAuthResponse)
        );
        const loginResult = await createSessionFacebook(fbToken, expoToken);

        if (loginResult.successful) {
            persistSessionData(loginResult.data.id, loginResult.data.token);
            dispatch(
                updateSessionCredentialsAction(
                    loginResult.data.id,
                    loginResult.data.token
                )
            );
            await updateProfileInfo(loginResult.data.id);
            dispatch(updateLoginStatusAction(LoggingInFlowState.LoggedIn));
            return;
        }
        dispatch(updateLoginStatusAction(LoggingInFlowState.CredentialsError));
    };
    const onLoginButtonClick = async () => {
        loginFunction(loginData.email, loginData.password);
    };

    const onLoginWithFacebookButtonClick = async () => {
        await Facebook.initializeAsync({
            appId: '513914706402789',
            appName: 'SeedyFiubaG8',
        });
        try {
            const loginResult = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile', 'email'],
            });
            if (loginResult.type == 'success') {
                const { token } = loginResult;
                loginFunctionFacebook(token);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const onCreateNewAccountClick = () => {
        props.navigation.navigate('SignUp');
    };

    const loginState = useSelector(
        (state: RootState) => state.login.loggedInState
    );
    const loginWasNotSuccesful = () => {
        return loginState === LoggingInFlowState.CredentialsError;
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/splash2.png')}
                style={{ width: 200, height: 200 }}
            />

            <TextInput
                style={styles.input}
                onChangeText={(text) => {
                    setLoginData({
                        ...loginData,
                        email: text,
                    });
                }}
                label='Email'
                mode='outlined'
                error={loginWasNotSuccesful()}
            />

            <TextInput
                style={styles.input}
                mode='outlined'
                secureTextEntry={true}
                onChangeText={(text) => {
                    setLoginData({
                        ...loginData,
                        password: text,
                    });
                }}
                label='Password'
                error={loginWasNotSuccesful()}
            />
            <HelperText type='error' visible={loginWasNotSuccesful()}>
                Invalid email or password.
            </HelperText>
            <Button
                mode='contained'
                color={colors.primary.light}
                style={styles.button}
                onPress={onLoginButtonClick}
                loading={
                    loginState === LoggingInFlowState.WaitingForAuthResponse
                }
                disabled={
                    loginState === LoggingInFlowState.WaitingForAuthResponse
                }
            >
                <Text style={{ color: 'white' }}>Sign In</Text>
            </Button>
            <Text style={styles.loginOptionSeparator}>or</Text>

            <Button
                style={styles.button}
                color={colors.primary.light}
                mode='contained'
                onPress={onCreateNewAccountClick}
            >
                <Text style={{ color: 'white' }}>Create new account</Text>
            </Button>
            <Button
                color='#3b5998'
                mode='contained'
                style={styles.facebookLoginButton}
                onPress={onLoginWithFacebookButtonClick}
            >
                <Text style={{ color: 'white' }}>Sign in with Facebook</Text>
            </Button>
            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={2000}
            >
                Registered successfully!
            </Snackbar>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
    },
    button: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        height: 50,
        marginHorizontal: 32,
        borderRadius: 6,
    },
    facebookLoginButton: {
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
        backgroundColor: '#EEEEEE',
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
        color: colors.black,
    },
    loginOptionSeparator: {
        fontSize: 20,
        fontWeight: '200',
        marginTop: 16,
        marginBottom: 16,
        color: colors.black,
    },
});
