import { PaymentContext } from "../src/PaymentContext";
import { PaymentStrategy } from "../src/strategies/PaymentStrategy";

class MockStrategy implements PaymentStrategy {
  public called = false;
  public paidAmount = 0;

  pay(amount: number): void {
    this.called = true;
    this.paidAmount = amount;
  }
}

test("Context uses strategy to process payment", () => {
  const mock = new MockStrategy();
  const context = new PaymentContext(mock);

  context.pay(100);

  expect(mock.called).toBe(true);
  expect(mock.paidAmount).toBe(100);
});
