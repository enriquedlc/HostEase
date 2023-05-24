import React from 'react'
import './RightSide.css'
import Updates from '../Updates/Updates';
import CustomContent from '../CustomContent/CustomContent';
import { User } from '../../../../Types/Types';
const RightSide = ({ users } : { users: User[] }) => {
    return (
        <div className="right-side">
            <div>
                <h3>Updates</h3>
                <Updates users={users}/>
            </div>
            <div>
                <h3>Custom content</h3>
                <CustomContent />
            </div>
        </div>
    )
}

export default RightSide;
