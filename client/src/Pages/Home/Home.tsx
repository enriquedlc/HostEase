import { useContext } from 'react';
import { UserContextValue } from '../../Types/Types';

import { Link } from 'react-router-dom';

import HostEaseLogo from '../../assets/HostEase.png';

import CustomCarrousel from '../../Components/CustomCarrousel/CustomCarrousel';
import ThemeSwitcher from '../../Components/ThemeSwitcher';
import { UserContext } from '../../Context/UserContext';
import { HostEaseRoutes } from '../../Types/AppRoutes/HostEaseRoutes';
import './Home.css';

const Home = (props : { context : UserContextValue | null }) => {
	
	const { context } = props;

	return (
		<section className="home-section">
			<nav className={`home-top-bar ${context?.theme}-top-bar`}>
				<div className={`top-bar-company`}>
					<img src={HostEaseLogo} className={`hostease-logo`} />
					<div className={`${context?.theme}-theme-font`}>HostEase</div>
				</div>
				<div className={`top-bar-button-panel`}>
					<Link to={HostEaseRoutes.Home} className="featured">
						Create an event
					</Link>
					{context?.user ? (
						<>
							<Link to={HostEaseRoutes.MainPage} className={`${context?.theme}-theme-font`}>Go to Home</Link>
							<a className={`${context?.theme}-theme-font`} onClick={context.logOut}>Log Out</a>
						</>
					) : (
						<>
							<Link to={HostEaseRoutes.Login} className={`${context?.theme}-theme-font`}>
								Log In
							</Link>
							<Link to={HostEaseRoutes.Sign} className={`${context?.theme}-theme-font`}>
								Sign In
							</Link>{' '}
						</>
					)}
					<ThemeSwitcher />
				</div>
			</nav>
			<div className={`home-body ${context?.theme}-home-body`}>
				<div className="home-presentation-section">
					<div className={`home-presentation ${context?.theme}-presentation`}>
						<div className={`home-presentation-title ${context?.theme}-presentation-title`}>
							<h2>Follow</h2>
							<h1>your passion!</h1>
						</div>
					</div>
					<CustomCarrousel className="home-carousel" />
				</div>
			</div>
		</section>
	);
};

export default Home;
