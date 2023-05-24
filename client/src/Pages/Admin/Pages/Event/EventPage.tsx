import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import EventComponent from './EventComponent';

import { AdminContextValue, HostEaseEvent } from '../../../../Types/Types';
import { fetchAllEvents } from '../../../../services/main.services';
import './EventComponent.css';


export const eventList: HostEaseEvent[] = [
    {
      tags: [
        {
          id: 2,
          tag: "Tag 2",
          color: "blue"
        },
        {
          id: 1,
          tag: "Tag 1",
          color: "red"
        }
      ],
      users: 2,
      category: {
        id: 1,
        categoryName: "Category 1"
      },
      messages: 1,
      likes: 3,
      id: 1,
      owner: {
        id: 1,
        nickname: "nickNameUser1",
        email: "user1email@gmail.com",
        phone: "687779560",
        followers: 1
      },
      title: "Event 1",
      description: "Description 1",
      startDate: "2020-01-01",
      endDate: "2020-01-01",
      startTime: "12:00",
      endTime: "13:00",
      location: {
        lat: 50.3785,
        lng: 14.9706
      },
      maxCapacity: 10,
      photo: 0.0
    },
    {
      tags: [
        {
          id: 3,
          tag: "Tag 3",
          color: "green"
        }
      ],
      users: 2,
      category: {
        id: 2,
        categoryName: "Category 2"
      },
      messages: 2,
      likes: 2,
      id: 2,
      owner: {
        id: 1,
        nickname: "nickNameUser1",
        email: "user1email@gmail.com",
        phone: "687779560",
        followers: 1
      },
      title: "Event 2",
      description: "Description 2",
      startDate: "2020-01-01",
      endDate: "2020-01-01",
      startTime: "12:00",
      endTime: "13:00",
      location: {
        lat: 50.3785,
        lng: 14.9706
      },
      maxCapacity: 10,
      photo: 0.0
    },
    {
      tags: [
        {
          id: 2,
          tag: "Tag 2",
          color: "blue"
        },
        {
          id: 4,
          tag: "Tag 4",
          color: "yellow"
        }
      ],
      users: 4,
      category: {
        id: 3,
        categoryName: "Category 3"
      },
      messages: 1,
      likes: 4,
      id: 3,
      owner: {
        id: 1,
        nickname: "nickNameUser1",
        email: "user1email@gmail.com",
        phone: "687779560",
        followers: 1
      },
      title: "Event 3",
      description: "Description 3",
      startDate: "2020-01-01",
      endDate: "2020-01-01",
      startTime: "12:00",
      endTime: "13:00",
      location: {
        lat: 50.3785,
        lng: 14.9706
      },
      maxCapacity: 10,
      photo: 0.0
    },
    {
      tags: [
        {
          id: 4,
          tag: "Tag 4",
          color: "yellow"
        },
        {
          id: 1,
          tag: "Tag 1",
          color: "red"
        },
        {
          id: 3,
          tag: "Tag 3",
          color: "green"
        }
      ],
      users: 4,
      category: {
        id: 4,
        categoryName: "Category 4"
      },
      messages: 2,
      likes: 2,
      id: 4,
      owner: {
        id: 1,
        nickname: "nickNameUser1",
        email: "user1email@gmail.com",
        phone: "687779560",
        followers: 1
      },
      title: "Event 4",
      description: "Description 4",
      startDate: "2020-01-01",
      endDate: "2020-01-01",
      startTime: "12:00",
      endTime: "13:00",
      location: {
        lat: 50.3785,
        lng: 14.9706
      },
      maxCapacity: 10,
      photo: 0.0
    }
  ];

const EventPage = () => {

    return (
        <EventComponent title="Events" eventList={eventList} />
    )
}
export default EventPage