import DashboardHeader from "../../../components/DashboardHeader/DashboardHeader";
import DashboardSidebar from "../../../components/DashboardSidebar/DashboardSidebar";
import MainContent from "../../../components/MainContent/MainContent";
import styles from './Dashboard.module.css';
import { Outlet } from 'react-router-dom'

const Dashboard = () => {

  return (
    <div className={styles.dashboard}>

      <header >
        <DashboardHeader />
      </header>

      <div className={styles.content}>

        <aside>
          <DashboardSidebar />
        </aside>

        <main>

          <MainContent>
            <Outlet />
          </MainContent>
        </main>

      </div>

    </div>
  )

}

export default Dashboard;