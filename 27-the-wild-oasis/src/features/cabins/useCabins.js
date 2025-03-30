import { useQuery } from "@tanstack/react-query"
import { getCabinsApi } from "../../services/apiCabins"

export function useCabins() {
  const { isLoading, data: cabins, error } = useQuery({
    queryKey: ['cabin'],
    queryFn: getCabinsApi,
  })

  return { isLoading, error, cabins }
}