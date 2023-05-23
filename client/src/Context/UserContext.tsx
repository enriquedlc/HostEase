import { createContext } from 'react';
import { UserContextValue } from '../Types/Types';

export const UserContext = createContext<UserContextValue | null>(null);

export default UserContext;
