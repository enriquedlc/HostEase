import genericProfileImg from './user.png';

import { User } from '../../../../Types/Types';

import './Updates.css';

interface UpdatesProps {
    users: User[]
}

const Updates: React.FC<UpdatesProps> = (props: UpdatesProps) => {

    const { users } = props;

    const reversedUsers = [...users].reverse();

    return (
        <div className="updates">
            {reversedUsers.map(({ nickname, joinedAt, id }) => {
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
            })
            }
        </div>
    )
}


export default Updates