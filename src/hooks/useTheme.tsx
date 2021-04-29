import React, { createContext, useContext, useState } from 'react';

// ThemeContext
type ThemeContextProp = 'light' | 'dark';

const ThemeContext = createContext<ThemeContextProp>('light');

export function useTheme() {
	return useContext(ThemeContext);
}

// ToggleThemeContext

type ToggleThemeContextProp = () => void;

const ToggleThemeContext = createContext<ToggleThemeContextProp>(() => null);

export function useThemeUpdate() {
	return useContext(ToggleThemeContext);
}

// Provider

export default function ThemeProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [darkTheme, setDarkTheme] = useState<ThemeContextProp>('light');

	const toggleTheme = () => {
		setDarkTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
	};

	return (
		<ThemeContext.Provider value={darkTheme}>
			<ToggleThemeContext.Provider value={toggleTheme}>
				{children}
			</ToggleThemeContext.Provider>
		</ThemeContext.Provider>
	);
}
