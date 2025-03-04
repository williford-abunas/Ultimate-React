export interface City {
  cityName: string
  country: string
  emoji: string
  date: string
  notes: string
  position: Position
  id: number
}

export interface Position {
  lat: number
  lng: number
}

export interface InitialStateType {
  cities: Array<City>
  isLoading: boolean
  currentCity: City
  error: string
}

export type ActionType =
  | { type: 'loading' }
  | { type: 'cities/loaded'; payload: City[] }
  | { type: 'city/loaded'; payload: City }
  | { type: 'city/created'; payload: City }
  | { type: 'city/deleted'; payload: number | string }
  | { type: 'rejected'; payload: string }
