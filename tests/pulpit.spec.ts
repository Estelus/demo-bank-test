import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => { 
      // Arrange
  test.beforeEach(async ({page}) => {
    const url = 'https://demo-bank.vercel.app/';
    await page.goto(url)  
  });
    const url = 'https://demo-bank.vercel.app/'
    const login = 'AndrzejD'
    const password = 'test123@'
    const reciverID = '2'
    const transferAmount = '100'
    const transferTitle = 'Zwrot środków'
    const expectedtransferReciver = 'Chuck Demobankowy'
    const accountOwner = 'Jan Demobankowy'

  test('Quick payment with correct data', async ({ page }) => {
    // Act
    await page.getByTestId('login-input').fill(login);
    await page.getByTestId('password-input').fill(password);
    await page.getByTestId('login-button').click();
      
    await page.locator('#widget_1_transfer_receiver').selectOption(reciverID);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);

    await page.locator('#execute_btn').click();
    await page.getByTestId('close-button').click();
    // Assert  
    await expect(page.locator('#show_messages')).toHaveText(`Przelew wykonany! ${expectedtransferReciver} - ${transferAmount},00PLN - ${transferTitle}`);
  });

  test('Quick phone recharge with correct data', async ({ page }) => {
    // Act
    await page.getByTestId('login-input').fill(login);
    await page.getByTestId('password-input').fill(password);
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_topup_receiver').selectOption('502 xxx xxx');
    await page.locator('#widget_1_topup_amount').fill(transferAmount);
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();
    // Assert
    await expect(page.locator('#show_messages')).toHaveText(`Doładowanie wykonane! ${transferAmount},00PLN na numer 502 xxx xxx`);
  });

  test('Click to see account details', async ({ page }) => {
    // Act
    await page.getByTestId('login-input').fill(login);
    await page.getByTestId('password-input').fill(password);
    await page.getByTestId('login-button').click();

    await page.locator('#accounts_list').getByText('więcej').click();
    await page.locator('#owner').click();

    // Assert
    await expect(page.locator('#owner')).toHaveText(`${accountOwner}`); 
  });

  test('Check receipts and expenses', async ({ page }) => {

    // Act
    await page.getByTestId('login-input').fill(login);
    await page.getByTestId('password-input').fill(password);
    await page.getByTestId('login-button').click();

    await page.locator('form').filter({ hasText: 'manager finansowy wpływy i' }).getByRole('combobox').selectOption('1');

    // Assert
    await expect(page.locator('form').filter({ hasText: 'manager finansowy wpływy i' })).toHaveClass(`box-white widget`);
  });

  test('Check saving account details', async ({ page }) => {
    // Act
    await page.getByTestId('login-input').fill(login);
    await page.getByTestId('password-input').fill(password);
    await page.getByTestId('login-button').click();

    await page.locator('article').filter({ hasText: 'TEStos (22 xxxx xxxx xxxx' }).locator('a').click();

    // Assert
    await expect(page.getByText('Progress')).toHaveId(""); 
  });

  test('Log out from the desktop', async ({ page }) => {

    // Act
    await page.getByTestId('login-input').fill(login);
    await page.getByTestId('password-input').fill(password);
    await page.getByTestId('login-button').click();

    await page.getByTestId('logout-button').click();
    await page.getByRole('heading', { name: 'Wersja demonstracyjna serwisu' }).click();

    // Assert
    await expect(page.getByRole('heading', {name: 'Wersja demonstracyjna serwisu'})).toHaveText(`Wersja demonstracyjna serwisu Demobank`);
  });
  
})