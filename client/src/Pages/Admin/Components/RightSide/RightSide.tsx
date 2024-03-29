import { useLocation } from 'react-router-dom';
import { User } from '../../../../Types/Types';
import CustomContent from '../CustomContent/CustomContent';
import Updates from '../Updates/Updates';

import './RightSide.css';

const RightSide = ({ users }: { users: User[] }) => {
    const location = useLocation();
    const isOnAdminRoute = location.pathname === '/admin';
    const displayedUsers = isOnAdminRoute ? users.slice(-3) : users.slice(-4);

    return (
        <div className="right-side">
            <div>
                <h3>Updates</h3>
                <Updates users={displayedUsers} />
            </div>
            {isOnAdminRoute && (
                <div className="custom-content-chart">
                    <h3>Connected Users</h3>
                    <CustomContent />
                </div>
            )}
        </div>
    );
};

export default RightSide;
