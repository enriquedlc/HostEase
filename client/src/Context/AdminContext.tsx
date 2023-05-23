import { createContext } from "react";
import { AdminContextValue } from "../Types/Types";

export const AdminContext = createContext<AdminContextValue | null>(null);

export default AdminContext;
