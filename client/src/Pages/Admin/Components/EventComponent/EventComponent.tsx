import { useEffect, useState } from 'react';
import { MdOutlineEditCalendar } from 'react-icons/md';
import { HostEaseEvent } from '../../../../Types/Types';
// import '../../Components/MainDashboard/MainDashboard.css';
import EventTable from '../Tables/EventTable';
import './EventComponent.css';

import { fetchAllEvents } from '../../../../services/main.services';
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

interface EventComponentProps {
    title: string;
}

const EventComponent = (props: EventComponentProps) => {

    const { title } = props

    const [events, setEvents] = useState<HostEaseEvent[]>([])

    useEffect(() => {
        fetchAllEvents().then((response) => {
            setEvents(response.data.data)
        })
    }, [events]);

    return (
        <div className="main-dashboard">
            <h1 className='main-dashboard-title'>{title}</h1>
            <Card
                title={EventCardData.title}
                color={EventCardData.color}
                barValue={EventCardData.barValue}
                value={EventCardData.value}
                png={EventCardData.png}
                series={EventCardData.series}
            />
            <EventTable eventList={events} title="Recent Events" />
        </div>
    );
};


export default EventComponent