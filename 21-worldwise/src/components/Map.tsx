import {
  useSearchParams,
  useNavigate,
  NavigateFunction,
} from 'react-router-dom'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet'
import { LatLngTuple, LeafletMouseEvent } from 'leaflet'
import { useEffect, useState } from 'react'
import styles from './Map.module.css'
import { useCities } from '../contexts/CitiesContext'
import { useGeolocation } from '../hooks/useGeolocation'
import { useUrlPosition } from '../hooks/useUrlPosition'
import Button from './Button'

function Map() {
  const { cities } = useCities()
  const [mapPosition, setMapPosition] = useState<LatLngTuple>([40, 0])
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation()

  const [mapLat, mapLng] = useUrlPosition()

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng])
  }, [mapLat, mapLng])

  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
  }, [geolocationPosition])

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (<Button type="position" onClick={getPosition}>
        {isLoadingPosition ? 'Loading...' : 'Use your position'}
      </Button>)}
      <MapContainer
        center={mapPosition}
        zoom={10}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={String(city.id) || `${city.cityName}-${city.position.lat}-${city.position.lng}`}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick setPosition={setMapPosition} />
      </MapContainer>
    </div>
  )
}

function ChangeCenter({ position }: { position: LatLngTuple }) {
  const map = useMap()
  map.setView(position)

  return null
}

function DetectClick({setPosition}) {
  const navigate: NavigateFunction = useNavigate()

  useMapEvents({
    click: (e: LeafletMouseEvent) =>
      {
        navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
        setPosition([e.latlng.lat, e.latlng.lng])
      }
    
  })

  return null
}

export default Map
