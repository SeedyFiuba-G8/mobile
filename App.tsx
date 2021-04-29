import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Navigation
import Navigation from './src/navigation';

// Hooks
import ThemeProvider from './src/hooks/useTheme';
import useCachedResources from './src/hooks/useCachedResources';

export default function App() {
	const isLoadingComplete = useCachedResources();

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<ThemeProvider>
				<SafeAreaProvider>
					<Navigation />
					<StatusBar />
				</SafeAreaProvider>
			</ThemeProvider>
		);
	}
}
