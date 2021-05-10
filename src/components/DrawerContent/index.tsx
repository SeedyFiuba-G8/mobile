import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Navigation
import { DrawerContentComponentProps } from '@react-navigation/drawer';

// Components
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

export default function DrawerContent({
	...props
}: DrawerContentComponentProps) {
	const insets = useSafeAreaInsets();

	return (
		<View
			style={{
				paddingTop: insets.top,
				paddingBottom: insets.bottom,
				flex: 1,
			}}
		>
			<Header {...props} />
			<Content {...props} />
			<Footer {...props} />
		</View>
	);
}
