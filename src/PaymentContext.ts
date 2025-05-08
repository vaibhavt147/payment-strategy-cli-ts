import { PaymentStrategy } from "./strategies/PaymentStrategy";

export class PaymentContext {
  private strategy: PaymentStrategy;

  constructor(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }
  pay(amount: number): void {
    this.strategy.pay(amount);
  }
}
