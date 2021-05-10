// Types
import { DrawerItemType } from './contentTypes';

const data: DrawerItemType[] = [
	{
		label: 'Art',
		icon: 'bookmark-outline',
		onPress: (props) => {
			props.navigation.navigate('Dashboard');
		},
	},
	{
		label: 'Games',
		icon: 'bookmark-outline',
		onPress: (props) => {
			props.navigation.navigate('Dashboard');
		},
	},
];

export default data;
