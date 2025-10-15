// Based on docs/test-cases/ui/README.md - Test Cases 14-16, 23-24
// Complete checkout flows, address verification, and order management

import { TAGS } from '../../../data/constants'
import { expect, test } from '../../../fixtures'
import {
  verifyPageWithActiveNav,
  verifyElementTextVisible,
  navigateToHomeAndVerify,
  collectProductData,
  verifyCheckoutDeliveryAddress,
  verifyCheckoutInvoiceAddress,
  verifyCheckoutReviewOrder,
  deleteAccountAndVerifyAndContinue,
  ProductTestData
} from '../helpers'

test.describe('Checkout and Order Tests', () => {
  test(
    `Test Case 14: Place Order: Register while Checkout`,
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.UI, TAGS.PRIORITY.CRITICAL, TAGS.EXECUTION.SMOKE, TAGS.SPEED.SLOW] },
    async ({ pages, testData }) => {
      const user = testData.user.getUser()
      const creditCard = testData.creditCard.getCreditCard()
      const commentMessage = testData.text.getParagraph()
      const productIndex = 0
      let productData: ProductTestData

      await navigateToHomeAndVerify(pages)
      await test.step(`Add products to cart`, async () => {
        const product = pages.home.products.getProductByIndex(productIndex)
        productData = await collectProductData(product)
        await product.addToCartAndContinue()
      })
      await test.step(`Click 'Cart' button`, async () => {
        await pages.home.header.cartLink.click()
      })
      await test.step(`Verify that cart page is displayed`, async () => {
        await verifyPageWithActiveNav(pages.cart, pages.cart.header.cartLink)
      })
      await test.step(`Click Proceed To Checkout`, async () => {
        await pages.cart.checkoutButton.click()
      })
      await test.step(`Click 'Register / Login' button `, async () => {
        await pages.cart.loginRegisterModal.loginLink.click()
      })
      await test.step(`Fill all details in Signup and create account`, async () => {
        await pages.login.fillSignupForm(user.name, user.email)
        await pages.login.signupForm.signupButton.click()
        await pages.signup.fillSignupForm(user)
        await pages.signup.accountForm.createAccountButton.click()
      })
      await test.step(`Verify 'ACCOUNT CREATED!' and click 'Continue' button`, async () => {
        await expect(pages.accountCreated.page).toHaveURL(pages.accountCreated.URL)
        await verifyElementTextVisible(pages.accountCreated.title, 'Account Created!')
        await pages.accountCreated.continueButton.click()
      })
      await test.step(`Verify ' Logged in as username' at top`, async () => {
        await verifyPageWithActiveNav(pages.home, pages.home.header.homeLink)
        await verifyElementTextVisible(pages.home.header.loggedInAsText, `Logged in as ${user.name}`)
      })
      await test.step(`Click 'Cart' button`, async () => {
        await pages.home.header.cartLink.click()
      })
      await test.step(`Click 'Proceed To Checkout' button`, async () => {
        await pages.cart.checkoutButton.click()
      })
      await test.step(`Verify Address Details and Review Your Order`, async () => {
        await verifyCheckoutDeliveryAddress(pages, user)
        await verifyCheckoutInvoiceAddress(pages, user)
        await verifyCheckoutReviewOrder(pages, productData!)
      })
      await test.step(`Enter description in comment text area and click 'Place Order'`, async () => {
        await pages.checkout.messageInput.fill(commentMessage)
        await pages.checkout.placeOrderButton.click()
      })
      await test.step(`Enter payment details: Name on Card, Card Number, CVC, Expiration date`, async () => {
        await pages.payment.fillCardForm(creditCard)
      })
      await test.step(`Click 'Pay and Confirm Order' button`, async () => {
        // NOTE: prevent form submission redirect to avoid navigation blocking in Playwright
        // await pages.payment.preventNavigation()
        await pages.payment.payAndConfirmButton.click()
      })
      await test.step(`Verify success message 'Your order has been placed successfully!'`, async () => {
        // NOTE: avoid intermediate validation during redirect to prevent timing conflicts
        // await verifyElementTextVisible(pages.payment.successAlert, ' Your order has been placed successfully!')
        // NOTE: verify success message on destination page rather than during transition
        await expect(pages.paymentDone.page).toHaveURL(new RegExp(`${pages.paymentDone.URL}/\\d+`))
        await verifyElementTextVisible(pages.paymentDone.title, 'Order Placed!')
        await verifyElementTextVisible(pages.paymentDone.successAlert, 'Congratulations! Your order has been confirmed!')
      })
      await deleteAccountAndVerifyAndContinue(pages)
    }
  )

  test(
    `Test Case 15: Place Order: Register before Checkout`,
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.UI, TAGS.PRIORITY.HIGH, TAGS.EXECUTION.REGRESSION, TAGS.SPEED.SLOW] },
    async ({ pages, testData }) => {
      const user = testData.user.getUser()
      const creditCard = testData.creditCard.getCreditCard()
      const commentMessage = testData.text.getParagraph()
      const productIndex = 0
      let productData: ProductTestData

      await navigateToHomeAndVerify(pages)
      await test.step(`Click 'Signup / Login' button`, async () => {
        await pages.home.header.loginLink.click()
      })
      await test.step(`Fill all details in Signup and create account`, async () => {
        await pages.login.fillSignupForm(user.name, user.email)
        await pages.login.signupForm.signupButton.click()
        await pages.signup.fillSignupForm(user)
        await pages.signup.accountForm.createAccountButton.click()
      })
      await test.step(`Verify 'ACCOUNT CREATED!' and click 'Continue' button`, async () => {
        await expect(pages.accountCreated.page).toHaveURL(pages.accountCreated.URL)
        await verifyElementTextVisible(pages.accountCreated.title, 'Account Created!')
        await pages.accountCreated.continueButton.click()
      })
      await test.step(`Verify 'Logged in as username' at top`, async () => {
        await verifyPageWithActiveNav(pages.home, pages.home.header.homeLink)
        await verifyElementTextVisible(pages.home.header.loggedInAsText, `Logged in as ${user.name}`)
      })
      await test.step(`Add products to cart`, async () => {
        const product = pages.home.products.getProductByIndex(productIndex)
        productData = await collectProductData(product)
        await product.addToCartAndContinue()
      })
      await test.step(`Click 'Cart' button`, async () => {
        await pages.home.header.cartLink.click()
      })
      await test.step(`Verify that cart page is displayed`, async () => {
        await verifyPageWithActiveNav(pages.cart, pages.cart.header.cartLink)
      })
      await test.step(`Click Proceed To Checkout`, async () => {
        await pages.cart.checkoutButton.click()
      })
      await test.step(`Verify Address Details and Review Your Order`, async () => {
        await verifyCheckoutDeliveryAddress(pages, user)
        await verifyCheckoutInvoiceAddress(pages, user)
        await verifyCheckoutReviewOrder(pages, productData!)
      })
      await test.step(`Enter description in comment text area and click 'Place Order'`, async () => {
        await pages.checkout.messageInput.fill(commentMessage)
        await pages.checkout.placeOrderButton.click()
      })
      await test.step(`Enter payment details: Name on Card, Card Number, CVC, Expiration date`, async () => {
        await pages.payment.fillCardForm(creditCard)
      })
      await test.step(`Click 'Pay and Confirm Order' button`, async () => {
        // NOTE: prevent form submission redirect to avoid navigation blocking in Playwright
        // await pages.payment.preventNavigation()
        await pages.payment.payAndConfirmButton.click()
      })
      await test.step(`Verify success message 'Your order has been placed successfully!'`, async () => {
        // NOTE: avoid intermediate validation during redirect to prevent timing conflicts
        // await verifyElementTextVisible(pages.payment.successAlert, ' Your order has been placed successfully!')
        // NOTE: verify success message on destination page rather than during transition
        await expect(pages.paymentDone.page).toHaveURL(new RegExp(`${pages.paymentDone.URL}/\\d+`))
        await verifyElementTextVisible(pages.paymentDone.title, 'Order Placed!')
        await verifyElementTextVisible(pages.paymentDone.successAlert, 'Congratulations! Your order has been confirmed!')
      })
      await deleteAccountAndVerifyAndContinue(pages)
    }
  )

  test(
    `Test Case 16: Place Order: Login before Checkout`,
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.UI, TAGS.PRIORITY.CRITICAL, TAGS.EXECUTION.SMOKE, TAGS.SPEED.SLOW] },
    async ({ pages, testUser, testData }) => {
      const productIndex = 0
      const commentMessage = testData.text.getParagraph()
      const creditCard = testData.creditCard.getCreditCard()
      let productData: ProductTestData

      await navigateToHomeAndVerify(pages)
      await test.step(`Click 'Signup / Login' button`, async () => {
        await pages.home.header.loginLink.click()
      })
      await test.step(`Fill email, password and click 'Login' button`, async () => {
        await pages.login.doLoginWithCredentials(testUser.email, testUser.password)
      })
      await test.step(`Verify 'Logged in as username' at top`, async () => {
        await verifyPageWithActiveNav(pages.home, pages.home.header.homeLink)
        await verifyElementTextVisible(pages.home.header.loggedInAsText, `Logged in as ${testUser.name}`)
      })
      await test.step(`Add products to cart`, async () => {
        const product = pages.home.products.getProductByIndex(productIndex)
        productData = await collectProductData(product)
        await product.addToCartAndContinue()
      })
      await test.step(`Click 'Cart' button`, async () => {
        await pages.home.header.cartLink.click()
      })
      await test.step(`Verify that cart page is displayed`, async () => {
        await verifyPageWithActiveNav(pages.cart, pages.cart.header.cartLink)
      })
      await test.step(`Click Proceed To Checkout`, async () => {
        await pages.cart.checkoutButton.click()
      })
      await test.step(`Verify Address Details and Review Your Order`, async () => {
        await verifyCheckoutDeliveryAddress(pages, testUser)
        await verifyCheckoutInvoiceAddress(pages, testUser)
        await verifyCheckoutReviewOrder(pages, productData!)
      })
      await test.step(`Enter description in comment text area and click 'Place Order'`, async () => {
        await pages.checkout.messageInput.fill(commentMessage)
        await pages.checkout.placeOrderButton.click()
      })
      await test.step(`Enter payment details: Name on Card, Card Number, CVC, Expiration date`, async () => {
        await pages.payment.fillCardForm(creditCard)
      })
      await test.step(`Click 'Pay and Confirm Order' button`, async () => {
        // NOTE: prevent form submission redirect to avoid navigation blocking in Playwright
        // await pages.payment.preventNavigation()
        await pages.payment.payAndConfirmButton.click()
      })
      await test.step(`Verify success message 'Your order has been placed successfully!'`, async () => {
        // NOTE: avoid intermediate validation during redirect to prevent timing conflicts
        // await verifyElementTextVisible(pages.payment.successAlert, ' Your order has been placed successfully!')
        // NOTE: verify success message on destination page rather than during transition
        await expect(pages.paymentDone.page).toHaveURL(new RegExp(`${pages.paymentDone.URL}/\\d+`))
        await verifyElementTextVisible(pages.paymentDone.title, 'Order Placed!')
        await verifyElementTextVisible(pages.paymentDone.successAlert, 'Congratulations! Your order has been confirmed!')
      })
      await deleteAccountAndVerifyAndContinue(pages)
    }
  )

  test(
    `Test Case 23: Verify address details in checkout page`,
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.UI, TAGS.PRIORITY.HIGH, TAGS.EXECUTION.REGRESSION, TAGS.SPEED.SLOW] },
    async ({ pages, testData }) => {
      const user = testData.user.getUser()
      const productIndex = 0

      await navigateToHomeAndVerify(pages)
      await test.step(`Click 'Signup / Login' button`, async () => {
        await pages.home.header.loginLink.click()
      })
      await test.step(`Fill all details in Signup and create account`, async () => {
        await pages.login.fillSignupForm(user.name, user.email)
        await pages.login.signupForm.signupButton.click()
        await pages.signup.fillSignupForm(user)
        await pages.signup.accountForm.createAccountButton.click()
      })
      await test.step(`Verify 'ACCOUNT CREATED!' and click 'Continue' button`, async () => {
        await expect(pages.accountCreated.page).toHaveURL(pages.accountCreated.URL)
        await verifyElementTextVisible(pages.accountCreated.title, 'Account Created!')
        await pages.accountCreated.continueButton.click()
      })
      await test.step(`Verify ' Logged in as username' at top`, async () => {
        await verifyPageWithActiveNav(pages.home, pages.home.header.homeLink)
        await verifyElementTextVisible(pages.home.header.loggedInAsText, `Logged in as ${user.name}`)
      })
      await test.step(`Add products to cart`, async () => {
        await pages.home.products.getProductByIndex(productIndex).addToCartAndContinue()
      })
      await test.step(`Click 'Cart' button`, async () => {
        await pages.home.header.cartLink.click()
      })
      await test.step(`Verify that cart page is displayed`, async () => {
        await verifyPageWithActiveNav(pages.cart, pages.cart.header.cartLink)
      })
      await test.step(`Click Proceed To Checkout`, async () => {
        await pages.cart.checkoutButton.click()
      })
      await test.step(`Verify that the delivery address is same address filled at the time registration of account`, async () => {
        await verifyCheckoutDeliveryAddress(pages, user)
      })
      await test.step(`Verify that the billing address is same address filled at the time registration of account`, async () => {
        await verifyCheckoutInvoiceAddress(pages, user)
      })
      await deleteAccountAndVerifyAndContinue(pages)
    }
  )

  test(
    `Test Case 24: Download Invoice after purchase order`,
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.UI, TAGS.PRIORITY.HIGH, TAGS.EXECUTION.REGRESSION, TAGS.SPEED.SLOW] },
    async ({ pages, testData }) => {
      const user = testData.user.getUser()
      const creditCard = testData.creditCard.getCreditCard()
      const commentMessage = testData.text.getParagraph()
      const productIndex = 0
      let productData: ProductTestData

      await navigateToHomeAndVerify(pages)
      await test.step(`Add products to cart`, async () => {
        const product = pages.home.products.getProductByIndex(productIndex)
        productData = await collectProductData(product)
        await product.addToCartAndContinue()
      })
      await test.step(`Click 'Cart' button`, async () => {
        await pages.home.header.cartLink.click()
      })
      await test.step(`Verify that cart page is displayed`, async () => {
        await verifyPageWithActiveNav(pages.cart, pages.cart.header.cartLink)
      })
      await test.step(`Click Proceed To Checkout`, async () => {
        await pages.cart.checkoutButton.click()
      })
      await test.step(`Click 'Register / Login' button`, async () => {
        await pages.cart.loginRegisterModal.loginLink.click()
      })
      await test.step(`Fill all details in Signup and create account`, async () => {
        await pages.login.fillSignupForm(user.name, user.email)
        await pages.login.signupForm.signupButton.click()
        await pages.signup.fillSignupForm(user)
        await pages.signup.accountForm.createAccountButton.click()
      })
      await test.step(`Verify 'ACCOUNT CREATED!' and click 'Continue' button`, async () => {
        await expect(pages.accountCreated.page).toHaveURL(pages.accountCreated.URL)
        await verifyElementTextVisible(pages.accountCreated.title, 'Account Created!')
        await pages.accountCreated.continueButton.click()
      })
      await test.step(`Verify ' Logged in as username' at top`, async () => {
        await verifyPageWithActiveNav(pages.home, pages.home.header.homeLink)
        await verifyElementTextVisible(pages.home.header.loggedInAsText, `Logged in as ${user.name}`)
      })
      await test.step(`Click 'Cart' button`, async () => {
        await pages.home.header.cartLink.click()
      })
      await test.step(`Click 'Proceed To Checkout' button`, async () => {
        await pages.cart.checkoutButton.click()
      })
      await test.step(`Verify Address Details and Review Your Order`, async () => {
        await verifyCheckoutDeliveryAddress(pages, user)
        await verifyCheckoutInvoiceAddress(pages, user)
        await verifyCheckoutReviewOrder(pages, productData!)
      })
      await test.step(`Enter description in comment text area and click 'Place Order'`, async () => {
        await pages.checkout.messageInput.fill(commentMessage)
        await pages.checkout.placeOrderButton.click()
      })
      await test.step(`Enter payment details: Name on Card, Card Number, CVC, Expiration date`, async () => {
        await pages.payment.fillCardForm(creditCard)
      })
      await test.step(`Click 'Pay and Confirm Order' button`, async () => {
        // NOTE: prevent form submission redirect to avoid navigation blocking in Playwright
        // await pages.payment.preventNavigation()
        await pages.payment.payAndConfirmButton.click()
      })
      await test.step(`Verify success message 'Your order has been placed successfully!'`, async () => {
        // NOTE: avoid intermediate validation during redirect to prevent timing conflicts
        // await verifyElementTextVisible(pages.payment.successAlert, ' Your order has been placed successfully!')
        // await pages.payment.restoreDefaultActions()
        // await pages.payment.payAndConfirmButton.click()
        // NOTE: verify success message on destination page rather than during transition
        await expect(pages.paymentDone.page).toHaveURL(new RegExp(`${pages.paymentDone.URL}/\\d+`))
        await verifyElementTextVisible(pages.paymentDone.title, 'Order Placed!')
        await verifyElementTextVisible(pages.paymentDone.successAlert, 'Congratulations! Your order has been confirmed!')
      })
      await test.step(`Click 'Download Invoice' button and verify invoice is downloaded successfully.`, async () => {
        const downloadPromise = pages.paymentDone.page.waitForEvent('download')
        await pages.paymentDone.downloadInvoiceButton.click()
        const download = await downloadPromise
        expect(download.suggestedFilename()).toBeTruthy()
        const artifactPath = test.info().outputPath(download.suggestedFilename())
        await download.saveAs(artifactPath)
        await test.info().attach('invoice', { path: artifactPath })
      })
      await test.step(`Click 'Continue' button`, async () => {
        await pages.paymentDone.continueButton.click()
      })
      await deleteAccountAndVerifyAndContinue(pages)
    }
  )
})
