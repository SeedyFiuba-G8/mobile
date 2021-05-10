// Types
import { DrawerItemType } from './contentTypes';

const data: DrawerItemType[] = [
	{
		label: 'Profile',
		icon: 'person-circle-outline',
		onPress: (props) => {
			props.navigation.navigate('Profile');
		},
	},
	{
		label: 'Messages',
		icon: 'chatbubbles-outline',
		onPress: (props) => {
			props.navigation.navigate('Messages');
		},
	},
	{
		label: 'Settings',
		icon: 'settings-outline',
		onPress: (props) => {
			props.navigation.navigate('Settings');
		},
	},
];

export default data;
