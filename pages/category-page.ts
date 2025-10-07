import type { Locator, Page } from '@playwright/test'
import { BasePage } from './base-page'
import { LeftSidebar, Product } from './components'

export class CategoryPage extends BasePage {
  readonly URL = '/category_products'
  readonly container: Locator
  readonly title: Locator
  readonly productsList: Locator
  readonly leftSidebar: LeftSidebar

  constructor(page: Page) {
    super(page)
    this.container = page.locator('.container')
    this.title = this.container.locator('.features_items h2.title.text-center')
    this.productsList = this.container.locator('.features_items .product-image-wrapper')
    this.leftSidebar = new LeftSidebar(page.locator('.left-sidebar'))
  }

  getProductByIndex(index: number) {
    return new Product(this.productsList.nth(index))
  }
}
