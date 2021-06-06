import React from 'react';

// Hooks
import useCachedResources from './src/hooks/useCachedResources';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// Providers
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ThemeProvider from './src/contexts/ThemeProvider';

// Wrappers
import Navigation from './src/navigation';

// Reducers
import rootReducer from './src/reducers';

const store = createStore(rootReducer);

export default function App() {
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
