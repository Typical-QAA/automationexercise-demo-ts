import { HTTP_STATUS } from '../data/constants'
import { ApiBase } from './base'

export class ApiBrands extends ApiBase {
  async getAllBrands() {
    return this.sendAndValidate('GET', '/api/brandsList', {}, HTTP_STATUS.OK)
  }
  async putToAllBrands(payload = {}) {
    return this.sendAndValidate('PUT', '/api/brandsList', { form: payload }, HTTP_STATUS.OK)
  }
}
