import { Outlet } from 'react-router-dom';
import './AdminPageLayout.css';
import Sidebar from '../../Pages/Admin/Components/Sidebar/Sidebar';
import RightSide from '../../Pages/Admin/Components/RightSide/RightSide';
import { User, UserContextValue } from '../../Types/Types';
import { useEffect, useState } from 'react';
import { fetchAllUsers } from '../../services/main.services';


const AdminPageLayout = () => {

  const [users, setUsers] = useState<User[]>([])
  
  useEffect(() => {
   fetchAllUsers().then((response) => {
      setUsers(response.data.data)
    })
}, []);

  return (
    <section className='dashboard-section'>
      <div className='dashboard-div-glass'>
        <Sidebar/>
        <Outlet/>
        <RightSide users={users}/>
      </div>
    </section>
  )
}

export default AdminPageLayout;
