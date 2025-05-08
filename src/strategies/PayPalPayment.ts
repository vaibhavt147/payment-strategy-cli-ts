import { PaymentStrategy } from "./PaymentStrategy";

export class PayPalPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid $${amount} using PayPal.`);
  }
}
