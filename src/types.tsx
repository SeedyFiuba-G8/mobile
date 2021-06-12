/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

// Auth
export type AuthStackParamList = {
    SignIn: undefined;
    SignUp: undefined;

    // Error
    NotFound: undefined;
};

// Main
export type RootStackParamList = {
    // Root DrawerNavigator
    Drawer: undefined;

    // Modals
    Profile: undefined;
    Messages: undefined;
    Settings: undefined;

    // Error
    NotFound: undefined;
};

export type DrawerParamList = {
    // Root Dashboard
    Dashboard: undefined;
};

export type TopTabsParamList = {
    // Tabs for Root Dashboard
    Magic: undefined;
    Popular: undefined;
    Newest: undefined;
    EndingSoon: undefined;
};
