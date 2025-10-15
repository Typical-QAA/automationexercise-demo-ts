// Based on docs/test-cases/api/README.md - APIs 7-10
// Authentication and login verification API endpoints testing

import { TAGS } from '../../../data/constants'
import { expect, test } from '../../../fixtures'

test.describe('Authentication APIs', () => {
  test(
    'API 7: POST To Verify Login with valid details',
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.API, TAGS.PRIORITY.HIGH, TAGS.EXECUTION.REGRESSION] },
    async ({ api, testData, testUser }) => {
      const requestPayload = { email: testUser.email, password: testUser.password }

      const responseBody = await (await api.login.verifyLogin(requestPayload)).json()
      await test.step('Validate response schema', async () => {
        expect(responseBody).toBeValidSchema(testData.schema('message'))
      })
      await test.step('Validate response content matches fixture', async () => {
        expect(responseBody).toEqual(testData.apiResponse.userExists())
      })
    }
  )

  test(
    'API 8: POST To Verify Login without email parameter',
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.API, TAGS.PRIORITY.MEDIUM, TAGS.EXECUTION.REGRESSION] },
    async ({ api, testData, testUser }) => {
      const requestPayload = { password: testUser.password }

      const responseBody = await (await api.login.verifyLogin(requestPayload)).json()
      await test.step('Validate response schema', async () => {
        expect(responseBody).toBeValidSchema(testData.schema('message'))
      })
      await test.step('Validate response content matches fixture', async () => {
        expect(responseBody).toEqual(testData.apiResponse.loginParamsMissing())
      })
    }
  )

  test(
    'API 9: DELETE To Verify Login',
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.API, TAGS.PRIORITY.MEDIUM, TAGS.EXECUTION.REGRESSION] },
    async ({ api, testData }) => {
      const responseBody = await (await api.login.deleteToVerifyLogin()).json()
      await test.step('Validate response schema', async () => {
        expect(responseBody).toBeValidSchema(testData.schema('message'))
      })
      await test.step('Validate response content matches fixture', async () => {
        expect(responseBody).toEqual(testData.apiResponse.methodNotAllowed())
      })
    }
  )

  test(
    'API 10: POST To Verify Login with invalid details',
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.API, TAGS.PRIORITY.MEDIUM, TAGS.EXECUTION.REGRESSION] },
    async ({ api, testData }) => {
      const requestPayload = testData.user.getUserCredentials()

      const responseBody = await (await api.login.verifyLogin(requestPayload)).json()
      await test.step('Validate response schema', async () => {
        expect(responseBody).toBeValidSchema(testData.schema('message'))
      })
      await test.step('Validate response content matches fixture', async () => {
        expect(responseBody).toEqual(testData.apiResponse.userNotFound())
      })
    }
  )
})
