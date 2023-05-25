import { User } from '../../../../Types/Types';

import './Updates.css';

import genericProfileImg from './user.png';

export const UpdatesData = [
    {
        name: "Andrew Thomas",
        comment: "has ordered Apple smart watch 2500mh battery.",
        time: "25 seconds ago",
    },
    {
        name: "Andrew Thomas",
        comment: "has ordered Apple smart watch 2500mh battery.",
        time: "25 seconds ago",
    },
    {
        name: "Andrew Thomas",
        comment: "has ordered Apple smart watch 2500mh battery.",
        time: "25 seconds ago",
    }
]


const Updates = ({ users }: { users: User[] }) => {
    const lastThreeUsers = users.slice(-3); // Obtener los últimos tres elementos

    return (
        <div className="updates">
            {lastThreeUsers.map(({ nickname, joinedAt, id }) => {
                return (
                    <div className="update" key={id}>
                        <img className='photo' src={genericProfileImg} alt="photo" />
                        <div className="comment">
                            <div style={{ marginBottom: '0.5rem' }}>
                                <span>{nickname}</span>
                                <span>{` has joined.`}</span>
                            </div>
                            <span>{joinedAt}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}


export default Updates