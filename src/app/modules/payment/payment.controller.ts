import { Request, Response } from 'express'
import { PaymentConfirmation } from './payment.service'

const paymentConfirmation = async (req: Request, res: Response) => {
  const result = await PaymentConfirmation.paymentConfirmation(
    req.query?.transactionId as string,
    req.query?.status as string,
  )
  res.send(result)
}

export const PaymentController = {
  paymentConfirmation,
}
