import { Locator, Page } from '@playwright/test';

export class LoginPage {
    loginInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;
    errorToShortLogin: Locator;
    errorToShortPassword: Locator;

  constructor(page: Page) {
    this.loginInput = page.getByTestId('login-input');
    this.passwordInput = page.getByTestId('password-input');
    this.loginButton = page.getByTestId('login-button');
    this.errorToShortLogin = page.getByTestId('error-login-id');
    this.errorToShortPassword = page.getByTestId('error-login-password');
  }

async login(userID: string, password: string) {
  await this.loginInput.fill(userID);
  await this.passwordInput.fill(password);
  await this.loginButton.click();
}

async loginWithoutPassword(userID: string) {
  await this.loginInput.fill(userID);
  await this.loginInput.blur();
}

async loginWithoutUsername(password: string) {
  await this.passwordInput.fill(password);
  await this.passwordInput.blur();
}

}

