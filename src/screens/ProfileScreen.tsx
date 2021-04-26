import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>ProfileScreen</Text>
			<View style={styles.separator} />
			<Text>ProfileScreen info should go here.</Text>
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
