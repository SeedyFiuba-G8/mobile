import { Ionicons } from '@expo/vector-icons';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

export type DrawerItemType = {
	label: string;
	icon: typeof Ionicons.defaultProps;
	onPress: (props: DrawerContentComponentProps) => void;
};
