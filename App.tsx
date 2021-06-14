import React from 'react';

// Hooks
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// Providers
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ThemeProvider from './src/contexts/ThemeProvider';

// Wrappers
import Navigation from './src/navigation';

// Reducers
import rootReducer from './src/reducers';
import 'intl';
import { Platform } from 'react-native';
import 'intl/locale-data/jsonp/en';

if (Platform.OS === 'android') {
    // See https://github.com/expo/expo/issues/6536 for this issue.
    if (typeof (Intl as any).__disableRegExpRestore === 'function') {
        (Intl as any).__disableRegExpRestore();
    }
}
const store = createStore(rootReducer);

export default function App(): React.ReactElement {
    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <Provider store={store}>
                    <Navigation />
                </Provider>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
