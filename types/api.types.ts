import type { UserDataPublic } from './user.types'

export type BaseApiResponse = { responseCode: number }

export type ApiMessageResponse = BaseApiResponse & { message: string }

export type Product = {
  id: number
  name: string
  price: string
  brand: string
  category: { usertype: { usertype: string }; category: string }
}

export type Brand = { id: number; brand: string }

export type ApiUserData = UserDataPublic

export type ApiProductsResponse = BaseApiResponse & { products: Product[] }

export type ApiBrandsResponse = BaseApiResponse & { brands: Brand[] }

export type ApiUserResponse = BaseApiResponse & { user: UserDataPublic }
