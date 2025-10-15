import type { Locator } from '@playwright/test'

export class CookiesOverlayComponent {
  readonly container: Locator
  readonly consentButton: Locator

  constructor(container: Locator) {
    this.container = container
    this.consentButton = this.container.locator('button.fc-cta-consent')
  }
}
