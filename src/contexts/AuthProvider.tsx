import React from 'react';

// Context

type AuthContextType = {
	isLogged: boolean;
	signIn: (username: string, password: string) => void;
	signUp: (username: string, password: string) => void;
	signOut: () => void;
};

const AuthContext = React.createContext<AuthContextType>({
	isLogged: false,
	signIn: () => {},
	signUp: () => {},
	signOut: () => {},
});

export function useAuth() {
	return React.useContext(AuthContext);
}

export default function AuthProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isLogged, setIsLogged] = React.useState(false);

	const authContext = React.useMemo(
		() => ({
			isLogged: isLogged,

			signIn: async (username: string, password: string) => {
				console.log(
					`[signIn] username: ${username} password: ${password}`
				);

				console.log(`is logged: ${isLogged}`);

				if (
					username.toLowerCase() == 'mauro7x' &&
					password == 'asd123'
				) {
					console.log('entering here...');

					setIsLogged((prevState) => true);
				}
			},

			signUp: async (username: string, password: string) => {
				console.log(
					`[signUp] username: ${username} password: ${password}`
				);
			},

			signOut: async () => {
				console.log('[signOut]');
			},
		}),
		[]
	);

	return (
		<AuthContext.Provider value={authContext}>
			{children}
		</AuthContext.Provider>
	);
}
