import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Paragraph, Text } from 'react-native-paper';

export default function ProfileScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Profile Screen with Paper</Text>
			<Paragraph>Some info about the profile.</Paragraph>
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
