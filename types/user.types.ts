export type UserDataPrivate = {
  name: string
  email: string
  password: string
  title: string
  birth_date: string
  birth_month: string
  birth_year: string
  firstname: string
  lastname: string
  company: string
  address1: string
  address2: string
  country: string
  zipcode: string
  state: string
  city: string
  mobile_number: string
}

export type UserDataPublic = Omit<UserDataPrivate, 'password' | 'mobile_number' | 'birth_date' | 'firstname' | 'lastname'> & {
  id: number
  birth_day: string
  first_name: string
  last_name: string
}

export type UserDataCredentials = Pick<UserDataPrivate, 'email' | 'password'>
