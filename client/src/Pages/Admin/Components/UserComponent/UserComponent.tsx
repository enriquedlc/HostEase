import { MdGroup } from 'react-icons/md';


import Card from '../Card/Card';
import UserTable from '../Tables/UserTable';
import './UserComponent.css';

const UserCardData = {
    title: "Users",
    color: {
        backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 70,
    value: "10.000",
    png: MdGroup,
    series: [
        {
            name: "Users",
            data: [31, 40, 28, 51, 42, 109, 100]
        }
    ]
}

const UserComponent = () => {

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