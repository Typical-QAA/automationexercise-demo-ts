// Based on docs/test-cases/ui/README.md - Test Cases 6-8, 10-11
// Page navigation, content verification, and subscription functionality

import { TAGS } from '../../../data/constants'
import { expect, test } from '../../../fixtures'
import { verifyPageWithActiveNav, verifyElementTextVisible, navigateToHomeAndVerify } from '../helpers'

test.describe('Content and Navigation Tests', () => {
  test(
    `Test Case 6: Contact Us Form`,
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.UI, TAGS.PRIORITY.MEDIUM, TAGS.EXECUTION.REGRESSION, TAGS.SPEED.SLOW] },
    async ({ pages, testData }) => {
      const user = testData.user.getUser()
      const contactSubject = testData.text.getSentence()
      const contactMessage = testData.text.getParagraph()
      const contactFile = { name: 'test-file.txt', mimeType: 'text/plain', buffer: Buffer.from(testData.text.getSentence()) }

      await navigateToHomeAndVerify(pages)
      await test.step(`Click on 'Contact Us' button`, async () => {
        await pages.home.header.contactUsLink.click()
      })
      await test.step(`Verify 'GET IN TOUCH' is visible`, async () => {
        await verifyPageWithActiveNav(pages.contactUs, pages.contactUs.header.contactUsLink)
        await verifyElementTextVisible(pages.contactUs.contactForm.title, 'Get In Touch')
      })
      await test.step(`Enter name, email, subject and message`, async () => {
        await pages.contactUs.fillContactForm(user.name, user.email, contactSubject, contactMessage)
      })
      await test.step(`Upload file`, async () => {
        await pages.contactUs.contactForm.fileInput.setInputFiles(contactFile)
      })
      await test.step(`Click 'Submit' button`, async () => {
        // NOTE: setup dialog handler before triggering action that shows dialog
        // https://playwright.dev/docs/dialogs
        pages.contactUs.page.on('dialog', async dialog => {
          expect(dialog.type()).toContain('confirm')
          expect(dialog.message()).toContain('Press OK to proceed!')
          await dialog.accept()
        })
        // NOTE: wait for client-side event binding to complete
        await pages.contactUs.page.waitForTimeout(1000)
        await pages.contactUs.contactForm.submitButton.click()
      })
      await test.step(`Click OK button`, async () => {
        // NOTE: ensure dialog response is fully processed before continuing
        await pages.contactUs.page.waitForTimeout(2000)
      })
      await test.step(`Verify success message 'Success! Your details have been submitted successfully.' is visible`, async () => {
        await verifyElementTextVisible(pages.contactUs.contactForm.successAlert, 'Success! Your details have been submitted successfully.')
      })
      await test.step(`Click 'Home' button and verify that landed to home page successfully`, async () => {
        await pages.contactUs.contactForm.homeButton.click()
        await verifyPageWithActiveNav(pages.home, pages.home.header.homeLink)
      })
    }
  )

  test(
    `Test Case 7: Verify Test Cases Page`,
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.UI, TAGS.PRIORITY.MEDIUM, TAGS.EXECUTION.REGRESSION] },
    async ({ pages }) => {
      await navigateToHomeAndVerify(pages)
      await test.step(`Click on 'Test Cases' button`, async () => {
        await pages.home.header.testCasesLink.click()
      })
      await test.step(`Verify user is navigated to test cases page successfully`, async () => {
        await verifyPageWithActiveNav(pages.testCases, pages.testCases.header.testCasesLink)
        await verifyElementTextVisible(pages.testCases.title, 'Test Cases')
      })
    }
  )

  test(
    `Test Case 8: Verify All Products and product detail page`,
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.UI, TAGS.PRIORITY.MEDIUM, TAGS.EXECUTION.REGRESSION] },
    async ({ pages }) => {
      const firstProductIndex = 0

      await navigateToHomeAndVerify(pages)
      await test.step(`Click on 'Products' button`, async () => {
        await pages.home.header.productsLink.click()
      })
      await test.step(`Verify user is navigated to ALL PRODUCTS page successfully`, async () => {
        await verifyPageWithActiveNav(pages.products, pages.products.header.productsLink)
        await verifyElementTextVisible(pages.products.title, 'All Products')
      })
      await test.step(`The products list is visible`, async () => {
        await expect(pages.products.container).toBeVisible()
      })
      await test.step(`Click on 'View Product' of first product`, async () => {
        await pages.products.getProductByIndex(firstProductIndex).viewProductLink.click()
      })
      await test.step(`User is landed to product detail page`, async () => {
        await expect(pages.productDetail.page).toHaveURL(`${pages.productDetail.URL}/${firstProductIndex + 1}`)
      })
      await test.step(`Verify that detail detail is visible: product name, category, price, availability, condition, brand`, async () => {
        await expect(pages.productDetail.information.name).toBeVisible()
        await expect(pages.productDetail.information.category).toBeVisible()
        await expect(pages.productDetail.information.price).toBeVisible()
        await expect(pages.productDetail.information.availability).toBeVisible()
        await expect(pages.productDetail.information.condition).toBeVisible()
        await expect(pages.productDetail.information.brand).toBeVisible()
      })
    }
  )

  test(
    `Test Case 10: Verify Subscription in home page`,
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.UI, TAGS.PRIORITY.MEDIUM, TAGS.EXECUTION.REGRESSION] },
    async ({ pages, testData }) => {
      const user = testData.user.getUserCredentials()

      await navigateToHomeAndVerify(pages)
      await test.step(`Scroll down to footer`, async () => {
        await pages.home.footer.container.scrollIntoViewIfNeeded()
      })
      await test.step(`Verify text 'SUBSCRIPTION'`, async () => {
        await verifyElementTextVisible(pages.home.footer.subscription.title, 'Subscription')
      })
      await test.step(`Enter email address in input and click arrow button`, async () => {
        await pages.home.footer.doSubscribe(user.email)
      })
      await test.step(`Verify success message 'You have been successfully subscribed!' is visible`, async () => {
        await verifyElementTextVisible(pages.home.footer.subscription.successAlert, 'You have been successfully subscribed!')
      })
    }
  )

  test(
    `Test Case 11: Verify Subscription in Cart page`,
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.UI, TAGS.PRIORITY.MEDIUM, TAGS.EXECUTION.REGRESSION] },
    async ({ pages, testData }) => {
      const user = testData.user.getUserCredentials()

      await navigateToHomeAndVerify(pages)
      await test.step(`Click 'Cart' button`, async () => {
        await pages.home.header.cartLink.click()
      })
      await test.step(`Scroll down to footer`, async () => {
        await pages.cart.footer.container.scrollIntoViewIfNeeded()
      })
      await test.step(`Verify text 'SUBSCRIPTION'`, async () => {
        await verifyElementTextVisible(pages.cart.footer.subscription.title, 'Subscription')
      })
      await test.step(`Enter email address in input and click arrow button`, async () => {
        await pages.cart.footer.doSubscribe(user.email)
      })
      await test.step(`Verify success message 'You have been successfully subscribed!' is visible`, async () => {
        await verifyElementTextVisible(pages.cart.footer.subscription.successAlert, 'You have been successfully subscribed!')
      })
    }
  )
})
