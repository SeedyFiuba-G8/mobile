import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';

// Navigation
import {
	DrawerContentComponentProps,
	DrawerContentScrollView,
	DrawerItem,
} from '@react-navigation/drawer';

// Contents
import DrawerList from './DrawerList';
import general from './Contents/general';
import collections from './Contents/collections';
import categories from './Contents/categories';

export default function Content({ ...props }: DrawerContentComponentProps) {
	return (
		<DrawerContentScrollView
			{...props}
			contentContainerStyle={{
				flex: 1,
				paddingTop: 0,
			}}
		>
			<Drawer.Section>
				<DrawerList data={general} props={props} />
			</Drawer.Section>

			<Drawer.Section title="Collections">
				<DrawerList data={collections} props={props} />
			</Drawer.Section>

			<Drawer.Section title="Categories">
				<DrawerList data={categories} props={props} />
			</Drawer.Section>
		</DrawerContentScrollView>
	);
}

const styles = StyleSheet.create({
	preference: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 12,
		paddingHorizontal: 16,
	},
});
