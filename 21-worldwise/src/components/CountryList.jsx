/* eslint-disable react/prop-types */

import styles from './CountryList.module.css'
import Spinner from './Spinner'
import Message from './Message'
import CountryItem from './CountryItem'

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />
  if (!cities.length)
    return <Message message="Add your first city by clicking on the map." />

  const countries = cities.reduce((acc, cur) => {
    if (!acc.map((el) => el.country).includes(cur.country))
      return [...acc, { country: cur.country, emoji: cur.emoji }]
    else return acc
  }, [])

  return (
    <ul className={styles.countryList}>
      {countries.map((country, index) => (
        <CountryItem country={country} key={index} />
      ))}
    </ul>
  )
}

export default CountryList
