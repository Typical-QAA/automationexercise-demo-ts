import type { APIRequestContext } from '@playwright/test'
import { expect, test } from '@playwright/test'

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export class ApiBase {
  request: APIRequestContext

  constructor(request: APIRequestContext) {
    this.request = request
  }

  async sendAndValidate<T extends RequestMethod>(
    method: T,
    url: string,
    options: Parameters<APIRequestContext[Lowercase<T>]>[1] = {},
    expectedStatus: number
  ) {
    const response = await test.step(`Send ${method} request to ${url}`, async () => {
      return await this.request[method.toLowerCase() as Lowercase<T>](url, options)
    })
    await test.step(`Validate response status is ${expectedStatus}`, async () => {
      expect(response.status()).toEqual(expectedStatus)
    })
    return response
  }
}
