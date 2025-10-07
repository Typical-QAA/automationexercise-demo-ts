// Based on docs/test-cases/ui/README.md - Test Cases 9, 18-20
// Product search, categories, brands, and search with cart functionality

import { TAGS } from '../../../data/constants'
import { expect, test } from '../../../fixtures'
import { navigateToHomeAndVerify, verifyElementTextVisible, verifyPageWithActiveNav } from '../helpers'

test.describe('Product Discovery Tests', () => {
  test(
    `Test Case 9: Search Product`,
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.UI, TAGS.PRIORITY.HIGH, TAGS.EXECUTION.REGRESSION] },
    async ({ pages, testData }) => {
      const searchParam = testData.content.product.TSHIRT

      await navigateToHomeAndVerify(pages)
      await test.step(`Click on 'Products' button`, async () => {
        await pages.home.header.productsLink.click()
      })
      await test.step(`Verify user is navigated to ALL PRODUCTS page successfully`, async () => {
        await verifyPageWithActiveNav(pages.products, pages.products.header.productsLink)
        await verifyElementTextVisible(pages.products.title, 'All Products')
      })
      await test.step(`Enter product name in search input and click search button`, async () => {
        await pages.products.doSearch(searchParam)
      })
      await test.step(`Verify 'SEARCHED PRODUCTS' is visible`, async () => {
        await verifyElementTextVisible(pages.products.title, 'Searched Products')
      })
      await test.step(`Verify all the products related to search are visible`, async () => {
        await expect(pages.products.productsList.first()).toBeVisible()
        expect(await pages.products.productsList.count()).toBeGreaterThan(0)
      })
    }
  )

  test(
    `Test Case 18: View Category Products`,
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.UI, TAGS.PRIORITY.MEDIUM, TAGS.EXECUTION.REGRESSION] },
    async ({ pages, testData }) => {
      const womenDressId = testData.content.category.WOMEN.DRESS.id
      const menJeansId = testData.content.category.MEN.JEANS.id

      await test.step(`Navigate to url 'http://automationexercise.com'`, async () => {
        await pages.home.navigate()
      })
      await test.step(`Verify that categories are visible on left side bar`, async () => {
        await expect(pages.home.leftSidebar.categories.container).toBeVisible()
        await expect(pages.home.leftSidebar.categories.heading).toBeVisible()
      })
      await test.step(`Click on 'Women' category`, async () => {
        await pages.home.leftSidebar.categories.womenCategory.click()
      })
      await test.step(`Click on any category link under 'Women' category, for example: Dress`, async () => {
        await pages.home.leftSidebar.categories.getSubcategoryLink(womenDressId).click()
      })
      // NOTE: official test case has incorrect text, actual should be 'Women - Dress Products'
      await test.step(`Verify that category page is displayed and confirm text 'WOMEN - TOPS PRODUCTS'`, async () => {
        await expect(pages.category.page).toHaveURL(pages.category.URL + `/${womenDressId}`)
        await expect(pages.category.title).toBeVisible()
        await verifyElementTextVisible(pages.category.title, 'Women - Dress Products')
      })
      await test.step(`On left side bar, click on any sub-category link of 'Men' category`, async () => {
        await pages.category.leftSidebar.categories.menCategory.click()
        await pages.category.leftSidebar.categories.getSubcategoryLink(menJeansId).click()
      })
      await test.step(`Verify that user is navigated to that category page`, async () => {
        await expect(pages.category.page).toHaveURL(pages.category.URL + `/${menJeansId}`)
        await verifyElementTextVisible(pages.category.title, 'Men - Jeans Products')
      })
    }
  )

  test(
    `Test Case 19: View & Cart Brand Products`,
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.UI, TAGS.PRIORITY.MEDIUM, TAGS.EXECUTION.REGRESSION] },
    async ({ pages, testData }) => {
      const brandPolo = testData.content.brand.POLO
      const brandBiba = testData.content.brand.BIBA

      await test.step(`Navigate to url 'http://automationexercise.com'`, async () => {
        await pages.home.navigate()
      })
      await test.step(`Click on 'Products' button`, async () => {
        await pages.home.header.productsLink.click()
      })
      await test.step(`Verify that Brands are visible on left side bar`, async () => {
        await expect(pages.home.leftSidebar.brands.container).toBeVisible()
        await expect(pages.home.leftSidebar.brands.heading).toBeVisible()
      })
      await test.step(`Click on any brand name`, async () => {
        await pages.home.leftSidebar.brands.getBrandLink(brandPolo).click()
      })
      await test.step(`Verify that user is navigated to brand page and brand products are displayed`, async () => {
        await expect(pages.brand.page).toHaveURL(pages.brand.URL + `/${brandPolo}`)
        await verifyElementTextVisible(pages.brand.title, 'Brand - Polo Products')
      })
      await test.step(`On left side bar, click on any other brand link`, async () => {
        await pages.brand.leftSidebar.brands.getBrandLink(brandBiba).click()
      })
      await test.step(`Verify that user is navigated to that brand page and can see products`, async () => {
        await expect(pages.brand.page).toHaveURL(pages.brand.URL + `/${brandBiba}`)
        await verifyElementTextVisible(pages.brand.title, 'Brand - Biba Products')
      })
    }
  )

  test(
    `Test Case 20: Search Products and Verify Cart After Login`,
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.UI, TAGS.PRIORITY.HIGH, TAGS.EXECUTION.REGRESSION, TAGS.SPEED.SLOW] },
    async ({ pages, testData, testUser }) => {
      const searchParam = testData.content.product.SAREE
      const productNames: (string | null)[] = []

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
      await test.step(`Enter product name in search input and click search button`, async () => {
        await pages.products.doSearch(searchParam)
      })
      await test.step(`Verify 'SEARCHED PRODUCTS' is visible`, async () => {
        await verifyElementTextVisible(pages.products.title, 'Searched Products')
      })
      await test.step(`Verify all the products related to search are visible`, async () => {
        productNames.push(...(await pages.products.getAllProductNames()))
        productNames.forEach(name => {
          expect(name).toContain(searchParam)
        })
      })
      await test.step(`Add those products to cart`, async () => {
        await pages.products.addAllProductsToCart()
      })
      await test.step(`Click 'Cart' button and verify that products are visible in cart`, async () => {
        await pages.products.header.cartLink.click()
        await verifyPageWithActiveNav(pages.cart, pages.cart.header.cartLink)
        expect(productNames.sort()).toEqual((await pages.cart.getAllProductNames()).sort())
      })
      await test.step(`Click 'Signup / Login' button and submit login details`, async () => {
        await pages.cart.header.loginLink.click()
        await pages.login.doLoginWithCredentials(testUser.email, testUser.password)
        await verifyElementTextVisible(pages.home.header.loggedInAsText, `Logged in as ${testUser.name}`)
      })
      await test.step(`Again, go to Cart page`, async () => {
        await pages.home.header.cartLink.click()
      })
      await test.step(`Verify that those products are visible in cart after login as well`, async () => {
        await verifyPageWithActiveNav(pages.cart, pages.cart.header.cartLink)
        expect(productNames.sort()).toEqual((await pages.cart.getAllProductNames()).sort())
      })
    }
  )
})
