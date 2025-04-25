import { logoutApi } from '../../services/apiAuth'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useLogOut() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { mutate: logOut, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      //remove queries in the cache
      queryClient.removeQueries()
      navigate('/login', { replace: true })
    },
  })

  return { logOut, isLoading }
}
