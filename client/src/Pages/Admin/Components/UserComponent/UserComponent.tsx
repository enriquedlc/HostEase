import { MdGroup } from 'react-icons/md';


import Card from '../Card/Card';
import UserTable from '../Tables/UserTable';
import './UserComponent.css';
import { User } from '../../../../Types/Types';
import { fetchAllUsers } from '../../../../services/main.services';
import { useEffect, useState } from 'react';
import { calculateChartBarValue, getUsersByMonth } from '../../../../utils/Card.utils';

const UserComponent = () => {

    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const getAllUsers = async () => {
            setUsers((await fetchAllUsers()).data.data)
        }
        getAllUsers();
    }, [])

    const UserCardData = {
        title: "Users",
        color: {
            backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
            boxShadow: "0px 10px 20px 0px #e0c6f5",
        },
        barValue: calculateChartBarValue(getUsersByMonth(users)),
        value: users.length.toString(),
        png: MdGroup,
        series: [
            {
                name: "Users",
                data: getUsersByMonth(users)
            }
        ]
    }

    return (
        <div className="main-dashboard">
            <h1 className='main-dashboard-title'>Users</h1>
            <Card
                title={UserCardData.title}
                color={UserCardData.color}
                barValue={UserCardData.barValue}
                value={UserCardData.value}
                png={UserCardData.png}
                series={UserCardData.series}
            />
            <UserTable />
        </div>
    );
}

export default UserComponent