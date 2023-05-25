import { useLocation } from 'react-router-dom';
import { User } from '../../../../Types/Types';
import CustomContent from '../CustomContent/CustomContent';
import Updates from '../Updates/Updates';

import './RightSide.css';


const RightSide = ({ users }: { users: User[] }) => {
    const location = useLocation();

    const isOnAdminRoute = location.pathname === '/admin';

    return (
        <div className="right-side">
            {isOnAdminRoute ? (
                <>
                    <div>
                        <h3>Updates</h3>
                        <Updates users={users} />
                    </div>
                    <div className='custom-content-chart'>
                        <h3>Custom content</h3>
                        <CustomContent />
                    </div>
                </>
            ) : (
                <div>
                    <h3>Updates</h3>
                    <Updates users={users} />
                </div>
            )}
        </div>
    );
};

export default RightSide;

