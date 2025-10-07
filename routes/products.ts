import { HTTP_STATUS } from '../data/constants'
import { ApiBase } from './base'

export class ApiProducts extends ApiBase {
  async getAllProducts() {
    return this.sendAndValidate('GET', '/api/productsList', {}, HTTP_STATUS.OK)
  }
  async postToAllProducts(payload = {}) {
    return this.sendAndValidate('POST', '/api/productsList', { form: payload }, HTTP_STATUS.OK)
  }
}
