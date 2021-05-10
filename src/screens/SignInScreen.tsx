import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

// Contexts
import { useTheme } from '../contexts/ThemeProvider';

// Constants
import colors from '../constants/colors';

export default function SignInScreen() {
	const { isDarkTheme } = useTheme();

	const styles = React.useMemo(() => createThemedStyles(isDarkTheme), [
		isDarkTheme,
	]);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>SignIn Screen</Text>
		</View>
	);
}

const createThemedStyles = (isDarkTheme: boolean) => {
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors.primary.light,
			alignItems: 'center',
			justifyContent: 'center',
		},
		title: {
			fontSize: 20,
			fontWeight: 'bold',
			color: colors.white,
		},
	});

	return styles;
};
