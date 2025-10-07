import type { Locator } from '@playwright/test'

export class CartItem {
  readonly container: Locator
  readonly name: Locator
  readonly price: Locator
  readonly total: Locator
  readonly quantityButton: Locator
  readonly deleteButton: Locator

  constructor(container: Locator) {
    this.container = container
    this.name = this.container.locator('.cart_description h4 a')
    this.price = this.container.locator('.cart_price p')
    this.total = this.container.locator('.cart_total p')
    this.quantityButton = this.container.locator('.cart_quantity button')
    this.deleteButton = this.container.locator('.cart_delete a')
  }
}
