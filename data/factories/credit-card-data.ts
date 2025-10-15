import { faker } from '@faker-js/faker'

export type CreditCardData = { nameOnCard: string; cardNumber: string; cvc: string; expirationMonth: string; expirationYear: string }

export class CreditCardDataFactory {
  static getCreditCard(): CreditCardData {
    // NOTE: ensure test cards pass expiration date validation
    const futureDate = faker.date.future({ years: 5 })
    return {
      nameOnCard: faker.person.fullName(),
      cardNumber: faker.finance.creditCardNumber(),
      cvc: faker.finance.creditCardCVV(),
      // NOTE: maintain standard two-digit month format for card validation
      expirationMonth: (futureDate.getMonth() + 1).toString().padStart(2, '0'),
      expirationYear: futureDate.getFullYear().toString()
    }
  }
}
