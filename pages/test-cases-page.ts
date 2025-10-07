import type { Locator, Page } from '@playwright/test'
import { BasePage } from './base-page'

export class TestCasesPage extends BasePage {
  readonly URL = '/test_cases'
  readonly container: Locator
  readonly title: Locator

  constructor(page: Page) {
    super(page)
    this.container = page.locator('.container')
    this.title = this.container.locator('h2.title.text-center')
  }
}
