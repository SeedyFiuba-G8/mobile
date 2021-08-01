import React from 'react';
import { TextInput, Button, HelperText, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';

import {
    LoggingInFlowState,
    updateLoginStatusAction,
} from '../../actions/UpdateLoginStatusAction';
import { updateSessionCredentialsAction } from '../../actions/UpdateSessionCredentialsAction';
import { createSession, createSessionFacebook } from '../../api/sessionApi';
import colors from '../../constants/colors';
import { RootState } from '../../reducers';
import {
    persistSessionData,
    updateProfileInfo,
} from '../../session/SessionUtil';
import { sanitizeEmail } from '../../util/inputUtil';

import * as Facebook from 'expo-facebook';

type Props = {
    onCreateNewAccountPress: () => void;
};

export default function SignInScreenUserInputSection(
    props: Props
): React.ReactElement {
    const loginState = useSelector(
        (state: RootState) => state.login.loggedInState
    );
    const [loginData, setLoginData] = React.useState({
        email: '',
        password: '',
    });

    const loginWasNotSuccesful = () => {
        return loginState === LoggingInFlowState.CredentialsError;
    };

    const dispatch = useDispatch();
    const expoToken = useSelector(
        (state: RootState) => state.expoToken.expoToken
    );

    const onLoginButtonPress = async (email: string, password: string) => {
        dispatch(
            updateLoginStatusAction(LoggingInFlowState.WaitingForAuthResponse)
        );
        const loginResult = await createSession(
            sanitizeEmail(email),
            password,
            expoToken
        );

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

    const onLoginWithFacebookPress = async () => {
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

    return (
        <View
            style={{
                alignSelf: 'stretch',
                alignItems: 'center',
            }}
        >
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
                keyboardType='email-address'
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
                onPress={() =>
                    onLoginButtonPress(loginData.email, loginData.password)
                }
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
                onPress={props.onCreateNewAccountPress}
            >
                <Text style={{ color: 'white' }}>Create new account</Text>
            </Button>
            <Button
                color='#3b5998'
                mode='contained'
                style={styles.facebookLoginButton}
                onPress={onLoginWithFacebookPress}
            >
                <Text style={{ color: 'white' }}>Sign in with Facebook</Text>
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
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
    loginOptionSeparator: {
        fontSize: 20,
        fontWeight: '200',
        marginTop: 16,
        marginBottom: 16,
        color: colors.black,
    },
});
