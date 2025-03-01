import { useSearchParams } from 'react-router-dom'

export function useUrlPosition() {
  const [searchParams, setSearchParams] = useSearchParams()
  const mapLat = Number(searchParams.get('lat'))
  const mapLng = Number(searchParams.get('lng'))

  return [mapLat, mapLng]
}