import { motion } from 'framer-motion';
import { useContext } from 'react';

import { UserContext } from '../../Context/UserContext';
import { Theme, UserContextValue } from '../../Types/Types';
import { ThemeIcon } from './ThemeSwitcherButton/ThemeSwitcherButton';

import './ThemeSwitcher.css';

const ThemeSwitcher = () => {
	const userContext = useContext<UserContextValue | null>(UserContext);

	const switchTheme = () => {
		userContext?.setTheme((current: Theme) =>
			current === 'light' ? 'dark' : 'light'
		);
	};

	return (
		<div className="theme-switcher-container">
			<motion.label
				className="theme-switcher-label"
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 1.5 }}
				transition={{ duration: 0.3 }}
			>
				<input
					className="theme-switcher-slider"
					type="checkbox"
					onChange={switchTheme}
					checked={userContext?.theme === 'dark'}
				/>
				<motion.span
					className="theme-switcher-slider-round"
					transition={{ duration: 0.3 }}
				>
					<ThemeIcon theme={userContext?.theme} />
				</motion.span>
			</motion.label>
		</div>
	);
};

export default ThemeSwitcher;
