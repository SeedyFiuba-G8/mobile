import React from 'react';

type ThemeContextType = {
	theme: 'light' | 'dark';
	toggleTheme: () => void;
};

export const ThemeContext = React.createContext<ThemeContextType>({
	theme: 'light',
	toggleTheme: () => {},
});

export function useTheme() {
	return React.useContext(ThemeContext);
}
