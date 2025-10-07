import type { Locator, Page } from '@playwright/test'
import { BasePage } from './base-page'
import { CartItem } from './components'

class AddressInformation {
  readonly container: Locator
  readonly title: Locator
  readonly userTitleFirstLast: Locator
  readonly company: Locator
  readonly address1: Locator
  readonly address2: Locator
  readonly cityStatePost: Locator
  readonly country: Locator
  readonly phone: Locator

  constructor(container: Locator) {
    // NOTE: locators require data-qa attributes for stability
    this.container = container
    this.title = container.locator('li').nth(0)
    this.userTitleFirstLast = container.locator('li').nth(1)
    this.company = container.locator('li').nth(2)
    this.address1 = container.locator('li').nth(3)
    this.address2 = container.locator('li').nth(4)
    this.cityStatePost = container.locator('li').nth(5)
    this.country = container.locator('li').nth(6)
    this.phone = container.locator('li').nth(7)
  }
}

class CheckoutInformation {
  readonly container: Locator
  readonly deliveryAddress: AddressInformation
  readonly invoiceAddress: AddressInformation

  constructor(container: Locator) {
    this.container = container
    this.deliveryAddress = new AddressInformation(container.locator('#address_delivery'))
    this.invoiceAddress = new AddressInformation(container.locator('#address_invoice'))
  }
}

class CartInformation {
  readonly container: Locator
  readonly cartItemsList: Locator

  constructor(container: Locator) {
    this.container = container
    this.cartItemsList = this.container.locator('tbody tr')
  }

  getCartItemByIndex(index: number) {
    return new CartItem(this.cartItemsList.nth(index))
  }
  getCartItemById(id: number) {
    return new CartItem(this.cartItemsList.filter({ has: this.cartItemsList.page().locator(`:scope[id="product-${id}"]`) }))
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

export class CheckoutPage extends BasePage {
  readonly URL = '/checkout'
  readonly container: Locator
  readonly information: CheckoutInformation
  readonly cart: CartInformation
  readonly messageInput: Locator
  readonly placeOrderButton: Locator

  constructor(page: Page) {
    super(page)
    this.container = page.locator('.container')
    this.information = new CheckoutInformation(page.getByTestId('checkout-info'))
    this.cart = new CartInformation(page.locator('#cart_info'))
    this.messageInput = this.container.locator('#ordermsg textarea')
    this.placeOrderButton = this.container.locator('a[href="/payment"]')
  }
}
