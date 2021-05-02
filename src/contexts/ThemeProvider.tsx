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
	isDarkTheme: boolean;
	toggleTheme: () => void;
};

const ThemeContext = React.createContext<ThemeContextType>({
	isDarkTheme: false,
	toggleTheme: () => {},
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

	const [isDarkTheme, setIsDarkTheme] = React.useState<boolean>(
		colorScheme === 'dark' ? true : false
	);

	function toggleTheme() {
		setIsDarkTheme((prevState) => !prevState);
	}

	const preferences = React.useMemo(
		() => ({
			isDarkTheme,
			toggleTheme,
		}),
		[isDarkTheme]
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
