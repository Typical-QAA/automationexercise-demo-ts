import type { ApiBrandsResponse, ApiMessageResponse, ApiProductsResponse, ApiUserResponse, Brand, Product } from '../../types/api.types'
import type { UserDataPublic } from '../../types/user.types'

export class ApiResponseFactory {
  static createMessageResponse(responseCode: number, message: string): ApiMessageResponse {
    return { responseCode, message }
  }

  static createProductsResponse(responseCode: number, products: Product[]): ApiProductsResponse {
    return { responseCode, products }
  }

  static createBrandsResponse(responseCode: number, brands: Brand[]): ApiBrandsResponse {
    return { responseCode, brands }
  }

  static createUserResponse(responseCode: number, user: UserDataPublic): ApiUserResponse {
    return { responseCode, user }
  }

  static methodNotAllowed(): ApiMessageResponse {
    return this.createMessageResponse(405, 'This request method is not supported.')
  }

  static badRequest(details?: string): ApiMessageResponse {
    const baseMessage = 'Bad request'
    const message = details ? `${baseMessage}, ${details}` : baseMessage
    return this.createMessageResponse(400, message)
  }
  static notFound(resource?: string): ApiMessageResponse {
    const message = resource ? `${resource} not found!` : 'Not found!'
    return this.createMessageResponse(404, message)
  }

  static success(message: string): ApiMessageResponse {
    return this.createMessageResponse(200, message)
  }

  static created(resource?: string): ApiMessageResponse {
    const message = resource ? `${resource} created!` : 'Created!'
    return this.createMessageResponse(201, message)
  }

  static userCreated(): ApiMessageResponse {
    return this.created('User')
  }

  static userExists(): ApiMessageResponse {
    return this.success('User exists!')
  }

  static userUpdated(): ApiMessageResponse {
    return this.createMessageResponse(200, 'User updated!')
  }

  static userNotFound(): ApiMessageResponse {
    return this.notFound('User')
  }

  static accountDeleted(): ApiMessageResponse {
    return this.createMessageResponse(200, 'Account deleted!')
  }

  static accountNotFound(): ApiMessageResponse {
    return this.notFound('Account')
  }
  static searchParamMissing(): ApiMessageResponse {
    return this.badRequest('search_product parameter is missing in POST request.')
  }

  static loginParamsMissing(): ApiMessageResponse {
    return this.badRequest('email or password parameter is missing in POST request.')
  }
}
