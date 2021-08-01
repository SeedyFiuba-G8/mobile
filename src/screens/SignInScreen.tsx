import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { Snackbar } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
// Constants
import colors from '../constants/colors';

// Types
import { AuthStackParamList } from '../types';

// Facebook
import { RouteProp } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import SignInScreenLogoHeader from '../components/SingIn/SignInScreenLogoHeader';
import SignInScreenUserInputSection from '../components/SingIn/SignInScreenUserInputSection';

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
    const [snackbarVisible, setSnackbarVisible] = useState(false);

    useEffect(() => {
        if (props.route.params.justRegistered) {
            setSnackbarVisible(true);
        }
    }, [props.route.params]);

    const onCreateNewAccountPress = () => {
        props.navigation.navigate('SignUp');
    };

    return (
        <View style={styles.container}>
            <SignInScreenLogoHeader />
            <SignInScreenUserInputSection
                onCreateNewAccountPress={onCreateNewAccountPress}
            />
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
});
