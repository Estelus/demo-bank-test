import { Locator, Page } from '@playwright/test';

export class LoginPage {
  loginInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  errorToShortLogin: Locator;
  errorToShortPassword: Locator;

  constructor(private page: Page) {
    this.loginInput = page.getByTestId('login-input');
    this.passwordInput = page.getByTestId('password-input');
    this.loginButton = page.getByTestId('login-button');
    this.errorToShortLogin = page.getByTestId('error-login-id');
    this.errorToShortPassword = page.getByTestId('error-login-password');
  }

  async fillCredentials(userID: string, password: string) {
    await this.loginInput.fill(userID);
    await this.loginInput.blur();
    await this.passwordInput.fill(password);
    await this.passwordInput.blur();
  }

  async login() {
    await this.loginButton.click();
  }

  async loginWithoutPassword(userID: string) {
    await this.loginInput.fill(userID);
    await this.passwordInput.click();
    await this.passwordInput.blur();
  }

  async loginWithoutUsername(password: string) {
    await this.loginInput.click();
    await this.loginInput.blur();
    await this.passwordInput.fill(password);
    await this.passwordInput.blur();
  }
}
