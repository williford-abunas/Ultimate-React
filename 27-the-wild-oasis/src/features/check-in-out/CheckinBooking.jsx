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

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false)
  const { booking, isLoading } = useBooking()
  const { checkin, isCheckingIn } = useCheckin()
  const moveBack = useMoveBack()

  useEffect(() => {
    if (booking) {
      setConfirmPaid(booking.has_paid ?? false)
    }
  }, [booking])

  if (isLoading) return <Spinner />

  const { id: bookingId, guests, total_price } = booking

  function handleCheckin() {
    if (!confirmPaid) return
    checkin(bookingId)
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((prevState) => !prevState)}
          id="confirm"
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {guests.full_name} has paid the total amount of{' '}
          {formatCurrency(total_price)}
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
