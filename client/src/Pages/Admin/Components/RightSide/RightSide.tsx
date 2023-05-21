import React from 'react'
import './RightSide.css'
import Updates from '../Updates/Updates';
const RightSide = () => {
    return (
        <div className="right-side">
            <div>
                <h3>Updates</h3>
                <Updates />
            </div>
            <div>
                <h3>Custom content</h3>
            </div>
        </div>
    )
}

export default RightSide;
