export class PaymentService {
  amount: number
  isPaid: boolean

  constructor(amount: number, isPaid: boolean) {
    this.isPaid = false
    this.amount = amount
    if (amount <= 0) {
      throw new Error('Amount must be greater than 0')
    }
  }

  applyDiscount(percent: number) {
    if (percent < 0) {
      return
    }
    if (percent > 100) {
      return
    }
    if (this.isPaid == true) {
      return
    }
    this.amount = this.amount * (1 - percent / 100)
  }

  pay() {
    if (this.isPaid == false) {
      this.isPaid = true
      return true
    }
    return false
  }
}
