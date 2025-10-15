import type { Locator, Page } from '@playwright/test'
import { BasePage } from './base-page'

export class PaymentDonePage extends BasePage {
  readonly URL = '/payment_done'
  readonly container: Locator
  readonly title: Locator
  readonly continueButton: Locator
  readonly downloadInvoiceButton: Locator
  readonly successAlert: Locator

  constructor(page: Page) {
    super(page)
    this.container = page.locator('#form .container')
    this.title = this.container.getByTestId('order-placed')
    this.continueButton = this.container.getByTestId('continue-button')
    this.downloadInvoiceButton = this.container.locator('a[href*="/download_invoice/"]')
    this.successAlert = this.container.locator('p')
  }
}
