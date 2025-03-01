import { useParams } from 'react-router-dom'
import styles from './City.module.css'
import { useEffect } from 'react'
import { useCities } from '../contexts/CitiesContext.tsx'
import Spinner from './Spinner.tsx'
import BackButton from './BackButton.tsx'

const formatDate = (date: string | number | Date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(new Date(date))

function City() {
  const { id } = useParams()

  const { getCity, currentCity, isLoading } = useCities()

  useEffect(() => {
    if (id) getCity(Number(id))
  }, [id])

  if (isLoading || !currentCity) return <Spinner />

  const { cityName, emoji, date, notes } = currentCity

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  )
}

export default City
