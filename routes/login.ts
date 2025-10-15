import { HTTP_STATUS } from '../data/constants/http-status'
import type { UserDataCredentials } from '../types/user.types'
import { ApiBase } from './base'

export class ApiLogin extends ApiBase {
  async verifyLogin(payload: Partial<UserDataCredentials> = {}) {
    return this.sendAndValidate('POST', '/api/verifyLogin', { form: payload }, HTTP_STATUS.OK)
  }
  async deleteToVerifyLogin() {
    return this.sendAndValidate('DELETE', '/api/verifyLogin', {}, HTTP_STATUS.OK)
  }
}
