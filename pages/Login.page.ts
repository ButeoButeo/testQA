import { type Locator, type Page } from '@playwright/test'

export class LogInPage {
  readonly page: Page
  readonly emailAddress: Locator
  readonly continue: Locator
  readonly password: Locator
  readonly signupAction: Locator
  readonly validationError: Locator

  constructor(page: Page) {
    this.page = page
    this.emailAddress = page.getByPlaceholder('Email')
    this.password = page.getByPlaceholder('Password')
    this.continue = page.getByRole('button', { name: 'Sign in' })
    this.validationError = page.getByText('Either the user does not exist or the password is incorrect')
  }
  async doLogIn(email: string, password: string ) {
    await this.page.goto('https://platform-staging.reffie.me/')
    await this.emailAddress.fill(email)
    await this.password.fill(password)
    await this.continue.click()
  } 
}
