// Shared helper functions for UI tests
// Common utilities used across multiple test cases

import type { Locator } from '@playwright/test'
import { expect, test } from '../../fixtures'
import type { AllFixtures } from '../../fixtures/fixtures'
import type { BasePage } from '../../pages'
import type { Product } from '../../pages/components/product'
import type { UserDataPrivate } from '../../types/user.types'

export type ProductTestData = { id: number; name: string; price: string }

export async function verifyPageWithActiveNav(pageObject: BasePage, activeNavLink: Locator) {
  await expect(pageObject.page).toHaveURL(pageObject.URL)
  await expect(activeNavLink).toBeVisible()
  await expect(activeNavLink).toHaveAttribute('style', 'color: orange;')
}

export async function verifyElementTextVisible(element: Locator, expectedText: string) {
  await expect(element).toBeVisible()
  await expect(element).toHaveText(expectedText)
}

export async function scrollToFooterAndVerifySubscription(pageObject: BasePage) {
  await test.step(`Scroll down to footer`, async () => {
    await pageObject.footer.container.scrollIntoViewIfNeeded()
  })
  await test.step(`Verify text 'SUBSCRIPTION'`, async () => {
    await verifyElementTextVisible(pageObject.footer.subscription.title, 'Subscription')
  })
}

export async function collectProductData(product: Product) {
  return {
    id: await product.getProductId(),
    name: (await product.name.textContent())!,
    price: (await product.price.textContent())!
  } as ProductTestData
}

export async function verifyCheckoutDeliveryAddress(pages: AllFixtures['pages'], user: UserDataPrivate) {
  await expect(pages.checkout.information.deliveryAddress.userTitleFirstLast).toHaveText(
    `${user.title}. ${user.firstname} ${user.lastname}`
  )
  await expect(pages.checkout.information.deliveryAddress.company).toHaveText(user.company)
  await expect(pages.checkout.information.deliveryAddress.address1).toHaveText(user.address1)
  await expect(pages.checkout.information.deliveryAddress.address2).toHaveText(user.address2)
  await expect(pages.checkout.information.deliveryAddress.cityStatePost).toHaveText(`${user.city} ${user.state} ${user.zipcode}`)
  await expect(pages.checkout.information.deliveryAddress.country).toHaveText(user.country)
  await expect(pages.checkout.information.deliveryAddress.phone).toHaveText(user.mobile_number)
}

export async function verifyCheckoutInvoiceAddress(pages: AllFixtures['pages'], user: UserDataPrivate) {
  await expect(pages.checkout.information.invoiceAddress.userTitleFirstLast).toHaveText(`${user.title}. ${user.firstname} ${user.lastname}`)
  await expect(pages.checkout.information.invoiceAddress.company).toHaveText(user.company)
  await expect(pages.checkout.information.invoiceAddress.address1).toHaveText(user.address1)
  await expect(pages.checkout.information.invoiceAddress.address2).toHaveText(user.address2)
  await expect(pages.checkout.information.invoiceAddress.cityStatePost).toHaveText(`${user.city} ${user.state} ${user.zipcode}`)
  await expect(pages.checkout.information.invoiceAddress.country).toHaveText(user.country)
  await expect(pages.checkout.information.invoiceAddress.phone).toHaveText(user.mobile_number)
}

export async function verifyCheckoutReviewOrder(pages: AllFixtures['pages'], productData: ProductTestData) {
  const product = pages.checkout.cart.getCartItemById(productData.id)
  await expect(product.container).toBeVisible()
  await expect(product.name).toHaveText(productData.name!)
  await expect(product.price).toHaveText(productData.price!)
}

export async function navigateToHomeAndVerify(pages: AllFixtures['pages']) {
  await test.step(`Navigate to url 'http://automationexercise.com'`, async () => {
    await pages.home.navigate()
  })
  await test.step(`Verify that home page is visible successfully`, async () => {
    await verifyPageWithActiveNav(pages.home, pages.home.header.homeLink)
  })
}

export async function deleteAccountAndVerifyAndContinue(pages: AllFixtures['pages']) {
  await test.step(`Click 'Delete Account' button`, async () => {
    await pages.home.header.deleteAccountLink.click()
  })
  await test.step(`Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button`, async () => {
    await expect(pages.accountDeleted.page).toHaveURL(pages.accountDeleted.URL)
    await verifyElementTextVisible(pages.accountDeleted.title, 'Account Deleted!')
    await pages.accountDeleted.continueButton.click()
  })
}
