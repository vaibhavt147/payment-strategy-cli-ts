import { PaymentStrategy } from "./PaymentStrategy";

export class CryptoPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid $${amount} using Cryptocurrency.`);
  }
}
