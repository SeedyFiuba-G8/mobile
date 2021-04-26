import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MessagesScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>MessagesScreen</Text>
			<View style={styles.separator} />
			<Text>MessagesScreen info should go here.</Text>
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
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
		backgroundColor: '#eee',
	},
});
