import type { Locator, Page } from '@playwright/test'
import { BasePage } from './base-page'
import { AddToCartModal, LeftSidebar, Product } from './components'

export class ProductsPage extends BasePage {
  readonly URL = '/products'
  readonly container: Locator
  readonly title: Locator
  readonly productsList: Locator
  readonly searchInput: Locator
  readonly searchButton: Locator
  readonly productNames: Locator
  readonly addToCartModal: AddToCartModal
  readonly leftSidebar: LeftSidebar

  constructor(page: Page) {
    super(page)
    this.container = page.locator('.features_items')
    this.title = page.locator('h2.title.text-center')
    this.productsList = this.container.locator('.product-image-wrapper')
    this.searchInput = page.locator('input[placeholder*="Search" i], #search_product')
    this.searchButton = page.locator('#submit_search')
    this.productNames = this.productsList.locator('.productinfo p')
    this.addToCartModal = new AddToCartModal(page.locator('#cartModal'))
    this.leftSidebar = new LeftSidebar(page.locator('.left-sidebar'))
  }

  getProductByIndex(index: number) {
    return new Product(this.productsList.nth(index))
  }
  getProductById(id: number) {
    return new Product(this.productsList.filter({ has: this.page.locator(`a[data-product-id="${id}"]`) }))
  }

  async getAllProductNames() {
    const productLocators = await this.productsList.all()
    const names: (string | null)[] = []

    for (const locator of productLocators) {
      const product = new Product(locator)
      names.push(await product.name.textContent())
    }

    return names
  }

  async addAllProductsToCart() {
    const productLocators = await this.productsList.all()

    for (const locator of productLocators) {
      const product = new Product(locator)
      await product.addToCartAndContinue()
    }
  }

  async doSearch(searchParam: string) {
    await this.searchInput.fill(searchParam)
    await this.searchButton.click()
  }
}
