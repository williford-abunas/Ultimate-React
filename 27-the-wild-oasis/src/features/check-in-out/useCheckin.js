import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) => updateBookingApi(bookingId, {
      status: 'checked-in',
      has_paid: true,
      ...breakfast,
    }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`)
      queryClient.invalidateQueries({ active: true })
      navigate('/')
    },

    onError: () => toast.error("There was an error while checking in")
  })

  return { checkin, isCheckingIn }
}