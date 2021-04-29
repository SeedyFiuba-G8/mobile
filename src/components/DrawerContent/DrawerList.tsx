import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Types
import { DrawerItemType } from './Contents/contentTypes';

// Navigation
import {
	DrawerContentComponentProps,
	DrawerItem,
} from '@react-navigation/drawer';

interface DrawerListProps {
	data: DrawerItemType[];
	props: DrawerContentComponentProps;
}

export default function DrawerList(
	args: React.PropsWithChildren<DrawerListProps>
) {
	const { data, props } = args;
	return (
		<View>
			{data.map((value, key) => {
				return (
					<DrawerItem
						key={key}
						label={value.label}
						icon={({ color, size }) => (
							<Ionicons
								name={value.icon || 'question'}
								color={color}
								size={size}
							/>
						)}
						onPress={() => value.onPress(props)}
					/>
				);
			})}
		</View>
	);
}