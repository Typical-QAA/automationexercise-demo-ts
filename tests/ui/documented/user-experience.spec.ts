// Based on docs/test-cases/ui/README.md - Test Cases 21, 25-26
// User experience features: reviews and scroll functionality

import { TAGS } from '../../../data/constants'
import { test } from '../../../fixtures'
import { navigateToHomeAndVerify, scrollToFooterAndVerifySubscription, verifyElementTextVisible, verifyPageWithActiveNav } from '../helpers'

test.describe('User Experience Tests', () => {
  test(
    `Test Case 21: Add review on product`,
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.UI, TAGS.PRIORITY.HIGH, TAGS.EXECUTION.REGRESSION] },
    async ({ pages, testData }) => {
      const productIndex = 0
      const user = testData.user.getUser()
      const reviewMessage = testData.text.getParagraph()

      await test.step(`Navigate to url 'http://automationexercise.com'`, async () => {
        await pages.home.navigate()
      })
      await test.step(`Click on 'Products' button`, async () => {
        await pages.home.header.productsLink.click()
      })
      await test.step(`Verify user is navigated to ALL PRODUCTS page successfully`, async () => {
        await verifyPageWithActiveNav(pages.products, pages.products.header.productsLink)
        await verifyElementTextVisible(pages.products.title, 'All Products')
      })
      await test.step(`Click on 'View Product' button`, async () => {
        const product = pages.products.getProductByIndex(productIndex)
        await product.viewProductLink.click()
      })
      await test.step(`Verify 'Write Your Review' is visible`, async () => {
        await verifyElementTextVisible(pages.productDetail.reviews.title, 'Write Your Review')
      })
      await test.step(`Enter name, email and review`, async () => {
        await pages.productDetail.reviews.nameInput.fill(user.name)
        await pages.productDetail.reviews.emailInput.fill(user.email)
        await pages.productDetail.reviews.messageInput.fill(reviewMessage)
      })
      await test.step(`Click 'Submit' button`, async () => {
        await pages.productDetail.reviews.submitButton.click()
      })
      await test.step(`Verify success message 'Thank you for your review.'`, async () => {
        await verifyElementTextVisible(pages.productDetail.reviews.successAlert, 'Thank you for your review.')
      })
    }
  )

  test(
    `Test Case 25: Verify Scroll Up using 'Arrow' button and Scroll Down functionality`,
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.UI, TAGS.PRIORITY.MEDIUM, TAGS.EXECUTION.REGRESSION] },
    async ({ pages }) => {
      await navigateToHomeAndVerify(pages)
      await scrollToFooterAndVerifySubscription(pages.home)
      await test.step(`Click on arrow at bottom right side to move upward`, async () => {
        await pages.home.scrollUpButton.click()
      })
      await test.step(`Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen`, async () => {
        await verifyElementTextVisible(pages.home.carousel.activeItem.titleH2, 'Full-Fledged practice website for Automation Engineers')
      })
    }
  )

  test(
    `Test Case 26: Verify Scroll Up without 'Arrow' button and Scroll Down functionality`,
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.UI, TAGS.PRIORITY.MEDIUM, TAGS.EXECUTION.REGRESSION] },
    async ({ pages }) => {
      await navigateToHomeAndVerify(pages)
      await scrollToFooterAndVerifySubscription(pages.home)
      await test.step(`Scroll up page to top`, async () => {
        await pages.home.header.container.scrollIntoViewIfNeeded()
      })
      await test.step(`Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen`, async () => {
        await verifyElementTextVisible(pages.home.carousel.activeItem.titleH2, 'Full-Fledged practice website for Automation Engineers')
      })
    }
  )
})
