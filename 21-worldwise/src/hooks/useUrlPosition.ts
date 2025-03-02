import { useSearchParams } from 'react-router-dom'

export function useUrlPosition(): [number | null, number | null] {
  const [searchParams] = useSearchParams()
  const mapLat = Number(searchParams.get('lat'))
  const mapLng = Number(searchParams.get('lng'))

  return [mapLat, mapLng]
}
