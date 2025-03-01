import { Link } from 'react-router-dom'
import { useCities } from '../contexts/CitiesContext.tsx'
import { City } from '../types/types.ts'
import styles from './CityItem.module.css'

const formatDate = (date: string | number | Date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(new Date(date))

interface CityItemProps {
  city: City
}

function CityItem({ city }: CityItemProps) {
  const { currentCity } = useCities()
  const { cityName, emoji, date, id, position } = city

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity?.id ? styles['cityItem--active'] : ''
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  )
}

export default CityItem
