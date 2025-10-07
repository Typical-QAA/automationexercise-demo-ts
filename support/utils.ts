import * as schemas from '../data/schemas'
import * as fixtures from '../data/static-fixtures'

import type { UserDataPrivate, UserDataPublic } from '../types/user.types'

type UserDataPublicNoId = Omit<UserDataPublic, 'id'>

export function mapUserDataToResponse(userData: UserDataPrivate): UserDataPublicNoId {
  const keysMap: Record<string, string> = { birth_date: 'birth_day', firstname: 'first_name', lastname: 'last_name' }
  const excludeList = ['password', 'mobile_number']

  return Object.entries(userData).reduce((result, [key, value]) => {
    if (excludeList.includes(key)) {
      return result
    }

    const newKey = keysMap[key] || key

    return { ...result, [newKey]: value }
  }, {} as UserDataPublicNoId)
}

export function getSchema(schemaName: keyof typeof schemas) {
  return schemas[schemaName]
}

export function getFixture(fixtureName: keyof typeof fixtures) {
  return fixtures[fixtureName]
}
