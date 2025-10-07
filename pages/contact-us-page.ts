import type { Locator, Page } from '@playwright/test'
import { BasePage } from './base-page'

class ContactForm {
  readonly container: Locator
  readonly title: Locator
  readonly nameInput: Locator
  readonly emailInput: Locator
  readonly subjectInput: Locator
  readonly messageInput: Locator
  readonly fileInput: Locator
  readonly submitButton: Locator
  readonly successAlert: Locator
  readonly homeButton: Locator

  constructor(container: Locator) {
    this.container = container
    this.title = this.container.getByRole('heading', { name: 'Get In Touch' })
    this.nameInput = this.container.getByTestId('name')
    this.emailInput = this.container.getByTestId('email')
    this.subjectInput = this.container.getByTestId('subject')
    this.messageInput = this.container.getByTestId('message')
    this.fileInput = this.container.locator('input[name="upload_file"]')
    this.submitButton = this.container.getByTestId('submit-button')
    this.successAlert = this.container.locator('.status.alert.alert-success')
    this.homeButton = this.container.locator('a.btn.btn-success')
  }
}

export class ContactUsPage extends BasePage {
  readonly URL = '/contact_us'
  readonly container: Locator
  readonly contactForm: ContactForm

  constructor(page: Page) {
    super(page)
    this.container = page.locator('.container')
    this.contactForm = new ContactForm(page.locator('div.contact-form'))
  }

  async fillContactForm(name: string, email: string, subject: string, message: string) {
    await this.contactForm.nameInput.fill(name)
    await this.contactForm.emailInput.fill(email)
    await this.contactForm.subjectInput.fill(subject)
    await this.contactForm.messageInput.fill(message)
  }
}
