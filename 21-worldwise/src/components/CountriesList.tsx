import styles from './CountryList.module.css'
import Spinner from './Spinner.tsx'
import Message from './Message.tsx'
import CountryItem from './CountryItem.tsx'
import { useCities } from '../contexts/CitiesContext.tsx'

interface Country {
  country: string
  emoji: string
}

function CountriesList() {
  const { cities, isLoading } = useCities()

  if (isLoading) return <Spinner />
  if (!cities.length)
    return <Message message="Add your first city by cicking on the map." />

  const countries: Array<Country> = cities.reduce<Array<Country>>(
    (arr, city) => {
      if (!arr.map((el) => el.country).includes(city.country))
        return [...arr, { country: city.country, emoji: city.emoji }]
      else return arr
    },
    []
  )

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  )
}

export default CountriesList
