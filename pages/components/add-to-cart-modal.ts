import type { Locator } from '@playwright/test'

export class AddToCartModal {
  readonly container: Locator
  readonly viewCartLink: Locator
  readonly continueShoppingButton: Locator

  constructor(container: Locator) {
    this.container = container
    this.viewCartLink = this.container.locator('a[href="/view_cart"]')
    this.continueShoppingButton = this.container.locator('button[data-dismiss="modal"]')
  }
}
