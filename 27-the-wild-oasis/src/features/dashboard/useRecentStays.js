import { subDays } from 'date-fns'
import { useSearchParams } from 'react-router-dom'
import { getStaysAfterDateApi } from '../../services/apiBookings'
import { useQuery } from '@tanstack/react-query'

export function useRecentStays() {
  const [searchParams] = useSearchParams()

  const numDays = !searchParams.get('last')
    ? 7
    : Number(searchParams.get('last'))

  const queryDate = subDays(new Date(), numDays).toISOString()

  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDateApi(queryDate),
    queryKey: ['stays', `last-${numDays}`],
  })

  const confirmedStays = stays?.filter(
    (stay) => stay.status === 'checked-in' || 'checked-out'
  )

  return { isLoading, stays, confirmedStays, numDays }
}
