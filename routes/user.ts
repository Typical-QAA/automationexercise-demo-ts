import { HTTP_STATUS } from '../data/constants'
import type { UserDataPrivate } from '../types/user.types'
import { ApiBase } from './base'

export class ApiUser extends ApiBase {
  async createAccount(payload: Partial<UserDataPrivate> = {}) {
    return this.sendAndValidate('POST', '/api/createAccount', { form: payload }, HTTP_STATUS.OK)
  }
  async deleteAccount(payload: Partial<UserDataPrivate> = {}) {
    return this.sendAndValidate('DELETE', '/api/deleteAccount', { form: payload }, HTTP_STATUS.OK)
  }
  async updateAccount(payload: Partial<UserDataPrivate> = {}) {
    return this.sendAndValidate('PUT', '/api/updateAccount', { form: payload }, HTTP_STATUS.OK)
  }
  async getAccount(email: string = '') {
    return this.sendAndValidate('GET', `/api/getUserDetailByEmail?email=${email}`, {}, HTTP_STATUS.OK)
  }
}
