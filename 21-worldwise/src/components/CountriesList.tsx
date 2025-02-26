import styles from './CountryList.module.css'
import Spinner from './Spinner.tsx'
import CityItem from './CityItem.tsx'
import Message from './Message.tsx'
import CountryItem from './CountryItem.tsx'

function CountriesList({cities, isLoading}) {
  if (isLoading) return <Spinner />
  if (!cities.length) return <Message message="Add your first city by cicking on the map." />

  const countries = cities.reduce((arr, city) => 
      {if (!arr.map(el => el.country).includes(city.country)) return [...arr, {country: city.country, emoji: city.emoji}]
      else return arr}     
    , [])

  return (
  <ul className={styles.countryList}>
    {countries.map((country) => (
      <CountryItem country={country} key={country.country} />
      ))}
  </ul>)
}

export default CountriesList
