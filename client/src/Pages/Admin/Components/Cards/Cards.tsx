import { useEffect, useState } from 'react'

import { MdOutlineGroup } from 'react-icons/md'
import Card from '../Card/Card'

import { HostEaseEvent, Message, User } from '../../../../Types/Types'
import { fetchAllEvents, fetchAllMessages, fetchAllUsers } from '../../../../services/main.services'
import { calculateChartBarValue, getCommentsByMonth, getEventsByMonth, getUsersByMonth } from '../../../../utils/Card.utils'

import './Cards.css'

const Cards: React.FC = () => {

    const [users, setUsers] = useState<User[]>([])
    const [events, setEvents] = useState<HostEaseEvent[]>([])
    const [comments, setComments] = useState<Message[]>([])

    useEffect(() => {
        const getAllUsers = async () => {
            setUsers((await fetchAllUsers()).data.data)
        }
        const getAllEvents = async () => {
            setEvents((await fetchAllEvents()).data.data)
        }
        const getAllMessages = async () => {
            setComments((await fetchAllMessages()).data.data)
        }
        getAllUsers();
        getAllEvents();
        getAllMessages();
    }, [])

    console.log(calculateChartBarValue(getEventsByMonth(events)))
    console.log(getEventsByMonth(events))


    const CardsData = [
        {
            title: "Users",
            color: {
                backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
                boxShadow: "0px 10px 20px 0px #e0c6f5",
            },
            barValue: calculateChartBarValue(getUsersByMonth(users)),
            value: users.length.toString(),
            png: MdOutlineGroup,
            series: [
                {
                    name: "Users",
                    data: getUsersByMonth(users)
                }
            ]
        },
        {
            title: "Events",
            color: {
                backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
                boxShadow: "0px 10px 20px 0px #FDC0C7",
            },
            barValue: calculateChartBarValue(getEventsByMonth(events)),
            value: events.length.toString(),
            png: MdOutlineGroup,
            series: [
                {
                    name: "Events",
                    data: getEventsByMonth(events)
                }
            ]
        },
        {
            title: "Comments",
            color: {
                backGround:
                    "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
                boxShadow: "0px 10px 20px 0px #F9D59B",
            },
            barValue: calculateChartBarValue(getCommentsByMonth(comments)),
            value: comments.length.toString(),
            png: MdOutlineGroup,
            series: [
                {
                    name: "Comments",
                    data: getCommentsByMonth(comments)
                }
            ]
        }
    ]

    return (
        <div className="cards">
            {CardsData.map((card, id) => {
                return (
                    <div className="parent-card-container"
                        key={id}>
                        <Card
                            title={card.title}
                            color={card.color}
                            barValue={card.barValue}
                            value={card.value}
                            png={card.png}
                            series={card.series}
                        />
                    </div>)
            })}
        </div>
    )
}

export default Cards