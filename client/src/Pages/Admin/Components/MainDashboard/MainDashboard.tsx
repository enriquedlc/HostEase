import Cards from '../Cards/Cards'
import Table from '../Table/Table'
import './MainDashboard.css'


const MainDashboard = () => {
  return (
    <div className="main-dashboard">
      <h1 className='main-dashboard-title'>Dashboard</h1>
      <Cards />
      <Table />
    </div>
  )
}

export default MainDashboard