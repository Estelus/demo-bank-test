import { Page } from "@playwright/test";

export class DesktopPage {
    constructor (private page: Page) {}
    widgetTransferReceiver = this.page.locator('#widget_1_transfer_receiver');
    widgetTransferAmount = this.page.locator('#widget_1_transfer_amount'); 
    widgetTransferTitle = this.page.locator('#widget_1_transfer_title');
    widgetTopupReceiver = this.page.locator('#widget_1_topup_receiver');
    widgetTopUpAmount = this.page.locator('#widget_1_topup_amount');
    accountsList = this.page.locator('#accounts_list'); 
    financialManagerButton = this.page.locator('form').filter({ hasText: 'manager finansowy wpływy i' }).getByRole('combobox');
    savingAccountDetails = this.page.locator('article').filter({ hasText: 'TEStos (22 xxxx xxxx xxxx' }).locator('a');
    logoutButton = this.page.getByTestId('logout-button'); 
    pageHeading = this.page.getByRole('heading', { name: 'Wersja demonstracyjna serwisu' });
}
