import { useQuery } from '@tanstack/react-query'
import { getCurrentUserApi } from '../../services/apiAuth'

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUserApi,
  })

  return { isLoading, user, isAuthenticated: user?.role === 'authenticated' }
}
