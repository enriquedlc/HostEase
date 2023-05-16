
import MainDashboard from './Components/MainDashboard/MainDashboard';
import Sidebar from './Components/Sidebar/Sidebar';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <section className='dashboard-section'>
      <div className='dashboard-div'>
        <Sidebar />
        <MainDashboard />
      </div>
    </section>
  )
}

export default Dashboard;