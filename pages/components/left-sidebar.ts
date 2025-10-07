import type { Locator } from '@playwright/test'

class CategorySection {
  readonly container: Locator
  readonly heading: Locator
  readonly womenCategory: Locator
  readonly menCategory: Locator
  readonly kidsCategory: Locator

  constructor(container: Locator) {
    this.container = container
    this.heading = this.container.page().locator('h2').first()
    this.womenCategory = this.container.locator('a[href="#Women"]')
    this.menCategory = this.container.locator('a[href="#Men"]')
    this.kidsCategory = this.container.locator('a[href="#Kids"]')
  }

  getSubcategoryLink(categoryId: number) {
    return this.container.locator(`a[href="/category_products/${categoryId}"]`)
  }
}

class BrandsSection {
  readonly container: Locator
  readonly heading: Locator
  readonly brandsList: Locator

  constructor(container: Locator) {
    this.container = container
    this.heading = this.container.locator('h2')
    this.brandsList = this.container.locator('ul li')
  }

  getBrandLink(brandName: string) {
    return this.container.locator(`a[href="/brand_products/${brandName}"]`)
  }

  async getAllBrandNames() {
    return await this.brandsList.locator('a').allTextContents()
  }
}

export class LeftSidebar {
  readonly container: Locator
  readonly categories: CategorySection
  readonly brands: BrandsSection

  constructor(container: Locator) {
    this.container = container
    this.categories = new CategorySection(this.container.locator('.panel-group'))
    this.brands = new BrandsSection(this.container.locator('.brands_products'))
  }
}
