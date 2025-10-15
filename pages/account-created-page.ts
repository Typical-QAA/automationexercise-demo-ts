import type { Locator, Page } from '@playwright/test'
import { BasePage } from './base-page'

export class AccountCreatedPage extends BasePage {
  readonly URL = '/account_created'
  readonly container: Locator
  readonly title: Locator
  readonly continueButton: Locator

  constructor(page: Page) {
    super(page)
    this.container = page.locator('.container')
    this.title = this.container.getByTestId('account-created')
    this.continueButton = this.container.getByTestId('continue-button')
  }
}
