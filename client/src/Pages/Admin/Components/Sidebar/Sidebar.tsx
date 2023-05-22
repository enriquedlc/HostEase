
import { motion } from 'framer-motion'
import { MdLogout, MdMenu, MdOutlineCategory, MdOutlineComment, MdOutlineEditCalendar, MdOutlineGroup, MdOutlineHouse, MdTag } from 'react-icons/md'

import HostEaseLogo from '../../../../assets/HostEase.png'

import { useState } from 'react'
import './Sidebar.css'

type SidebarOptions = {
    icon: any
    title: string
}

const SidebarData: SidebarOptions[] = [
    {
        icon: MdOutlineHouse,
        title: "Dashboard"
    },
    {
        icon: MdOutlineEditCalendar,
        title: "Events"
    },
    {
        icon: MdOutlineGroup,
        title: "Users"
    },
    {
        icon: MdTag,
        title: "Tags"
    },
    {
        icon: MdOutlineCategory,
        title: "Categories"
    },
    {
        icon: MdOutlineComment,
        title: "Comments"
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

const Sidebar = () => {

    const [selected, setSelected] = useState<number>(0)
    const [showMenu, setShowMenu] = useState<boolean>(false)

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
                    <span>
                        HostEase
                    </span>
                </div>
                {/* menu */}
                <div className="menu">
                    {SidebarData.map((item, index) => {
                        return (
                            <div className={selected === index ? "menu-item active" : "menu-item"}
                                onClick={() => setSelected(index)}
                                key={index}>
                                <item.icon />
                                <span>{item.title}</span>
                            </div>
                        )
                    })
                    }
                    <div className="menu-item">
                        <MdLogout />
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default Sidebar