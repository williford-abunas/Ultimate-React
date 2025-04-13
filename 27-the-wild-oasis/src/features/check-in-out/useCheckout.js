import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient()
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) => updateBookingApi(bookingId, {
      status: 'checked-out',
    }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`)
      queryClient.invalidateQueries({ active: true })
    },

    onError: () => toast.error("There was an error while checking out")
  })

  return { checkout, isCheckingOut }
}