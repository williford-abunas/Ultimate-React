import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCurrentUserApi } from '../../services/apiAuth'
import { toast } from 'react-hot-toast'

export function useUpdateUser() {
  const queryClient = useQueryClient()

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUserApi,
    onSuccess: () => {
      toast.success('User account successfully updated')
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (err) => toast.error(err.message),
  })

  return { updateUser, isUpdating }
}
