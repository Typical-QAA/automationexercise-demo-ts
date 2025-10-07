import type { Locator, Page } from '@playwright/test'
import { BasePage } from './base-page'

class LoginForm {
  readonly container: Locator
  readonly title: Locator
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator
  readonly errorMessage: Locator

  constructor(container: Locator) {
    this.container = container
    this.title = this.container.getByRole('heading', { level: 2 })
    this.emailInput = this.container.getByTestId('login-email')
    this.passwordInput = this.container.getByTestId('login-password')
    this.loginButton = this.container.getByTestId('login-button')
    this.errorMessage = this.container.locator('p[style="color: red;"]')
  }
}

class SignupForm {
  readonly container: Locator
  readonly title: Locator
  readonly nameInput: Locator
  readonly emailInput: Locator
  readonly signupButton: Locator
  readonly errorMessage: Locator

  constructor(container: Locator) {
    this.container = container
    this.title = this.container.getByRole('heading', { level: 2 })
    this.nameInput = this.container.getByTestId('signup-name')
    this.emailInput = this.container.getByTestId('signup-email')
    this.signupButton = this.container.getByTestId('signup-button')
    this.errorMessage = this.container.locator('p[style="color: red;"]')
  }
}

export class LoginPage extends BasePage {
  readonly URL = '/login'
  readonly container: Locator
  readonly loginForm: LoginForm
  readonly signupForm: SignupForm

  constructor(page: Page) {
    super(page)
    this.container = page.locator('.container')
    this.loginForm = new LoginForm(page.locator('#form div.login-form'))
    this.signupForm = new SignupForm(page.locator('#form div.signup-form'))
  }

  async fillLoginForm(email: string, password: string) {
    await this.loginForm.emailInput.fill(email)
    await this.loginForm.passwordInput.fill(password)
  }

  async fillSignupForm(name: string, email: string) {
    await this.signupForm.nameInput.fill(name)
    await this.signupForm.emailInput.fill(email)
  }

  async doLoginWithCredentials(email: string, password: string) {
    await this.fillLoginForm(email, password)
    await this.loginForm.loginButton.click()
  }
}
