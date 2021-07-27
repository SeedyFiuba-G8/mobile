import React from 'react';

// Hooks
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// Providers
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

// Wrappers
import Navigation from './src/navigation';

// Reducers
import rootReducer from './src/reducers';
import 'intl';
import { Platform } from 'react-native';
import 'intl/locale-data/jsonp/en';

// Stores
import store from './src/stores/MainStore';
import colors from './src/constants/colors';

if (Platform.OS === 'android') {
    // See https://github.com/expo/expo/issues/6536 for this issue.
    if (typeof (Intl as any).__disableRegExpRestore === 'function') {
        (Intl as any).__disableRegExpRestore();
    }
}
const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: colors.primary.light,
    },
};

export default function App(): React.ReactElement {
    return (
        <SafeAreaProvider>
            <PaperProvider theme={theme}>
                <Provider store={store}>
                    <Navigation />
                </Provider>
            </PaperProvider>
        </SafeAreaProvider>
    );
}
