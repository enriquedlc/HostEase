import { motion } from 'framer-motion'
import { useState } from 'react'
import { MdLogout, MdMenu, MdOutlineCategory, MdOutlineComment, MdOutlineEditCalendar, MdOutlineGroup, MdOutlineHouse, MdTag } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { HostEaseRoutes } from '../../../../Types/AppRoutes/HostEaseRoutes'
import HostEaseLogo from '../../../../assets/HostEase.png'

import './AdminNavbar.css'

type SidebarOptions = {
    icon: any
    title: string
    route?: string
}

const SidebarData: SidebarOptions[] = [
    {
        icon: MdOutlineHouse,
        title: "Dashboard",
        route: HostEaseRoutes.Admin
    },
    {
        icon: MdOutlineEditCalendar,
        title: "Events",
        route: HostEaseRoutes.AdminEvents
    },
    {
        icon: MdOutlineGroup,
        title: "Users",
        route: HostEaseRoutes.AdminUsers
    },
    {
        icon: MdTag,
        title: "Tags",
        route: HostEaseRoutes.AdminTags
    },
    {
        icon: MdOutlineCategory,
        title: "Categories",
        route: HostEaseRoutes.AdminCategories
    },
    {
        icon: MdOutlineComment,
        title: "Comments",
        route: HostEaseRoutes.AdminComments
    }
]

const sidebarVariants = {
    true: {
        left: "0"
    },
    false: {
        left: "-60%"
    }
}

const AdminNavbar: React.FC = () => {

    const [selected, setSelected] = useState<number>(0)
    const [showMenu, setShowMenu] = useState<boolean>(false)

    const getRoutePath = (title: string): string => SidebarData.find(item => item.title === title)?.route ?? '';

    const handleShowMenu = () => {
        setShowMenu(!showMenu)
    }

    return (
        <>
            <motion.div
                onClick={() => handleShowMenu()}
                whileTap={{ scale: 1.4 }}
                whileHover={{ scale: 1.1 }}
                className='menu-icon'
                style={
                    showMenu
                        ? { left: "5%" }
                        : { left: "5%" }}>
                <MdMenu />
            </motion.div>
            <motion.div
                className="sidebar"
                variants={sidebarVariants}
                animate={window.innerWidth <= 768 ? `${showMenu}` : ""}>
                {/* logo */}
                <div className="logo">
                    <img src={HostEaseLogo} alt="" />
                </div>
                {/* menu */}
                <div className="menu">
                    {SidebarData.map((item, index) => {
                        return (
                            <Link
                                to={getRoutePath(item.title)}
                                className={selected === index ? "menu-item active" : "menu-item"}
                                onClick={() => setSelected(index)}
                                key={index}
                            >
                                <item.icon />
                                <span>{item.title}</span>
                            </Link>
                        );
                    })}

                    <div className="menu-item">
                        <MdLogout />
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default AdminNavbar