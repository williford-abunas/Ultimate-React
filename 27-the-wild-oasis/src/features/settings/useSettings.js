import { useQuery } from "@tanstack/react-query"
import { getSettingsApi } from "../../services/apiSettings"

export function useSettings() {
  const { isLoading, error, data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettingsApi,
  })

  return { isLoading, error, settings }
}