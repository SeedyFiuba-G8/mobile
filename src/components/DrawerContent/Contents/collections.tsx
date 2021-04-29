// Types
import { DrawerItemType } from './contentTypes';

const data: DrawerItemType[] = [
	{
		label: 'All Projects',
		icon: 'bookmarks-outline',
		onPress: (props) => {
			console.log(`Dummy for All Projects`);
		},
	},
	{
		label: 'Recommended for you',
		icon: 'bookmarks-outline',
		onPress: (props) => {
			console.log(`Dummy for Recommended for you`);
		},
	},
];

export default data;
