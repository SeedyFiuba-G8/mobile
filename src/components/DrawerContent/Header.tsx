import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Caption, Title } from 'react-native-paper';

// Navigation
import { DrawerContentComponentProps } from '@react-navigation/drawer';

// Constants
import colors from '../../constants/colors';
import values from '../../constants/values';

export default function Header({ ...props }: DrawerContentComponentProps) {
	return (
		<View style={styles.container}>
			<View style={styles.userInfo}>
				<Avatar.Image
					source={require('../../assets/images/dummy_avatar.jpg')}
					size={120}
				/>

				<View style={styles.userName}>
					<Title style={styles.title}>Heath Ledger</Title>
					<Caption style={styles.caption}>@da_real_joker</Caption>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	caption: {
		fontSize: 14,
		lineHeight: 14,
	},

	container: {
		marginTop: 20,
		paddingBottom: 20,
		borderBottomColor: colors.drawer.separator,
		borderBottomWidth: values.drawer.separatorWeight,
	},

	title: {
		fontSize: 16,
		fontWeight: 'bold',
	},

	userInfo: {
		alignItems: 'center',
	},

	userName: {
		marginTop: 10,
		flexDirection: 'column',
	},
});