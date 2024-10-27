/* eslint-disable no-undef */
// import { readFileSync } from 'fs'
import Booking from '../booking/booking.model'
import verifyPayment from './payment.utils'
import { join } from 'path'
import ejs from 'ejs'
import Slot from '../slot/slot.model'
const paymentConfirmation = async (
  transactionId: string,
  slotId: string,
  status: string,
) => {
  const verifyResponse = await verifyPayment(transactionId)

  if (verifyResponse && verifyResponse.pay_status === 'Successful') {
    await Booking.findOneAndUpdate(
      { transactionId },
      {
        paymentStatus: 'paid',
      },
    )
    await Slot.findByIdAndUpdate(slotId, { isBooked: 'booked' }, { new: true })
  }
  const successFilePath = join(__dirname, '../../../../public/success.ejs')
  const failedFilePath = join(__dirname, '../../../../public/failed.ejs')
  const successTemplate = await ejs.renderFile(successFilePath, {
    status,
    transactionId,
    message: 'Your payment was successful!',
  })
  const failedTemplate = await ejs.renderFile(failedFilePath, {
    status,
    transactionId,
    message: 'Your payment failed. Please try again!',
  })

  return `${status === 'success' ? successTemplate : failedTemplate}`
}
export const PaymentConfirmation = {
  paymentConfirmation,
}
