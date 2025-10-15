import type { Locator, Page } from '@playwright/test'
import { BasePage } from './base-page'
import { AddToCartModal, LeftSidebar, Product } from './components'

class ActiveItem {
  readonly container: Locator
  readonly titleH1: Locator
  readonly titleH2: Locator

  constructor(item: Locator) {
    this.container = item.locator('div.item.active')
    this.titleH1 = this.container.getByRole('heading', { level: 1 })
    this.titleH2 = this.container.getByRole('heading', { level: 2 })
  }
}

class Carousel {
  readonly container: Locator
  readonly activeItem: ActiveItem

  constructor(container: Locator) {
    this.container = container
    this.activeItem = new ActiveItem(this.container)
  }
}

class Products {
  readonly container: Locator
  readonly productsList: Locator

  constructor(container: Locator) {
    this.container = container
    this.productsList = this.container.locator('.product-image-wrapper')
  }

  getProductByIndex(index: number) {
    return new Product(this.productsList.nth(index))
  }
  getProductById(id: number) {
    return new Product(this.productsList.filter({ has: this.container.locator(`a[data-product-id="${id}"]`) }))
  }
}

class Recommended {
  readonly container: Locator
  readonly title: Locator
  readonly productsList: Locator

  constructor(container: Locator) {
    this.container = container
    this.title = this.container.locator('h2.title.text-center')
    this.productsList = this.container.locator('div.item.active .product-image-wrapper')
  }

  getProductByIndex(index: number) {
    return new Product(this.productsList.nth(index))
  }
  getProductById(id: number) {
    return new Product(this.productsList.filter({ has: this.container.locator(`a[data-product-id="${id}"]`) }))
  }
}

export class HomePage extends BasePage {
  readonly URL = '/'
  readonly container: Locator
  readonly carousel: Carousel
  readonly products: Products
  readonly recommended: Recommended
  readonly addToCartModal: AddToCartModal
  readonly leftSidebar: LeftSidebar

  constructor(page: Page) {
    super(page)
    this.container = page.locator('.container')
    this.carousel = new Carousel(page.locator('#slider-carousel'))
    this.products = new Products(page.locator('section:has(div.features_items)'))
    this.recommended = new Recommended(page.locator('.recommended_items'))
    this.addToCartModal = new AddToCartModal(page.locator('#cartModal'))
    this.leftSidebar = new LeftSidebar(page.locator('.left-sidebar'))
  }

  async navigate() {
    await this.goto(this.URL)
  }
}
