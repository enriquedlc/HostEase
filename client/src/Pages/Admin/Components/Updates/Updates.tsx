import './Updates.css';

import genericProfileImg from './user.png';

export const UpdatesData = [
    {
        img: genericProfileImg,
        name: "Andrew Thomas",
        comment: "has ordered Apple smart watch 2500mh battery.",
        time: "25 seconds ago",
    },
    {
        img: genericProfileImg,
        name: "Andrew Thomas",
        comment: "has ordered Apple smart watch 2500mh battery.",
        time: "25 seconds ago",
    },
    {
        img: genericProfileImg,
        name: "Andrew Thomas",
        comment: "has ordered Apple smart watch 2500mh battery.",
        time: "25 seconds ago",
    }
]


const Updates = () => {
    return (
        <div className="updates">
            {UpdatesData.map((update, index) => {
                return (
                    <div className="update" key={index}>
                        <img className='photo' src={update.img} alt="photo" />
                        <div className="comment">
                            <div style={{ marginBottom: '0.5rem' }}>
                                <span>{update.name}</span>
                                <span>{` ${update.comment}`}</span>
                            </div>
                            <span>{update.time}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Updates