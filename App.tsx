import React from 'react';

// Hooks
import useCachedResources from './src/hooks/useCachedResources';

// Providers
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ThemeProvider from './src/contexts/ThemeProvider';

// Wrapper
import Navigation from './src/navigation';

export default function App() {
	const isLoadingComplete = useCachedResources();

	return (
		<SafeAreaProvider>
			<ThemeProvider>
				{isLoadingComplete ? <Navigation /> : null}
			</ThemeProvider>
		</SafeAreaProvider>
	);
}
