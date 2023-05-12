import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ThemeProvider from '../Components/ThemeProvider';
import AuthPageLayout from '../Layout/AuthPageLayout';
import { HostEaseRoutes } from '../Types/AppRoutes/HostEaseRoutes';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp/SignUp';

/**
 *
 * The Skeleton of the App. This side its made for the Routing section of HostEase
 * it brings all the Routes and the profile data in case that the user has or not
 * submited the data.
 *
 * The App will react for both cases, Logged users and not Logged.
 *
 */

const AppRouterProvider = () => {
	return (
		<ThemeProvider>
			<BrowserRouter basename={HostEaseRoutes.Home}>
				<Routes>
					<Route path={HostEaseRoutes.Home} element={<Home />} />
					<Route element={<AuthPageLayout />}>
						<Route path={HostEaseRoutes.Login} element={<Login />} />
						<Route path={HostEaseRoutes.Sign} element={<SignUp />} />
					</Route>
					<Route path="*" element={<p>Error 404</p>} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
};

export default AppRouterProvider;
