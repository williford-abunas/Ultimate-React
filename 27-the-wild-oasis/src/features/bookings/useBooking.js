import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getBookingApi } from "../../services/apiBookings"

export function useBooking() {
  const { bookingId } = useParams()

  const { isLoading, data: booking, error } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBookingApi(Number(bookingId)),
    retry: false,
    enabled: !!bookingId,
  })

  return { isLoading, error, booking }
}