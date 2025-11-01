import { expect, Page, Locator } from "@playwright/test";

export class AlertsFramesWindow {
    readonly buttonNewWindowNow;
    readonly buttonSmallModal;

    constructor(private readonly page: Page) {
        this.buttonNewWindowNow = page.locator('#windowButton', { hasText: 'New Window' })
        this.buttonSmallModal = page.getByRole('button', { name: 'Small modal' })

    }

    async menuHome(menu: string) {
        this.page.locator('h5', { hasText: menu }).click();
        await expect(this.page).toHaveURL(`/alertsWindows`);
    }

    async subMenuAlertsFramesWindow(subMenuName: String) {
        await this.page.locator('span', { hasText: `${subMenuName}` }).click();
    }

    async buttonNewWindow() {
        const [newWindow] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.buttonNewWindowNow.click()
        ]);
        await expect(newWindow).toHaveURL('/sample');
        return newWindow;
    }

    async validateNewWindow(newWindow: Page) {
        await expect(newWindow.locator('h1')).toContainText('This is a sample page');
    }

    async smallModal() {
        await this.buttonSmallModal.click();
    }

    async validateSmallModal() {
        await expect(this.page.locator('.modal-header')).toContainText('Small Modal');
        await expect(this.page.locator('.modal-body')).toContainText('This is a small modal. It has very less content');
    }

    async fecharModal() {
        await this.page.locator('#closeSmallModal', { hasText: 'Close' }).click();
    }

    async validateModalClose() {
        await expect(this.page.locator('.modal-content')).not.toBeVisible();
    }
}