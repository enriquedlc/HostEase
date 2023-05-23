
import { AdminContextValue } from '../../Types/Types';
import MainDashboard from './Components/MainDashboard/MainDashboard';
import RightSide from './Components/RightSide/RightSide';
import Sidebar from './Components/Sidebar/Sidebar';
import './Dashboard.css';

const Dashboard = (props: {context: AdminContextValue | null}) => {

  const {context} = props;

  return (
    <section className='dashboard-section'>
      <div className='dashboard-div-glass'>
        <Sidebar />
        <MainDashboard />
        <RightSide />
      </div>
    </section>
  )
}

export default Dashboard;