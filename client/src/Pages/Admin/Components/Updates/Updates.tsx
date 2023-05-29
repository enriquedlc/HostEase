import genericProfileImg from './user.png';

import { User } from '../../../../Types/Types';

import './Updates.css';

interface UpdatesProps {
    users: User[]
}

const Updates: React.FC<UpdatesProps> = (props: UpdatesProps) => {

    const { users } = props;

    const reversedUsers = [...users].reverse();

    function formatTimestamp(timestamp: string) {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        const formattedTimestamp = `${year}-${month}-${day} at ${hours}:${minutes}`;
        return formattedTimestamp;
    }

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
                            <span>{formatTimestamp(joinedAt)}</span>
                        </div>
                    </div>
                )
            })
            }
        </div>
    )
}


export default Updates