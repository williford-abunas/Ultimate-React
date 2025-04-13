import styled from 'styled-components'
import BookingDataBox from '../../features/bookings/BookingDataBox'
import Checkbox from '../../ui/Checkbox'
import Row from '../../ui/Row'
import Heading from '../../ui/Heading'
import ButtonGroup from '../../ui/ButtonGroup'
import Button from '../../ui/Button'
import Spinner from '../../ui/Spinner'
import ButtonText from '../../ui/ButtonText'
import { useState, useEffect } from 'react'
import { useMoveBack } from '../../hooks/useMoveBack'
import { useBooking } from '../bookings/useBooking'
import { formatCurrency } from '../../utils/helpers'
import { useCheckin } from './useCheckin'
import { useSettings } from '../settings/useSettings'

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false)
  const [addBreakfast, setAddBreakfast] = useState(false)
  const { booking, isLoading } = useBooking()
  const { checkin, isCheckingIn } = useCheckin()
  const { settings, isLoading: isLoadingSettings } = useSettings()
  const moveBack = useMoveBack()
  console.log(settings)
  useEffect(() => {
    if (booking) {
      setConfirmPaid(booking.has_paid ?? false)
    }
  }, [booking])

  if (isLoading || isLoadingSettings) return <Spinner />
  const { id: bookingId, guests, total_price } = booking
  const optionalBreakfastPrice =
    settings.breakfast_price * booking.number_guests

  function handleCheckin() {
    if (!confirmPaid) return

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          has_breakfast: true,
          extras_price: optionalBreakfastPrice,
          total_price: total_price + optionalBreakfastPrice,
        },
      })
    } else {
      checkin({ bookingId, breakfast: {} })
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!booking.has_breakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((prevState) => !prevState)
              setConfirmPaid(false)
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((prevState) => !prevState)}
          id="confirm"
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {guests.full_name} has paid the total amount of{' '}
          {!addBreakfast
            ? formatCurrency(total_price)
            : `${formatCurrency(
                total_price + optionalBreakfastPrice
              )} (${formatCurrency(total_price)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  )
}

export default CheckinBooking
