import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import RightSide from '../../Pages/Admin/Components/RightSide/RightSide';
import AdminNavbar from '../../Pages/Admin/Components/AdminNavbar/AdminNavbar';
import { User, UserContextValue } from '../../Types/Types';
import { fetchAllUsers } from '../../services/main.services';

import './AdminPageLayout.css';

const AdminPageLayout = (props: { context: UserContextValue | null }) => {

  const { context } = props

  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetchAllUsers().then((response) => {
      setUsers(response.data.data)
    })
  }, []);

  return (
    <section className='dashboard-section'>
      <div className='dashboard-div-glass'>
        <AdminNavbar userContext={context} />
        <Outlet context={context} />
        <RightSide users={users} />
      </div>
    </section>
  )
}

export default AdminPageLayout;
