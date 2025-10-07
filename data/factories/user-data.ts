import { faker } from '@faker-js/faker'
import type { UserDataCredentials, UserDataPrivate } from '../../types/user.types'

export class UserDataFactory {
  static getUserCredentials(): UserDataCredentials {
    return { email: faker.internet.email(), password: faker.internet.password() }
  }

  static getUser(prefix = ''): UserDataPrivate {
    const birthdate = faker.date.birthdate()
    const sex = faker.person.sexType()
    const firstname = faker.person.firstName(sex)
    const lastname = faker.person.lastName(sex)
    const name = prefix + faker.internet.username({ firstName: firstname, lastName: lastname })
    const email = prefix + faker.internet.email({ firstName: firstname, lastName: lastname })
    const title = sex === 'male' ? 'Mr' : 'Mrs'
    return {
      name,
      email,
      password: faker.internet.password(),
      title,
      birth_date: birthdate.getDate().toString(),
      birth_month: (birthdate.getMonth() + 1).toString(),
      birth_year: birthdate.getFullYear().toString(),
      firstname,
      lastname,
      company: faker.company.name(),
      address1: faker.location.streetAddress(),
      address2: faker.location.secondaryAddress(),
      country: faker.helpers.arrayElement(['India', 'United States', 'Canada', 'Australia', 'Israel', 'New Zealand', 'Singapore']),
      zipcode: faker.location.zipCode(),
      state: faker.location.state(),
      city: faker.location.city(),
      mobile_number: faker.phone.number({ style: 'international' })
    }
  }
}
