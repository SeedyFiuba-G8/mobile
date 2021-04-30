import React from 'react';

// Theming
import { useColorScheme } from 'react-native-appearance';
import {
	Provider as PaperProvider,
	DefaultTheme,
	DarkTheme,
} from 'react-native-paper';
import { ThemeContext } from './contexts/ThemeContext';

// Constants
import colors from './constants/colors';

// Wrappers
import Navigation from './navigation';

export default function Main() {
	const colorScheme = useColorScheme();

	const [theme, setTheme] = React.useState<'light' | 'dark'>(
		colorScheme === 'dark' ? 'dark' : 'light'
	);

	function toggleTheme() {
		setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));
	}

	const preferences = React.useMemo(
		() => ({
			toggleTheme,
			theme,
		}),
		[theme]
	);

	return (
		<ThemeContext.Provider value={preferences}>
			<PaperProvider
				theme={
					theme === 'light'
						? {
								...DefaultTheme,
								colors: {
									...DefaultTheme.colors,
									primary: colors.primary.light,
									accent: colors.accent.light,
								},
						  }
						: {
								...DarkTheme,
								colors: {
									...DarkTheme.colors,
									primary: colors.primary.dark,
									accent: colors.accent.dark,
								},
						  }
				}
			>
				<Navigation />
			</PaperProvider>
		</ThemeContext.Provider>
	);
}
