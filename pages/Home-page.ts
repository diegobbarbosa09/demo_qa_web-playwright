import { expect, Page, Locator } from "@playwright/test";

export class HomePage {

    constructor(public readonly page: Page) {}

    async gotoHome() {
        await this.page.goto('/');
    }

    async menuHome(menu: string) {
        this.page.locator('h5', { hasText: menu }).click();
        await expect(this.page).toHaveURL(`/${menu.toLowerCase()}`);
    }
}