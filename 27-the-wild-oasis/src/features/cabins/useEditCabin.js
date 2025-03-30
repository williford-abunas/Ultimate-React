import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createEditCabinApi } from "../../services/apiCabins"
import { toast } from 'react-hot-toast'

export function useEditCabin() {

  const queryClient = useQueryClient()

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabinApi(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin successfully edited')
      queryClient.invalidateQueries({ queryKey: ['cabin'] })
    },
    onError: (err) => toast.error(err.message),
  })

  return { isEditing, editCabin }
}