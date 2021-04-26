import React from 'react';
import { View, StyleSheet } from 'react-native';

// Constants
import colors from '../constants/colors';
import values from '../constants/values';

// Navigation
import {
	DrawerContentScrollView,
	DrawerItem,
	DrawerContentComponentProps,
} from '@react-navigation/drawer';

// React Native Paper
import {
	Avatar,
	Title,
	Caption,
	Drawer,
	Text,
	TouchableRipple,
	Switch,
} from 'react-native-paper';

// Iconos de Expo
import { Ionicons } from '@expo/vector-icons';

export default function DrawerContent(props: DrawerContentComponentProps) {
	return (
		<View style={styles.drawerContent}>
			{/* User Info */}
			<View style={[styles.userInfo, styles.separateBottom]}>
				<Avatar.Image
					source={require('../assets/images/dummy_avatar.jpg')}
					size={80}
				/>

				<View style={styles.userName}>
					<Title style={styles.title}>Heath Ledger</Title>
					<Caption style={styles.caption}>@da_real_joker</Caption>
				</View>
			</View>

			{/* ScrollView */}
			<DrawerContentScrollView {...props}>
				<Drawer.Section style={styles.general}>
					<DrawerItem
						icon={({ color, size }) => (
							<Ionicons
								name="person-circle-outline"
								color={color}
								size={size}
							/>
						)}
						label="Profile"
						onPress={() => {
							props.navigation.navigate('Profile');
						}}
					/>

					<DrawerItem
						icon={({ color, size }) => (
							<Ionicons
								name="chatbubbles-outline"
								color={color}
								size={size}
							/>
						)}
						label="Messages"
						onPress={() => {
							props.navigation.navigate('Messages');
						}}
					/>
					<DrawerItem
						icon={({ color, size }) => (
							<Ionicons
								name="settings-outline"
								color={color}
								size={size}
							/>
						)}
						label="Settings"
						onPress={() => {
							props.navigation.navigate('Settings');
						}}
					/>
				</Drawer.Section>

				<Drawer.Section title="Collections">
					<DrawerItem
						icon={({ color, size }) => (
							<Ionicons
								name="bookmarks-outline"
								color={color}
								size={size}
							/>
						)}
						label="All Projects"
						onPress={() => {
							props.navigation.navigate('Dashboard');
						}}
					/>
					<DrawerItem
						icon={({ color, size }) => (
							<Ionicons
								name="bookmarks-outline"
								color={color}
								size={size}
							/>
						)}
						label="Recommended for you"
						onPress={() => {
							props.navigation.navigate('Dashboard');
						}}
					/>
				</Drawer.Section>

				<Drawer.Section title="Categories">
					<DrawerItem
						icon={({ color, size }) => (
							<Ionicons
								name="bookmark-outline"
								color={color}
								size={size}
							/>
						)}
						label="Art"
						onPress={() => {
							props.navigation.navigate('Dashboard');
						}}
					/>

					<DrawerItem
						icon={({ color, size }) => (
							<Ionicons
								name="bookmark-outline"
								color={color}
								size={size}
							/>
						)}
						label="Comics"
						onPress={() => {
							props.navigation.navigate('Dashboard');
						}}
					/>
				</Drawer.Section>

				{/* Preferences */}
				<Drawer.Section title="Preferences">
					<TouchableRipple
						onPress={() => {
							console.log('Dummy toggle theme');
						}}
					>
						<View style={styles.preference}>
							<Text>Dark Theme</Text>
							<View pointerEvents="none">
								<Switch />
							</View>
						</View>
					</TouchableRipple>
				</Drawer.Section>
			</DrawerContentScrollView>

			{/* Log Out */}
			<View style={styles.separateTop}>
				<DrawerItem
					icon={({ color, size }) => (
						<Ionicons
							name="log-out-outline"
							color={color}
							size={size}
						/>
					)}
					label="Log Out"
					onPress={() => {
						console.log('Dummy log out');
					}}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	caption: {
		fontSize: 14,
		lineHeight: 14,
	},

	drawerContent: {
		flex: 1,
	},

	general: {
		paddingTop: 4,
	},

	paragraph: {
		fontWeight: 'bold',
		marginRight: 3,
	},

	preference: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 12,
		paddingHorizontal: 16,
	},

	separateBottom: {
		borderBottomWidth: values.drawer.separatorWidth,
		borderBottomColor: colors.drawer.separator,
	},

	separateTop: {
		borderTopWidth: values.drawer.separatorWidth,
		borderTopColor: colors.drawer.separator,
	},

	title: {
		fontSize: 16,
		fontWeight: 'bold',
	},

	userInfo: {
		marginTop: 40,
		paddingLeft: 20,
		paddingBottom: 20,
	},

	userName: {
		marginTop: 10,
		flexDirection: 'column',
	},
});
