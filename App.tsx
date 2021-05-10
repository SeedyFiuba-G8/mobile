import React from 'react';

// Hooks
import useCachedResources from './src/hooks/useCachedResources';

// Providers
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ThemeProvider from './src/contexts/ThemeProvider';

// Wrappers
import Auth from './src/auth';
import Navigation from './src/navigation';

export default function App() {
	const isLoadingComplete = useCachedResources();

	// mock
	const isLogged: boolean = false;

	return (
		<SafeAreaProvider>
			<ThemeProvider>
				{isLoadingComplete ? (
					isLogged ? (
						<Navigation />
					) : (
						<Auth />
					)
				) : null}
			</ThemeProvider>
		</SafeAreaProvider>
	);
}
