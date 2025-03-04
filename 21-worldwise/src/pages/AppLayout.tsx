import Sidebar from '../components/Sidebar.tsx'
import Map from '../components/Map.tsx'
import User from '../components/User.tsx'
import styles from './AppLayout.module.css'

function AppLayout() {
  return (
    <div className={styles.app}>
      <User />
      <Sidebar />
      <Map />
    </div>
  )
}

export default AppLayout
