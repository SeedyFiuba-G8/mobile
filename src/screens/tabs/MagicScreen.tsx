import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FAB } from 'react-native-paper';

// Navigation
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';

// Constants
import colors from '../../constants/colors';

export default function MagicScreen({ navigation }: MaterialTopTabBarProps) {
	return (
		<View style={styles.container}>
			<Text>Here we should render magic stuff (?)</Text>
			<FAB
				style={styles.fab}
				icon="plus"
				onPress={() => console.log('Pressed')}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	fab: {
		backgroundColor: colors.secondary.light,
		position: 'absolute',
		bottom: 50,
	},
});
