import type { Locator, Page } from '@playwright/test'
import { BasePage } from './base-page'

export class AccountDeletedPage extends BasePage {
  readonly URL = '/delete_account'
  readonly container: Locator
  readonly title: Locator
  readonly continueButton: Locator

  constructor(page: Page) {
    super(page)
    this.container = page.locator('.container')
    this.title = this.container.getByTestId('account-deleted')
    this.continueButton = this.container.getByTestId('continue-button')
  }
}
