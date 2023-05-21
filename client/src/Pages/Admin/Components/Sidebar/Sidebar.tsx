
import { MdLogout, MdOutlineComment, MdOutlineEditCalendar, MdOutlineGroup, MdOutlineHouse, MdTag, MdOutlineCategory } from 'react-icons/md'

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

const Sidebar = () => {

    const [selected, setSelected] = useState<number>(0)

    return (
        <div className="sidebar">
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
        </div>
    )
}

export default Sidebar