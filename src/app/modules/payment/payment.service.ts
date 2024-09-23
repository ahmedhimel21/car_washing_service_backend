/* eslint-disable no-undef */
// import { readFileSync } from 'fs'
import Booking from '../booking/booking.model'
import verifyPayment from './payment.utils'
import { join } from 'path'
import ejs from 'ejs'

const paymentConfirmation = async (transactionId: string, status: string) => {
  const verifyResponse = await verifyPayment(transactionId)
  if (verifyResponse && verifyResponse.pay_status === 'pay_status') {
    await Booking.findOneAndUpdate(
      { transactionId },
      {
        paymentStatus: 'paid',
      },
    )
  }
  const successFilePath = join(__dirname, '../../../views/success.ejs')
  const failedFilePath = join(__dirname, '../../../views/failed.ejs')
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
