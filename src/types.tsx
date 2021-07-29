/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

// Auth
export type AuthStackParamList = {
    SignIn: { email?: string; justRegistered?: boolean };
    SignUp: undefined;

    // Error
    NotFound: undefined;
};

// Main
export type RootStackParamList = {
    // Root DrawerNavigator
    Drawer: undefined;

    // Modals
    Profile: { userId: string; showNotification?: string };
    Messages: undefined;
    Settings: undefined;
    ProjectCreation: { edition: true; projectId: string } | { edition: false };
    MyProjects: { showNotification: string; projectId: string } | undefined;
    ProjectVisualization: { projectId: string };
    ReviewerCenter: undefined;
    MessagesChat: { userId: string; name: string };
    DonationHistory: undefined;
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

export type ReviewerCenterTabParamList = {
    ReviewRequests: undefined;
    ReviewingProjects: undefined;
};
