import { HTTP_STATUS } from '../data/constants'
import { ApiBase } from './base'

export class ApiSearch extends ApiBase {
  async searchProduct(payload = {}) {
    return this.sendAndValidate('POST', '/api/searchProduct', { form: payload }, HTTP_STATUS.OK)
  }
}
