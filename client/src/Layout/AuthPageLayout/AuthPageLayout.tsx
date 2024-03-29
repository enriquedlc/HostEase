import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { UserContextValue } from '../../Types/Types';
import './AuthPageLayout.css';

const AuthPageLayout = (props: { context: UserContextValue | null }) => {

	const { context } = props;

	return (
		<section className="authform-section">
			<ToastContainer newestOnTop={true} autoClose={2000} />
			<Outlet context={context} />
		</section>
	);
};

export default AuthPageLayout;
