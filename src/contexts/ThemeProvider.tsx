import React from 'react';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import {
	Provider as PaperProvider,
	DefaultTheme,
	DarkTheme,
} from 'react-native-paper';

// Constants
import colors from '../constants/colors';

// Context

type ThemeContextType = {
	theme: 'light' | 'dark';
	toggleTheme: () => void;
	isDarkTheme: boolean;
};

const ThemeContext = React.createContext<ThemeContextType>({
	theme: 'light',
	toggleTheme: () => {},
	isDarkTheme: false,
});

export function useTheme() {
	return React.useContext(ThemeContext);
}

export default function ThemeProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const colorScheme = useColorScheme();

	const [theme, setTheme] = React.useState<'light' | 'dark'>(
		colorScheme === 'dark' ? 'dark' : 'light'
	);

	function toggleTheme() {
		setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));
	}

	const isDarkTheme = theme === 'dark';

	const preferences = React.useMemo(
		() => ({
			theme,
			toggleTheme,
			isDarkTheme,
		}),
		[theme]
	);

	return (
		<AppearanceProvider>
			<ThemeContext.Provider value={preferences}>
				<PaperProvider
					theme={
						isDarkTheme
							? {
									...DarkTheme,
									colors: {
										...DarkTheme.colors,
										primary: colors.primary.dark,
										accent: colors.accent.dark,
									},
							  }
							: {
									...DefaultTheme,
									colors: {
										...DefaultTheme.colors,
										primary: colors.primary.light,
										accent: colors.accent.light,
									},
							  }
					}
				>
					{children}
				</PaperProvider>
			</ThemeContext.Provider>
		</AppearanceProvider>
	);
}
