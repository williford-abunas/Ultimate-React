import { useQuery } from '@tanstack/react-query'
import { getStaysTodayActivityApi } from '../../services/apiBookings'

export function useTodayActivity() {
  const { isLoading, data: activities } = useQuery({
    queryFn: getStaysTodayActivityApi,
    queryKey: ['today-activity'],
  })

  return { activities, isLoading }
}
