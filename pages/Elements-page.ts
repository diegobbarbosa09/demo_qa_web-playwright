import { expect, Locator, Page } from '@playwright/test';
import { User } from '../types/User'

export class ElementsPage {
    readonly menu: Locator;
    readonly subMenu: Locator;
    readonly buttonAdd: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly userEmail: Locator;
    readonly userAge: Locator;
    readonly userSalary: Locator;
    readonly userDepartment: Locator;
    readonly buttonSubmit: Locator;

    constructor(private readonly page: Page) {
        this.menu = page.locator('h5', { hasText: 'Elements' });
        this.subMenu = page.locator('span', { hasText: 'Web Tables' });
        this.buttonAdd = page.locator('button#addNewRecordButton');
        this.firstName = page.locator('input#firstName');
        this.lastName = page.locator('input#lastName');
        this.userEmail = page.locator('input#userEmail');
        this.userAge = page.locator('input#age');
        this.userSalary = page.locator('input#salary');
        this.userDepartment = page.locator('input#department');
        this.buttonSubmit = page.locator('button#submit')
    }

    async subMenuWebTables() {
        await this.subMenu.click();
        await expect(this.page).toHaveURL(/webtables/);
    }

    async addUser() {
        await this.buttonAdd.click();
    }

    async formsWebTables( user: User ) {

        await this.firstName.fill(user.firstName);
        await this.lastName.fill(user.lastName);
        await this.userEmail.fill(user.email.toLowerCase());
        await this.userAge.fill(user.age);
        await this.userSalary.fill(user.salary);
        await this.userDepartment.fill(user.department);
    }

    async submit() {
        await this.buttonSubmit.click();
    }

    async editarPerfil(user: User) {        
        const newUser = this.page.locator('div.rt-tr-group').filter({hasText: `${user.firstName}`});
        await newUser.scrollIntoViewIfNeeded();
        await expect(newUser).toBeVisible();
        await newUser.locator('span[title="Edit"]').click(); 

        const newAge = Number(user.age) + 2
        const newSalary = Number(user.salary) + 1000

        await this.userAge.fill(String(newAge));
        await this.userSalary.fill(String(newSalary));        
    }

    async deleteProfile(user: User) {
        const newUser = this.page.locator('div.rt-tr-group').filter({hasText: `${user.firstName}`});
        await newUser.scrollIntoViewIfNeeded();
        await expect(newUser).toBeVisible();
        await newUser.locator('span[title="Delete"]').click(); 
    }

    async validateDeletedProfile(user: User) {
        const newUser = this.page.locator('div.rt-tr-group').filter({hasText: `${user.firstName}`});
        await expect(newUser).not.toBeVisible();
    }
}