import type { Locator } from '@playwright/test'

class SubscriptionForm {
  readonly container: Locator
  readonly title: Locator
  readonly emailInput: Locator
  readonly submitButton: Locator
  readonly successAlert: Locator

  constructor(container: Locator) {
    this.container = container
    this.title = this.container.locator('h2')
    this.emailInput = this.container.locator('#susbscribe_email, input[type="email"]')
    this.submitButton = this.container.locator('#subscribe')
    this.successAlert = this.container.page().locator('.alert-success')
  }
}

export class FooterComponent {
  readonly container: Locator
  readonly subscription: SubscriptionForm

  constructor(container: Locator) {
    this.container = container
    this.subscription = new SubscriptionForm(this.container.locator('.single-widget'))
  }

  async doSubscribe(email: string) {
    await this.subscription.emailInput.fill(email)
    await this.subscription.submitButton.click()
  }
}
