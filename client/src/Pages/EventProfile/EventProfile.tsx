import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import { HostEaseEvent, Message, UserContextValue } from '../../Types/Types';

const EventProfile = () => {

  const userContext = useOutletContext<UserContextValue>();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>();

  useEffect(() => {

  })

  return (
    <div className='profile-container'>
      <div className='profile-col'>

      </div>
    </div>
  )
}

export default EventProfile