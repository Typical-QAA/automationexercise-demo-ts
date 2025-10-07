import type { Locator } from '@playwright/test'
import { AddToCartModal } from './add-to-cart-modal'

export class ProductOverlay {
  readonly container: Locator
  readonly content: Locator
  readonly addToCartButton: Locator

  constructor(product: Locator) {
    this.container = product.locator('.product-overlay')
    this.content = this.container.locator('.overlay-content')
    this.addToCartButton = this.content.locator('.add-to-cart')
  }
}

export class Product {
  readonly container: Locator
  readonly viewProductLink: Locator
  readonly info: Locator
  readonly name: Locator
  readonly price: Locator
  readonly addToCartButton: Locator
  readonly overlay: ProductOverlay

  constructor(container: Locator) {
    this.container = container
    this.viewProductLink = this.container.locator('a[href*="/product_details/"]')
    this.info = this.container.locator('div.productinfo')
    this.name = this.info.locator('p')
    this.price = this.info.getByRole('heading', { level: 2 })
    this.addToCartButton = this.info.locator('.add-to-cart')
    this.overlay = new ProductOverlay(container)
  }

  async getProductId() {
    return Number((await this.addToCartButton.getAttribute('data-product-id')) || '0')
  }

  async addToCartAndContinue() {
    const modal = new AddToCartModal(this.container.page().locator('#cartModal'))
    await this.container.hover()
    await this.overlay.addToCartButton.click()
    await modal.continueShoppingButton.click()
  }
}

