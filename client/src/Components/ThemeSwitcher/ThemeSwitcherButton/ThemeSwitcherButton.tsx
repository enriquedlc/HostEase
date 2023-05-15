import { motion } from 'framer-motion';
import { MdNightlight, MdSunny } from 'react-icons/md';

import './ThemeSwitcherButton.css';

interface ThemeIconProps {
    theme: string | undefined;
}

export const ThemeIcon = ({ theme }: ThemeIconProps) => {

    const icon = theme === 'light' ? <MdSunny />  : <MdNightlight />;

    return (
        <motion.div
            className={`${theme}-switcher-button`}
        >
            {icon}
        </motion.div>
    );
};