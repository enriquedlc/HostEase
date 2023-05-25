import { User } from '../../../../Types/Types';
import CustomContent from '../CustomContent/CustomContent';
import Updates from '../Updates/Updates';

import './RightSide.css';

const RightSide = ({ users }: { users: User[] }) => {
    return (
        <div className="right-side">
            <div>
                <h3>Updates</h3>
                <Updates users={users} />
            </div>
            <div className='custom-content-chart'>
                <h3>Custom content</h3>
                <CustomContent />
            </div>
        </div>
    )
}

export default RightSide;
