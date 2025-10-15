import type { Locator, Page } from '@playwright/test'
import { CookiesOverlayComponent, FooterComponent, HeaderComponent } from './components'

export abstract class BasePage {
  readonly page: Page
  readonly header: HeaderComponent
  readonly footer: FooterComponent
  readonly cookiesOverlay: CookiesOverlayComponent
  readonly scrollUpButton: Locator
  abstract readonly URL: string

  constructor(page: Page) {
    this.page = page
    this.header = new HeaderComponent(page.locator('#header'))
    this.footer = new FooterComponent(page.locator('#footer'))
    this.cookiesOverlay = new CookiesOverlayComponent(page.locator('div.fc-consent-root'))
    this.scrollUpButton = this.page.locator('a#scrollUp[href="#top"]')
  }

  async goto(url: string) {
    // NOTE: prevent ad interference with test execution
    const context = this.page.context()
    await context.route('**/*', request => {
      request.request().url().startsWith('https://googleads.') ? request.abort() : request.continue()
      return
    })

    await this.page.goto(url)

    // NOTE: prevent cookies consent interference with test execution
    await this.page.addLocatorHandler(this.cookiesOverlay.container, async () => {
      await this.cookiesOverlay.consentButton.click()
    })
  }
}
