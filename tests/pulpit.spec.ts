import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => { 
    test.only('quick payment with correct data', async ({ page }) => {
        await page.goto('https://demo-bank.vercel.app/');
        await page.getByTestId('login-input').fill('AndrzejD');
        await page.getByTestId('password-input').fill('12345678');
        await page.getByTestId('login-button').click();

        await page.locator('#widget_1_transfer_receiver').selectOption('2');
        await page.locator('#widget_1_transfer_amount').fill('120');
        await page.locator('#widget_1_transfer_title').fill('Zwrot środków');

        await page.locator('#execute_btn').click();
        await page.getByTestId('close-button').click();
 
        await expect(page.locator('#show_messages')).toHaveId('show_messages');
      });

})