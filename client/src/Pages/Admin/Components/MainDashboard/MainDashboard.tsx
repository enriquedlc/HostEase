import Cards from '../Cards/Cards'
import './MainDashboard.css'

import { events } from '../../Pages/Event/EventPage'
import EventTable from '../Table/EventTable'

const MainDashboard = () => {
  return (
    <div className="main-dashboard">
      <h1 className='main-dashboard-title'>Dashboard</h1>
      <Cards />
      <EventTable eventList={events} title={'Recent Events'} />
    </div>
  )
}

export default MainDashboard