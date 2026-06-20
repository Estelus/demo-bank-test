import { Locator, Page } from "@playwright/test";

export class DesktopPage {
    widgetTransferReceiver: Locator;
    widgetTransferAmount: Locator;
    widgetTransferTitle: Locator;
    widgetTopupReceiver: Locator;
    widgetTopUpAmount: Locator;
    widgetTopupAgreementSpan: Locator;
    buttonForTopUpPhone: Locator;
    closeButton: Locator;
    accountsList: Locator;
    accountOwner: Locator;
    financialManagerButton: Locator;
    savingAccountDetails: Locator;
    logoutButton: Locator;
    pageHeading: Locator;
    headerUserName: Locator;
    
    constructor (private page: Page) {
    this.widgetTransferReceiver = page.locator('#widget_1_transfer_receiver');
    this.widgetTransferAmount = page.locator('#widget_1_transfer_amount');
    this.widgetTransferTitle = page.locator('#widget_1_transfer_title');
    this.widgetTopupReceiver = page.locator('#widget_1_topup_receiver');
    this.widgetTopUpAmount = page.locator('#widget_1_topup_amount');
    this.widgetTopupAgreementSpan = page.locator('#uniform-widget_1_topup_agreement span');
    this.buttonForTopUpPhone = page.getByRole('button', { name: 'doładuj telefon' });
    this.closeButton = page.getByTestId('close-button');
    this.accountsList = page.locator('#accounts_list');
    this.accountOwner = page.getByTestId('user-name');
    this.financialManagerButton = page.locator('form').filter({ hasText: 'manager finansowy wpływy i' }).getByRole('combobox');
    this.savingAccountDetails = page.getByTestId('account-number');
    this.logoutButton = page.getByTestId('logout-button');
    this.pageHeading = page.getByRole('heading', { name: 'Wersja demonstracyjna serwisu' });
    this.headerUserName = page.getByTestId('user-name');
    }
}
