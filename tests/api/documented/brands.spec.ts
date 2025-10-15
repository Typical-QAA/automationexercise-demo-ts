// Based on docs/test-cases/api/README.md - APIs 3-4
// Brand-related API endpoints testing

import { TAGS } from '../../../data/constants'
import { expect, test } from '../../../fixtures'

test.describe('Brand APIs', () => {
  test(
    'API 3: Get All Brands List',
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.API, TAGS.PRIORITY.CRITICAL, TAGS.EXECUTION.SMOKE] },
    async ({ api, testData }) => {
      const responseBody = await (await api.brands.getAllBrands()).json()

      await test.step('Validate response schema', async () => {
        expect(responseBody).toBeValidSchema(testData.schema('brandsList'))
      })
      await test.step('Validate response content matches fixture', async () => {
        expect(responseBody).toEqual(testData.staticFixture('brandsList'))
      })
    }
  )

  test(
    'API 4: PUT To All Brands List',
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.API, TAGS.PRIORITY.MEDIUM, TAGS.EXECUTION.REGRESSION] },
    async ({ api, testData }) => {
      const responseBody = await (await api.brands.putToAllBrands()).json()
      await test.step('Validate response schema', async () => {
        expect(responseBody).toBeValidSchema(testData.schema('message'))
      })
      await test.step('Validate response content matches fixture', async () => {
        expect(responseBody).toEqual(testData.apiResponse.methodNotAllowed())
      })
    }
  )
})
