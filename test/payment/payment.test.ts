import { PaymentService } from '../../src/payment/payment'

describe('Payment Service', () => {
  let payment: PaymentService

  beforeEach(() => {
    payment = new PaymentService(100, false)
  })

  describe('payment', () => {
    test('Verify if the payment amount is -1, an error is thrown', () => {
      expect(() => {
        new PaymentService(-1, false)
      }).toThrow('Amount must be greater than 0')
    })

    test('Verify if the payment amount is 0, an error is thrown', () => {
      expect(() => {
        new PaymentService(0, false)
      }).toThrow('Amount must be greater than 0')
    })

    test('Verify if 20% discount is applied, payment amount is calculated correctly', () => {
      payment.applyDiscount(20)
      expect(payment.amount).toBe(80)
    })

    test('Verify additional discount is applied to the current amount', () => {
      payment.applyDiscount(20)
      expect(payment.amount).toBe(80)
      payment.applyDiscount(10)
      expect(payment.amount).toBe(72)
    })

    test('Verify if 0% discount is applied, payment amount is calculated correctly', () => {
      payment.applyDiscount(0)
      expect(payment.amount).toBe(100)
    })

    test('Verify if 100% discount is applied, payment amount is calculated correctly', () => {
      payment.applyDiscount(100)
      expect(payment.amount).toBe(0)
    })

    test('Verify that nothing will be done if the percentage is outside the allowed range', () => {
      payment.applyDiscount(101)
      expect(payment.amount).toBe(100)
      payment.applyDiscount(-1)
      expect(payment.amount).toBe(100)
    })

    test('Verify that nothing will be done if the payment has already been completed', () => {
      payment.pay()
      payment.applyDiscount(20)
      expect(payment.amount).toBe(100)
    })

    test('Verify after payment, isPaid is set to true', () => {
      expect(payment.pay()).toBeTruthy()
      expect(payment.isPaid).toBeTruthy()
    })

    test('Verify that the pay() method returns false if the payment has already been completed', () => {
      payment.pay() //Payment has been already completed
      expect(payment.isPaid).toBeTruthy()
      expect(payment.pay()).toBeFalsy() //Repayment returns false
    })
  })
})
