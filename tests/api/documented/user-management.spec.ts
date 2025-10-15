// Based on docs/test-cases/api/README.md - APIs 11-14
// User account management API endpoints testing

import { TAGS } from '../../../data/constants'
import { expect, test } from '../../../fixtures'
import { mapUserDataToResponse } from '../../../support/utils'

test.describe('User Management APIs', () => {
  test(
    'API 11: POST To Create User Account',
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.API, TAGS.PRIORITY.CRITICAL, TAGS.EXECUTION.SMOKE] },
    async ({ api, testData }) => {
      const requestPayload = testData.user.getUser()
      const responseBody = await (await api.user.createAccount(requestPayload)).json()
      await test.step('Validate response schema', async () => {
        expect(responseBody).toBeValidSchema(testData.schema('message'))
      })
      await test.step('Validate response content matches fixture', async () => {
        expect(responseBody).toEqual(testData.apiResponse.userCreated())
      })
    }
  )

  // TODO: 404 on not found
  test(
    'API 12: DELETE To Delete User Account',
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.API, TAGS.PRIORITY.CRITICAL, TAGS.EXECUTION.SMOKE] },
    async ({ api, testData, testUser }) => {
      const requestPayload = { email: testUser.email, password: testUser.password }

      const responseBody = await (await api.user.deleteAccount(requestPayload)).json()
      await test.step('Validate response schema', async () => {
        expect(responseBody).toBeValidSchema(testData.schema('message'))
      })
      await test.step('Validate response content matches fixture', async () => {
        expect(responseBody).toEqual(testData.apiResponse.accountDeleted())
      })
    }
  )

  test(
    'API 13: PUT To Update User Account',
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.API, TAGS.PRIORITY.HIGH, TAGS.EXECUTION.REGRESSION] },
    async ({ api, testData, testUser }) => {
      const requestPayload = { ...testData.user.getUser(), email: testUser.email, password: testUser.password, name: testUser.name }

      const responseBody = await (await api.user.updateAccount(requestPayload)).json()
      await test.step('Validate response schema', async () => {
        expect(responseBody).toBeValidSchema(testData.schema('message'))
      })
      await test.step('Validate response content matches fixture', async () => {
        expect(responseBody).toEqual(testData.apiResponse.userUpdated())
      })
    }
  )

  test(
    'API 14: Get user account detail by email',
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.API, TAGS.PRIORITY.HIGH, TAGS.EXECUTION.REGRESSION] },
    async ({ api, testData, testUser }) => {
      const requestPayload = testUser.email
      const expectedData = mapUserDataToResponse(testUser)

      const responseBody = await (await api.user.getAccount(requestPayload)).json()
      await test.step('Validate response schema', async () => {
        expect(responseBody).toBeValidSchema(testData.schema('userAccount'))
      })
      await test.step('Validate response content data', async () => {
        const { id: _id, ...userData } = responseBody.user
        expect(userData).toEqual(expectedData)
      })
    }
  )
})
