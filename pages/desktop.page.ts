import { Page } from "@playwright/test";

export class DesktopPage {
    constructor (private page: Page) {}
    widgetTransferReceiver = this.page.locator('#widget_1_transfer_receiver');
    widgetTransferAmount = this.page.locator('#widget_1_transfer_amount'); 
    widgetTransferTitle = this.page.locator('#widget_1_transfer_title');
    widgetTopupReceiver = this.page.locator('#widget_1_topup_receiver');
    widgetTopUpAmount = this.page.locator('#widget_1_topup_amount');
    widgetTopupAgreementSpan = this.page.locator('#uniform-widget_1_topup_agreement span');
    buttonForTopUpPhone = this.page.getByRole('button', { name: 'doładuj telefon' });
    closeButton = this.page.getByTestId('close-button');
    accountsList = this.page.locator('#accounts_list'); 
    accountOwner = this.page.getByTestId('user-name');
    financialManagerButton = this.page.locator('form').filter({ hasText: 'manager finansowy wpływy i' }).getByRole('combobox');
    savingAccountDetails = this.page.getByTestId('account-number');
    logoutButton = this.page.getByTestId('logout-button'); 
    pageHeading = this.page.getByRole('heading', { name: 'Wersja demonstracyjna serwisu' });
}
