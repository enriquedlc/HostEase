import React, { ReactNode, useState } from 'react';
import { User, Theme } from '../Types/Types';
import { authenticateUser } from '../services/auth.services';
import UserContext from '../Context/UserContext';

const UserProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<Theme>('light');

	const [user, setUser] = useState<User | null>(null);

	const login = async (email: string, password: string) => {
		try {
		} catch (err) {}
	};

	const logOut = () => {
		setUser(null);
	};

	const logIn = async () => {};

	const fetchUserEvents = async () => {};

	return (
		<UserContext.Provider value={{ user, theme, setTheme, logIn, logOut }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
