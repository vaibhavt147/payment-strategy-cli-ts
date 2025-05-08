import inquirer from "inquirer";
import { PaymentContext } from "./PaymentContext";
import { CreditCardPayment } from "./strategies/CreditCardPayment";
import { PayPalPayment } from "./strategies/PayPalPayment";
import { CryptoPayment } from "./strategies/CryptoPayment";
import { PaymentStrategy } from "./strategies/PaymentStrategy";

const contextCache = new Map<string, PaymentContext>();

function getPaymentContext(method: string): PaymentContext {
  if (contextCache.has(method)) {
    return contextCache.get(method)!;
  }
  let strategy: PaymentStrategy;
  switch (method) {
    case "Credit Card":
      strategy = new CreditCardPayment();
      break;
    case "PayPal":
      strategy = new PayPalPayment();
      break;
    case "Crypto":
      strategy = new CryptoPayment();
      break;
    default:
      throw new Error("Invalid payment method");
  }
  const context = new PaymentContext(strategy);
  contextCache.set(method, context);
  return context;
}

async function main() {
  const { method, amount } = await inquirer.prompt([
    {
      type: "list",
      name: "method",
      message: "Select payment method:",
      choices: ["Credit Card", "PayPal", "Crypto"],
    },
    {
      type: "number",
      name: "amount",
      message: "Enter payment amount:",
      validate: (value) =>
        value && value > 0 ? true : "Amount must be greater than 0",
    },
  ]);

  const context = getPaymentContext(method);
  context.pay(amount);
}

main();
