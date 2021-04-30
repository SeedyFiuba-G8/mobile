import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppearanceProvider } from 'react-native-appearance';

// Hooks
import useCachedResources from './src/hooks/useCachedResources';

// Wrapper
import Main from './src/Main';

export default function App() {
	const isLoadingComplete = useCachedResources();

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<SafeAreaProvider>
				<AppearanceProvider>
					<Main />
				</AppearanceProvider>
			</SafeAreaProvider>
		);
	}
}
