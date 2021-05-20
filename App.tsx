import React from 'react';

// Hooks
import useCachedResources from './src/hooks/useCachedResources';

// Providers
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ThemeProvider from './src/contexts/ThemeProvider';
import AuthProvider, { useAuth } from './src/contexts/AuthProvider';

// Wrappers
import Auth from './src/auth';
import Navigation from './src/navigation';

const Root = () => {
	const isLoadingComplete = useCachedResources();
	const { isLogged } = useAuth();

	return (
		<>{isLoadingComplete ? isLogged ? <Navigation /> : <Auth /> : null}</>
	);
};

export default function App() {
	return (
		<SafeAreaProvider>
			<ThemeProvider>
				<AuthProvider>
					<Root />
				</AuthProvider>
			</ThemeProvider>
		</SafeAreaProvider>
	);
}
