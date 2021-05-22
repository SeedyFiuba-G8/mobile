import * as React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';

// Contexts
import { useTheme } from '../contexts/ThemeProvider';

// Hooks
import { useDispatch, useSelector } from 'react-redux';

//Actions
import { updateLoginStatusAction } from '../actions/UpdateLoginStatusAction';
import { LoggingInFlowState } from '../reducers/LoginReducer';

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
            updateLoginStatusAction({
                username: loginData.username,
                password: loginData.password,
            })
        );
    };

    const loginState = useSelector((state) => state.login.loggedInState);
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>¡Log In!</Text>

            <TextInput
                style={styles.input}
                onChangeText={(text) => {
                    setLoginData({
                        ...loginData,
                        username: text,
                    });
                }}
                mode="outlined"
                label="Username"
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
                mode="outlined"
                label="Password"
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

            <View style={styles.debug}>
                <Text style={{ fontStyle: 'italic', marginBottom: 12 }}>
                    Debug
                </Text>
                <Text style={{ fontWeight: 'bold' }}>Nombre de usuario:</Text>
                <Text>{loginData.username}</Text>
                <Text style={{ fontWeight: 'bold' }}>Contraseña:</Text>
                <Text>{loginData.password}</Text>
            </View>
        </View>
    );
}

const createThemedStyles = (isDarkTheme: boolean) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.white,
            alignItems: 'center',
            justifyContent: 'center',
        },

        // COPY PASTED FROM PROJECT
        button: {
            backgroundColor: colors.primary.light,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'stretch',
            paddingVertical: 12,
            paddingHorizontal: 32,
            marginTop: 32,
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
            fontSize: 24,
            fontWeight: '300',
        },
        inputText: {
            fontSize: 20,
            fontWeight: '200',
        },
        logo: {
            fontSize: 24,
            fontWeight: '300',
            margin: 32,
        },
    });

    return styles;
};
