import { useQuery } from "@tanstack/react-query"
import { getBookingsApi } from "../../services/apiBookings"
import { useSearchParams } from "react-router-dom"
import { camelToSnake } from "../../utils/helpers"

export function useBookings() {
  const [searchParams] = useSearchParams()

  // FILTER
  const filterValue = searchParams.get('status')
  const filter = !filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue, method: 'eq' }

  // SORT BY
  const sortByParams = searchParams.get('sortBy') || "startDate-desc"
  const [field, direction] = sortByParams.split('-')
  const sortBy = { field: camelToSnake(field), direction }

  // PAGINATION
  const page = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'))

  const { isLoading, data: { data: bookings, count }, error } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookingsApi({ filter, sortBy, page }),
    initialData: { data: [], count: 0 },
  })

  return { isLoading, error, bookings, count }
}