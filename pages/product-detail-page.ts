import type { Locator, Page } from '@playwright/test'
import { BasePage } from './base-page'
import { AddToCartModal } from './components'

class ProductInformation {
  readonly container: Locator
  readonly name: Locator
  readonly category: Locator
  readonly price: Locator
  readonly quantity: Locator
  readonly availability: Locator
  readonly condition: Locator
  readonly brand: Locator
  readonly addToCartButton: Locator

  constructor(container: Locator) {
    this.container = container
    // NOTE: locators require data-qa attributes for stability
    this.name = this.container.getByRole('heading', { level: 2 })
    this.category = this.container.locator('p:has-text("Category:")')
    this.price = this.container.locator('span span')
    this.quantity = this.container.locator('#quantity')
    this.availability = this.container.locator('p:has-text("Availability:")')
    this.condition = this.container.locator('p:has-text("Condition:")')
    this.brand = this.container.locator('p:has-text("Brand:")')
    this.addToCartButton = this.container.locator('button.cart')
  }
}

class ProductReviews {
  readonly container: Locator
  readonly title: Locator
  readonly nameInput: Locator
  readonly emailInput: Locator
  readonly messageInput: Locator
  readonly submitButton: Locator
  readonly successAlert: Locator

  constructor(container: Locator) {
    this.container = container
    this.title = this.container.locator('li a[href="#reviews"]')
    this.nameInput = this.container.locator('input#name')
    this.emailInput = this.container.locator('input#email')
    this.messageInput = this.container.locator('textarea#review')
    this.submitButton = this.container.locator('button#button-review')
    this.successAlert = this.container.locator('div#review-section div.alert-success.alert span')
  }
}

export class ProductDetailPage extends BasePage {
  readonly URL = '/product_details'
  readonly container: Locator
  readonly information: ProductInformation
  readonly reviews: ProductReviews
  readonly addToCartModal: AddToCartModal

  constructor(page: Page) {
    super(page)
    this.container = page.locator('.container')
    this.information = new ProductInformation(page.locator('div.product-information'))
    this.reviews = new ProductReviews(page.locator('div.category-tab.shop-details-tab'))
    this.addToCartModal = new AddToCartModal(page.locator('#cartModal'))
  }
}
