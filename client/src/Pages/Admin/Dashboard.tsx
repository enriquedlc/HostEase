import { AdminContextValue } from '../../Types/Types';
import './Dashboard.css';

interface LayoutDefinitionProps {
  sidebar: JSX.Element;
  mainDashboard: JSX.Element;
  rightSide: JSX.Element;
}

const AdminPageLayout = (props: { context: AdminContextValue | null } & LayoutDefinitionProps) => {
  const { context, sidebar, mainDashboard, rightSide } = props;

  return (
    <section className='dashboard-section'>
      <div className='dashboard-div-glass'>
        {sidebar}
        {mainDashboard}
        {rightSide}
      </div>
    </section>
  )
}

export default AdminPageLayout;
