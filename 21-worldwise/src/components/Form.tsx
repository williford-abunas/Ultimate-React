import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useUrlPosition } from '../hooks/useUrlPosition.ts'
import {useCities} from '../contexts/CitiesContext.tsx'
import styles from './Form.module.css'
import BackButton from './BackButton.tsx'
import Button from './Button.tsx'
import Message from './Message.tsx'
import Spinner from './Spinner.tsx'

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt())
  return String.fromCodePoint(...codePoints)
}

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'

function Form() {
  const [mapLat, mapLng] = useUrlPosition()
  const navigate = useNavigate()
  const [cityName, setCityName] = useState('')
  const [country, setCountry] = useState('')
  const [date, setDate] = useState(new Date())
  const [notes, setNotes] = useState('')
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
  const [emoji, setEmoji] = useState('')
  const [geocodingError, setGeocodingError] = useState('')
  const {createCity, isLoading} = useCities()

  useEffect(() => {
    if (mapLat == null || mapLng == null || isNaN(mapLat) || isNaN(mapLng))
      return

    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true)
        setGeocodingError('')
        const res = await fetch(
          `${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`
        )
        const data = await res.json()

        if (!data.countryCode)
          throw new Error('Not a city. Click Somewhere else...')
        setCityName(data.city || data.locality || '')
        setCountry(data.countryName)
        setEmoji(convertToEmoji(data.countryCode))
      } catch (error) {
        if (error instanceof Error) {
          setGeocodingError(error.message)
        } else {
          setGeocodingError('Unknown error occurred.')
        }
      } finally {
        setIsLoadingGeocoding(false)
      }
    }
    fetchCityData()
  }, [mapLat, mapLng])

  async function handleSubmit(e) {
    e.preventDefault()

    if(!cityName || !date) return

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes, 
      position: {lat: mapLat, lng: mapLng}
    }

    await createCity(newCity)
    navigate('/app/cities')
  }

  if (isLoadingGeocoding) return <Spinner />
  if (!mapLat && !mapLng)
    return <Message message="Start by clicking on the map." />
  if (geocodingError) return <Message message={geocodingError} />

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ''}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          type="date"
          onChange={(e) => setDate(new Date(e.target.value))}
          value={date.toISOString().split('T')[0]}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  )
}

export default Form
