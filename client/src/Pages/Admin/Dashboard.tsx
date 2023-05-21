
import MainDashboard from './Components/MainDashboard/MainDashboard';
import RightSide from './Components/RightSide/RightSide';
import Sidebar from './Components/Sidebar/Sidebar';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <section className='dashboard-section'>
      <div className='dashboard-div'>
        <Sidebar />
        <MainDashboard />
        <RightSide />
      </div>
    </section>
  )
}

export default Dashboard;