import {useEffect, useState} from 'react';
import { MdOutlineEditCalendar } from 'react-icons/md';
import EventTable from '../Tables/EventTable';
import './EventComponent.css';

import { getEventsByMonth } from '../../../../utils/Card.utils';
import Card from '../../Components/Card/Card';
import { fetchAllEvents } from '../../../../services/main.services';
import { HostEaseEvent } from '../../../../Types/Types';

const EventComponent = () => {

    const [events, setEvents] = useState<HostEaseEvent[]>([])

    useEffect(() => {
        const getAllEvents = async () => {
            setEvents((await fetchAllEvents()).data.data)
        }
        getAllEvents();
    }, [])    

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
                data: getEventsByMonth(events)
            }
        ]
    }

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