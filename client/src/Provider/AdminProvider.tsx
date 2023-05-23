import { ReactNode, useState } from "react";
import AdminContext from "../Context/AdminContext";
import { Category, HostEaseEvent, User, Tag, Message } from "../Types/Types";
import { fetchAllEvents } from "../services/main.services";

export const AdminProvider = ({ children }: { children: ReactNode }) => {

    const [events, setEvents] = useState<HostEaseEvent[]>([])
    const [users, setUsers] = useState<User[]>([])

    // tags
    const [tag, setTag] = useState<Tag>(undefined as unknown as Tag)
    const [tags, setTags] = useState<Tag[]>([])

    // categories
    const [category, setCategory] = useState<Category>(undefined as unknown as Category)
    const [categories, setCategories] = useState<Category[]>([])

    const [comments, setComments] = useState<Message[]>([])

    return (
        <AdminContext.Provider
            value={{
                events, setEvents,
                users, setUsers,
                tag, setTag, tags, setTags,
                category, setCategory, categories, setCategories,
                comments, setComments
            }}>
            {children}
        </AdminContext.Provider>
    )
}