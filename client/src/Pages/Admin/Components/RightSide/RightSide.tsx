import React from 'react'
import './RightSide.css'
import Updates from '../Updates/Updates';
import CustomContent from '../CustomContent/CustomContent';
const RightSide = () => {
    return (
        <div className="right-side">
            <div>
                <h3>Updates</h3>
                <Updates />
            </div>
            <div>
                <h3>Custom content</h3>
                <CustomContent />
            </div>
        </div>
    )
}

export default RightSide;
