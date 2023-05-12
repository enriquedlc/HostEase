import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './AuthPageLayout.css';

const AuthPageLayout = () => {
	return (
		<section className="authform-section">
			<ToastContainer newestOnTop={true} autoClose={2000} />
			<Outlet />
		</section>
	);
};

export default AuthPageLayout;
