import type { Locator } from '@playwright/test'

export class HeaderComponent {
  readonly container: Locator
  readonly shopMenu: Locator
  readonly homeLink: Locator
  readonly loginLink: Locator
  readonly loggedInAsText: Locator
  readonly deleteAccountLink: Locator
  readonly logoutLink: Locator
  readonly testCasesLink: Locator
  readonly productsLink: Locator
  readonly cartLink: Locator
  readonly contactUsLink: Locator

  constructor(container: Locator) {
    this.container = container
    this.shopMenu = this.container.locator('div.shop-menu')
    this.homeLink = this.shopMenu.locator('a[href="/"]')
    this.loginLink = this.shopMenu.locator('a[href="/login"]')
    this.loggedInAsText = this.shopMenu.locator('ul.nav.navbar-nav li:has(i.fa-user) a')
    this.deleteAccountLink = this.shopMenu.locator('a[href="/delete_account"][style="color:brown;"]')
    this.logoutLink = this.shopMenu.locator('a[href="/logout"][style="color:brown;"]')
    this.testCasesLink = this.shopMenu.locator('a[href="/test_cases"]')
    this.productsLink = this.shopMenu.locator('a[href="/products"]')
    this.cartLink = this.shopMenu.locator('a[href="/view_cart"]')
    this.contactUsLink = this.shopMenu.locator('a[href="/contact_us"]')
  }
}
