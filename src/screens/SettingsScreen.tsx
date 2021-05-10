import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Paragraph, Text } from 'react-native-paper';

export default function SettingsScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Settings Screen with Paper</Text>
			<Paragraph>Some settings.</Paragraph>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
});
