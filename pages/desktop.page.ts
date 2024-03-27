import { Page } from "@playwright/test";

export class PulpitPage {
    constructor (private page: Page) {}
    accountsList = this.page.locator('#accounts_list'); 
    financialManagerButton = this.page.locator('form').filter({ hasText: 'manager finansowy wpływy i' }).getByRole('combobox');
    savingAccountDetails = this.page.locator('article').filter({ hasText: 'TEStos (22 xxxx xxxx xxxx' }).locator('a');
    logoutButton = this.page.getByTestId('logout-button'); 
    pageHeading = this.page.getByRole('heading', { name: 'Wersja demonstracyjna serwisu' });
}
