// Based on docs/test-cases/ui/README.md - Test Cases 12-13, 17, 22
// Cart operations: add, verify quantity, remove, recommendations

import { TAGS } from '../../../data/constants'
import { expect, test } from '../../../fixtures'
import { collectProductData, navigateToHomeAndVerify, verifyElementTextVisible, verifyPageWithActiveNav } from '../helpers'
import type { ProductTestData } from '../helpers'

test.describe('Cart Operations Tests', () => {
  test(
    `Test Case 12: Add Products in Cart`,
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.UI, TAGS.PRIORITY.CRITICAL, TAGS.EXECUTION.SMOKE, TAGS.SPEED.SLOW] },
    async ({ pages }) => {
      const productQuantity = 1
      const product1Id = 1
      const product2Id = 2
      let productData1: ProductTestData
      let productData2: ProductTestData

      await navigateToHomeAndVerify(pages)
      await test.step(`Click 'Products' button`, async () => {
        await pages.home.header.productsLink.click()
      })
      await test.step(`Hover over first product and click 'Add to cart'`, async () => {
        const product1 = pages.products.getProductById(product1Id)
        productData1 = await collectProductData(product1)
        await product1.container.hover()
        await product1.overlay.addToCartButton.click()
      })
      await test.step(`Click 'Continue Shopping' button`, async () => {
        await pages.products.addToCartModal.continueShoppingButton.click()
      })
      await test.step(`Hover over second product and click 'Add to cart'`, async () => {
        const product2 = pages.products.getProductById(product2Id)
        productData2 = await collectProductData(product2)
        await product2.container.hover()
        await product2.overlay.addToCartButton.click()
      })
      await test.step(`Click 'View Cart' button`, async () => {
        await pages.products.addToCartModal.viewCartLink.click()
      })
      await test.step(`Verify both products are added to Cart`, async () => {
        await verifyPageWithActiveNav(pages.cart, pages.cart.header.cartLink)
        await expect(pages.cart.cartItemsList).toHaveCount(2)
      })
      await test.step(`Verify their prices, quantity and total price`, async () => {
        const cartItem1 = pages.cart.getCartItemById(product1Id)
        const cartItem2 = pages.cart.getCartItemById(product2Id)

        expect(Number(await cartItem1.quantityButton.textContent())).toEqual(productQuantity)
        expect(await cartItem1.price.textContent()).toEqual(productData1.price)
        expect(await cartItem1.total.textContent()).toEqual(productData1.price)

        expect(Number(await cartItem2.quantityButton.textContent())).toEqual(productQuantity)
        expect(await cartItem2.price.textContent()).toEqual(productData2.price)
        expect(await cartItem2.total.textContent()).toEqual(productData2.price)
      })
    }
  )

  test(
    `Test Case 13: Verify Product quantity in Cart`,
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.UI, TAGS.PRIORITY.HIGH, TAGS.EXECUTION.REGRESSION] },
    async ({ pages }) => {
      const productIndex = 0
      const productQuantity = 4
      let productId: number

      await navigateToHomeAndVerify(pages)
      await test.step(`Click 'View Product' for any product on home page`, async () => {
        const product = pages.home.products.getProductByIndex(productIndex)
        productId = await product.getProductId()

        await product.viewProductLink.click()
      })
      await test.step(`Verify product detail is opened`, async () => {
        await expect(pages.productDetail.page).toHaveURL(`${pages.productDetail.URL}/${productId}`)
      })
      await test.step(`Increase quantity to 4`, async () => {
        await pages.productDetail.information.quantity.fill(productQuantity.toString())
      })
      await test.step(`Click 'Add to cart' button`, async () => {
        await pages.productDetail.information.addToCartButton.click()
      })
      await test.step(`Click 'View Cart' button`, async () => {
        await pages.productDetail.addToCartModal.viewCartLink.click()
      })
      await test.step(`Verify that product is displayed in cart page with exact quantity`, async () => {
        expect(Number(await pages.cart.getCartItemById(productId).quantityButton.textContent())).toEqual(productQuantity)
      })
    }
  )

  test(
    `Test Case 17: Remove Products From Cart`,
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.UI, TAGS.PRIORITY.MEDIUM, TAGS.EXECUTION.REGRESSION] },
    async ({ pages }) => {
      const productIndex = 0
      let productId: number

      await navigateToHomeAndVerify(pages)
      await test.step(`Add products to cart`, async () => {
        const product = pages.home.products.getProductByIndex(productIndex)
        productId = await product.getProductId()
        await product.addToCartAndContinue()
      })
      await test.step(`Click 'Cart' button`, async () => {
        await pages.home.header.cartLink.click()
      })
      await test.step(`Verify that cart page is displayed`, async () => {
        await verifyPageWithActiveNav(pages.cart, pages.cart.header.cartLink)
      })
      await test.step(`Click 'X' button corresponding to particular product`, async () => {
        await pages.cart.getCartItemById(productId).deleteButton.click()
      })
      await test.step(`Verify that product is removed from the cart`, async () => {
        await expect(pages.cart.cartEmptyMessage).toBeVisible()
        await expect(pages.cart.cartItemsList).not.toBeVisible()
      })
    }
  )

  test(
    `Test Case 22: Add to cart from Recommended items`,
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.UI, TAGS.PRIORITY.MEDIUM, TAGS.EXECUTION.REGRESSION] },
    async ({ pages }) => {
      const productIndex = 1
      let productId: number

      await test.step(`Navigate to url 'http://automationexercise.com'`, async () => {
        await pages.home.navigate()
      })
      await test.step(`Scroll to bottom of page`, async () => {
        await pages.home.footer.container.scrollIntoViewIfNeeded()
      })
      await test.step(`Verify 'RECOMMENDED ITEMS' are visible`, async () => {
        await verifyElementTextVisible(pages.home.recommended.title, 'recommended items')
      })
      await test.step(`Click on 'Add To Cart' on Recommended product`, async () => {
        const product = pages.home.recommended.getProductByIndex(productIndex)
        productId = await product.getProductId()
        await product.addToCartButton.click()
      })
      await test.step(`Click on 'View Cart' button`, async () => {
        await pages.home.addToCartModal.viewCartLink.click()
      })
      await test.step(`Verify that product is displayed in cart page`, async () => {
        await expect(pages.cart.getCartItemById(productId).container).toBeVisible()
      })
    }
  )
})
