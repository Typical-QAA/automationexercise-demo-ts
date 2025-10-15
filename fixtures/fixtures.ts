import { test as testBase } from '@playwright/test'
import { PRODUCTS, CATEGORIES, BRANDS } from '../data/constants'
import { ApiResponseFactory, CreditCardDataFactory, TextDataFactory, UserDataFactory } from '../data/factories'
import {
  AccountCreatedPage,
  AccountDeletedPage,
  BrandPage,
  CartPage,
  CategoryPage,
  CheckoutPage,
  ContactUsPage,
  HomePage,
  LoginPage,
  PaymentDonePage,
  PaymentPage,
  ProductDetailPage,
  ProductsPage,
  SignupPage,
  TestCasesPage
} from '../pages'
import { ApiBrands, ApiLogin, ApiProducts, ApiSearch, ApiUser } from '../routes'
import { getFixture, getSchema } from '../support/utils'

export type AllFixtures = {
  api: { brands: ApiBrands; login: ApiLogin; products: ApiProducts; search: ApiSearch; user: ApiUser }
  testData: {
    apiResponse: typeof ApiResponseFactory
    content: { product: typeof PRODUCTS; category: typeof CATEGORIES; brand: typeof BRANDS }
    creditCard: typeof CreditCardDataFactory
    schema: typeof getSchema
    staticFixture: typeof getFixture
    text: typeof TextDataFactory
    user: typeof UserDataFactory
  }
  testUser: ReturnType<typeof UserDataFactory.getUser>
  pages: {
    accountCreated: AccountCreatedPage
    accountDeleted: AccountDeletedPage
    brand: BrandPage
    cart: CartPage
    category: CategoryPage
    checkout: CheckoutPage
    contactUs: ContactUsPage
    home: HomePage
    login: LoginPage
    payment: PaymentPage
    paymentDone: PaymentDonePage
    productDetail: ProductDetailPage
    products: ProductsPage
    signup: SignupPage
    testCases: TestCasesPage
  }
}
export const test = testBase.extend<AllFixtures>({
  api: async ({ request }, use) => {
    const apiFixtures = {
      brands: new ApiBrands(request),
      login: new ApiLogin(request),
      products: new ApiProducts(request),
      search: new ApiSearch(request),
      user: new ApiUser(request)
    }
    await use(apiFixtures)
  },

  testData: [
    async ({}, use) => {
      const dataFixtures = {
        apiResponse: ApiResponseFactory,
        content: { product: PRODUCTS, category: CATEGORIES, brand: BRANDS },
        creditCard: CreditCardDataFactory,
        schema: getSchema,
        staticFixture: getFixture,
        text: TextDataFactory,
        user: UserDataFactory
      }
      await use(dataFixtures)
    },
    { box: true }
  ],

  testUser: async ({ api }, use) => {
    const user = UserDataFactory.getUser('test_')

    // NOTE: random delay to prevent CloudFlare rate limiting and racing conditions during parallel test execution
    await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000))
    await api.user.createAccount(user)

    await use(user)

    // NOTE: suppress cleanup failures to avoid masking test results
    await api.user.deleteAccount(user).catch(() => {})
  },

  pages: async ({ page }, use) => {
    const pageFixtures = {
      accountCreated: new AccountCreatedPage(page),
      accountDeleted: new AccountDeletedPage(page),
      brand: new BrandPage(page),
      cart: new CartPage(page),
      category: new CategoryPage(page),
      checkout: new CheckoutPage(page),
      contactUs: new ContactUsPage(page),
      home: new HomePage(page),
      login: new LoginPage(page),
      payment: new PaymentPage(page),
      paymentDone: new PaymentDonePage(page),
      productDetail: new ProductDetailPage(page),
      products: new ProductsPage(page),
      signup: new SignupPage(page),
      testCases: new TestCasesPage(page)
    }
    await use(pageFixtures)
  }
})
