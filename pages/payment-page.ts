import type { Locator, Page } from '@playwright/test'
import type { CreditCardData } from '../data/factories/credit-card-data'
import { BasePage } from './base-page'

export class PaymentPage extends BasePage {
  readonly URL = '/payment'
  readonly container: Locator
  readonly title: Locator
  readonly nameOnCard: Locator
  readonly cardNumber: Locator
  readonly cvc: Locator
  readonly expirationMonth: Locator
  readonly expirationYear: Locator
  readonly payAndConfirmButton: Locator
  readonly successAlert: Locator

  constructor(page: Page) {
    super(page)
    this.container = page.locator('#cart_items')
    this.title = this.container.locator('.step-one h2')
    this.nameOnCard = this.container.getByTestId('name-on-card')
    this.cardNumber = this.container.getByTestId('card-number')
    this.cvc = this.container.getByTestId('cvc')
    this.expirationMonth = this.container.getByTestId('expiry-month')
    this.expirationYear = this.container.getByTestId('expiry-year')
    this.payAndConfirmButton = this.container.getByTestId('pay-button')
    this.successAlert = this.container.locator('div#success_message div.alert-success.alert')
  }

  async fillCardForm(creditCard: CreditCardData) {
    await this.nameOnCard.fill(creditCard.nameOnCard)
    await this.cardNumber.fill(creditCard.cardNumber)
    await this.cvc.fill(creditCard.cvc)
    await this.expirationMonth.fill(creditCard.expirationMonth)
    await this.expirationYear.fill(creditCard.expirationYear)
  }

  async preventNavigation() {
    await this.page.evaluate(() => {
      const form = document.querySelector('#payment-form') as HTMLFormElement
      if (form && !form.dataset.preventionActive) {
        const handler = (e: Event) => {
          e.preventDefault()
          const successMessage = document.querySelector('#success_message') as HTMLElement
          if (successMessage) {
            successMessage.classList.remove('hide')
          }
        }
        form.addEventListener('submit', handler, true)
        form.dataset.preventionActive = 'true'
        ;(form as any)._preventHandler = handler
      }
    })
  }

  async restoreDefaultActions() {
    await this.page.evaluate(() => {
      const form = document.querySelector('#payment-form') as HTMLFormElement
      if (form && form.dataset.preventionActive) {
        const handler = (form as any)._preventHandler
        if (handler) {
          form.removeEventListener('submit', handler, true)
        }
        delete form.dataset.preventionActive
        delete (form as any)._preventHandler
      }
    })
  }
}
