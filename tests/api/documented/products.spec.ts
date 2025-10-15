// Based on docs/test-cases/api/README.md - APIs 1-2, 5-6
// Product-related API endpoints testing

import { TAGS } from '../../../data/constants'
import { expect, test } from '../../../fixtures'

test.describe(`Product APIs`, () => {
  test(
    'API 1: Get All Products List',
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.API, TAGS.PRIORITY.CRITICAL, TAGS.EXECUTION.SMOKE] },
    async ({ api, testData }) => {
      const responseBody = await (await api.products.getAllProducts()).json()

      await test.step('Validate response schema', async () => {
        expect(responseBody).toBeValidSchema(testData.schema('productsList'))
      })
      await test.step('Validate response content matches fixture', async () => {
        expect(responseBody).toEqual(testData.staticFixture('productsList'))
      })
    }
  )

  test(
    'API 2: POST To All Products List',
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.API, TAGS.PRIORITY.MEDIUM, TAGS.EXECUTION.REGRESSION] },
    async ({ api, testData }) => {
      const responseBody = await (await api.products.postToAllProducts()).json()
      await test.step('Validate response schema', async () => {
        expect(responseBody).toBeValidSchema(testData.schema('message'))
      })
      await test.step('Validate response content matches fixture', async () => {
        expect(responseBody).toEqual(testData.apiResponse.methodNotAllowed())
      })
    }
  )

  // TODO: GET is 405
  test(
    'API 5: POST To Search Product',
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.API, TAGS.PRIORITY.HIGH, TAGS.EXECUTION.REGRESSION] },
    async ({ api, testData }) => {
      const requestPayload = { search_product: testData.content.product.SAREE }

      const responseBody = await (await api.search.searchProduct(requestPayload)).json()
      await test.step('Validate response schema', async () => {
        expect(responseBody).toBeValidSchema(testData.schema('searchProduct'))
      })
      await test.step('Validate response content matches fixture', async () => {
        expect(responseBody).toEqual(testData.staticFixture('searchProducts_saree'))
      })
    }
  )

  test(
    'API 6: POST To Search Product without search_product parameter',
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.API, TAGS.PRIORITY.MEDIUM, TAGS.EXECUTION.REGRESSION] },
    async ({ api, testData }) => {
      const responseBody = await (await api.search.searchProduct()).json()
      await test.step('Validate response schema', async () => {
        expect(responseBody).toBeValidSchema(testData.schema('message'))
      })
      await test.step('Validate response content matches fixture', async () => {
        expect(responseBody).toEqual(testData.apiResponse.searchParamMissing())
      })
    }
  )
})
