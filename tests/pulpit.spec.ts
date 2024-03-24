import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => { 
      test('quick payment with correct data', async ({ page }) => {
      // Arrange
      const url = 'https://demo-bank.vercel.app/'
      const login = 'AndrzejD'
      const password = 'test123@'
      const reciverID = '2'
      const transferAmount = '100'
      const transferTitle = 'Zwrot środków'
      const transferReciver = 'Chuck Demobankowy'
      // Act
      await page.goto(url);
      await page.getByTestId('login-input').fill(login);
      await page.getByTestId('password-input').fill(password);
      await page.getByTestId('login-button').click();
      
      await page.locator('#widget_1_transfer_receiver').selectOption(reciverID);
      await page.locator('#widget_1_transfer_amount').fill(transferAmount);
      await page.locator('#widget_1_transfer_title').fill(transferTitle);

      await page.locator('#execute_btn').click();
      await page.getByTestId('close-button').click();
 
      await expect(page.locator('#show_messages')).toHaveText(`Przelew wykonany! ${transferReciver} - ${transferAmount},00PLN - ${transferTitle}`);
    });
    
      test('quick phone recharge with correct data', async ({ page }) => {
      await page.goto('https://demo-bank.vercel.app/');
      await page.getByTestId('login-input').fill('AndrzejD');
      await page.getByTestId('password-input').fill('12345678');
      await page.getByTestId('login-button').click();

      await page.locator('#widget_1_topup_receiver').selectOption('502 xxx xxx');
      await page.locator('#widget_1_topup_amount').fill('40');
      await page.locator('#uniform-widget_1_topup_agreement span').click();
      await page.getByRole('button', { name: 'doładuj telefon' }).click();
      await page.getByTestId('close-button').click();

      await expect(page.locator('#show_messages')).toHaveText('Doładowanie wykonane! 40,00PLN na numer 502 xxx xxx');
    });
})