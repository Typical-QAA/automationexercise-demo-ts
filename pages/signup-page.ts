import type { Locator, Page } from '@playwright/test'
import type { UserDataPrivate } from '../types/user.types'
import { BasePage } from './base-page'

class AccountForm {
  readonly container: Locator
  readonly title: Locator
  readonly titleMr: Locator
  readonly titleMrs: Locator
  readonly nameInput: Locator
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly daySelect: Locator
  readonly monthSelect: Locator
  readonly yearSelect: Locator
  readonly newsletterCheckbox: Locator
  readonly offersCheckbox: Locator
  readonly firstNameInput: Locator
  readonly lastNameInput: Locator
  readonly companyInput: Locator
  readonly address1Input: Locator
  readonly address2Input: Locator
  readonly countrySelect: Locator
  readonly stateInput: Locator
  readonly cityInput: Locator
  readonly zipcodeInput: Locator
  readonly mobileNumberInput: Locator
  readonly createAccountButton: Locator

  constructor(container: Locator) {
    this.container = container
    this.title = this.container.locator('h2.title').first()
    this.titleMr = this.container.locator('#id_gender1')
    this.titleMrs = this.container.locator('#id_gender2')
    this.nameInput = this.container.getByTestId('name')
    this.emailInput = this.container.getByTestId('email')
    this.passwordInput = this.container.getByTestId('password')
    this.daySelect = this.container.getByTestId('days')
    this.monthSelect = this.container.getByTestId('months')
    this.yearSelect = this.container.getByTestId('years')
    this.newsletterCheckbox = this.container.locator('#newsletter')
    this.offersCheckbox = this.container.locator('#optin')
    this.firstNameInput = this.container.getByTestId('first_name')
    this.lastNameInput = this.container.getByTestId('last_name')
    this.companyInput = this.container.getByTestId('company')
    this.address1Input = this.container.getByTestId('address')
    this.address2Input = this.container.getByTestId('address2')
    this.countrySelect = this.container.getByTestId('country')
    this.stateInput = this.container.getByTestId('state')
    this.cityInput = this.container.getByTestId('city')
    this.zipcodeInput = this.container.getByTestId('zipcode')
    this.mobileNumberInput = this.container.getByTestId('mobile_number')
    this.createAccountButton = this.container.getByTestId('create-account')
  }
}

export class SignupPage extends BasePage {
  readonly URL = '/signup'
  readonly container: Locator
  readonly accountForm: AccountForm

  constructor(page: Page) {
    super(page)
    this.container = page.locator('.container')
    this.accountForm = new AccountForm(page.locator('#form div.login-form'))
  }

  async fillSignupForm(user: UserDataPrivate) {
    await (user.title === 'Mr' ? this.accountForm.titleMr : this.accountForm.titleMrs).check()
    await this.accountForm.nameInput.fill(user.name)
    await this.accountForm.passwordInput.fill(user.password)
    await this.accountForm.daySelect.selectOption(user.birth_date)
    await this.accountForm.monthSelect.selectOption(user.birth_month)
    await this.accountForm.yearSelect.selectOption(user.birth_year)
    await this.accountForm.firstNameInput.fill(user.firstname)
    await this.accountForm.lastNameInput.fill(user.lastname)
    await this.accountForm.companyInput.fill(user.company)
    await this.accountForm.address1Input.fill(user.address1)
    await this.accountForm.address2Input.fill(user.address2)
    await this.accountForm.countrySelect.selectOption(user.country)
    await this.accountForm.stateInput.fill(user.state)
    await this.accountForm.cityInput.fill(user.city)
    await this.accountForm.zipcodeInput.fill(user.zipcode)
    await this.accountForm.mobileNumberInput.fill(user.mobile_number)
  }
}
