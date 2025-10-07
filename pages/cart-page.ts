import type { Locator, Page } from '@playwright/test'
import { BasePage } from './base-page'
import { CartItem } from './components'

export class LoginRegisterModal {
  readonly container: Locator
  readonly loginLink: Locator
  readonly continueShoppingButton: Locator

  constructor(container: Locator) {
    this.container = container
    this.loginLink = this.container.locator('a[href*="/login"]')
    this.continueShoppingButton = this.container.locator('.close-checkout-modal')
  }
}

export class CartPage extends BasePage {
  readonly URL = '/view_cart'
  readonly container: Locator
  readonly cartItemsList: Locator
  readonly checkoutButton: Locator
  readonly cartEmptyMessage: Locator
  readonly loginRegisterModal: LoginRegisterModal

  constructor(page: Page) {
    super(page)
    this.container = page.locator('#cart_items')
    this.cartItemsList = this.container.locator('#cart_info tbody tr')
    this.checkoutButton = this.container.locator('#do_action a.check_out')
    this.cartEmptyMessage = this.container.locator('#empty_cart')
    this.loginRegisterModal = new LoginRegisterModal(page.locator('#checkoutModal'))
  }

  getCartItemByIndex(index: number) {
    return new CartItem(this.cartItemsList.nth(index))
  }
  getCartItemById(id: number) {
    return new CartItem(this.cartItemsList.filter({ has: this.page.locator(`:scope[id="product-${id}"]`) }))
  }

  async getAllProductNames() {
    const cartItemLocators = await this.cartItemsList.all()
    const names: (string | null)[] = []

    for (const locator of cartItemLocators) {
      const cartItem = new CartItem(locator)
      names.push(await cartItem.name.textContent())
    }

    return names
  }
}
