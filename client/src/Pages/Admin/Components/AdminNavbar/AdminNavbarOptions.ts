import { MdOutlineCategory, MdOutlineComment, MdOutlineEditCalendar, MdOutlineGroup, MdOutlineHouse, MdTag } from 'react-icons/md'

import { HostEaseRoutes } from '../../../../Types/AppRoutes/HostEaseRoutes'

type SidebarOptions = {
    icon: any
    title: string
    route?: string
}

export const AdminNavbarOptions: SidebarOptions[] = [
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