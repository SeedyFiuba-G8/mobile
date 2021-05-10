import React from 'react';
import { Drawer } from 'react-native-paper';

// Navigation
import {
	DrawerContentComponentProps,
	DrawerContentScrollView,
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
