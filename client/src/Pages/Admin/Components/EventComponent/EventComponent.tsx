import { MdOutlineEditCalendar } from 'react-icons/md';
// import '../../Components/MainDashboard/MainDashboard.css';
import EventTable from '../Tables/EventTable';
import './EventComponent.css';

import Card from '../../Components/Card/Card';

const EventCardData = {
    title: "Events",
    color: {
        backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 70,
    value: "10.000",
    png: MdOutlineEditCalendar,
    series: [
        {
            name: "Events",
            data: [31, 40, 28, 51, 42, 109, 100]
        }
    ]
}

const EventComponent = () => {

    return (
        <div className="main-dashboard">
            <h1 className='main-dashboard-title'>Events</h1>
            <Card
                title={EventCardData.title}
                color={EventCardData.color}
                barValue={EventCardData.barValue}
                value={EventCardData.value}
                png={EventCardData.png}
                series={EventCardData.series}
            />
            <EventTable />
        </div>
    );
};


export default EventComponent