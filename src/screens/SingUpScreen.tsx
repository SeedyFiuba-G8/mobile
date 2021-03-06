import * as React from 'react';

import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Button, TextInput, HelperText } from 'react-native-paper';
import { register } from '../api/registerApi';

// Constants
import colors from '../constants/colors';
import { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../types';
import { sanitizeEmail } from '../util/inputUtil';

type SignUpScreenNavigationProp = StackNavigationProp<
    AuthStackParamList,
    'SignUp'
>;

type Props = {
    navigation: SignUpScreenNavigationProp;
};

export default function SignInScreen(props: Props): React.ReactElement {
    const [signUpData, setSignUpData] = React.useState({
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        confirmPassword: '',
    });

    const [emailAlreadyUsed, setEmailAlreadyUsed] = React.useState(false);

    const [creatingAccount, setCreatingAccount] = useState(false);
    const onSignUpButtonClick = async () => {
        setEmailAlreadyUsed(false);
        setCreatingAccount(true);
        const registerResult = await register(
            sanitizeEmail(signUpData.email),
            signUpData.password,
            signUpData.firstname,
            signUpData.lastname
        );
        setCreatingAccount(false);
        if (registerResult.successful) {
            props.navigation.navigate('SignIn', {
                email: signUpData.email,
                justRegistered: true,
            });
        } else {
            console.log('Error en el registro.');
            setEmailAlreadyUsed(true);
        }
    };

    const passwordsMatch = () => {
        return signUpData.password === signUpData.confirmPassword;
    };

    const loginWasNotSuccesful = () => false;
    return (
        <ScrollView
            style={{ alignSelf: 'stretch' }}
            contentContainerStyle={styles.container}
        >
            <Text style={styles.logo}>Register</Text>

            <View style={styles.inputWithHelperTextView}>
                <TextInput
                    mode='outlined'
                    style={styles.input}
                    onChangeText={(text) => {
                        setSignUpData({
                            ...signUpData,
                            email: text,
                        });
                    }}
                    label='Email'
                    error={emailAlreadyUsed}
                    keyboardType='email-address'
                />

                <HelperText
                    type='error'
                    visible={emailAlreadyUsed}
                    style={styles.helperText}
                >
                    Email already in use.
                </HelperText>
            </View>
            <TextInput
                mode='outlined'
                style={styles.input}
                onChangeText={(text) => {
                    setSignUpData({
                        ...signUpData,
                        firstname: text,
                    });
                }}
                label='First name'
                error={loginWasNotSuccesful()}
            />
            <TextInput
                mode='outlined'
                style={styles.input}
                onChangeText={(text) => {
                    setSignUpData({
                        ...signUpData,
                        lastname: text,
                    });
                }}
                label='Last name'
                error={loginWasNotSuccesful()}
            />
            <TextInput
                mode='outlined'
                style={styles.input}
                secureTextEntry={true}
                onChangeText={(text) => {
                    setSignUpData({
                        ...signUpData,
                        password: text,
                    });
                }}
                label='Password'
                error={!passwordsMatch()}
            />
            <View style={styles.inputWithHelperTextView}>
                <TextInput
                    mode='outlined'
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={(text) => {
                        setSignUpData({
                            ...signUpData,
                            confirmPassword: text,
                        });
                    }}
                    label='Confirm password'
                    error={!passwordsMatch()}
                />
                <HelperText
                    type='error'
                    visible={!passwordsMatch()}
                    style={styles.helperText}
                >
                    Passwords do not mach.
                </HelperText>
            </View>
            <Button
                style={styles.button}
                onPress={onSignUpButtonClick}
                color={colors.primary.light}
                mode='contained'
                loading={creatingAccount}
                disabled={creatingAccount}
            >
                <Text style={{ color: 'white' }}>Create account</Text>
            </Button>
        </ScrollView>
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
        backgroundColor: '#EEEEEE',
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
        color: colors.black,
    },
    helperText: {
        marginHorizontal: 20,
    },
});
