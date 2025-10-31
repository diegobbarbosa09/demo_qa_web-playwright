import { expect, Locator, Page} from '@playwright/test'; 
import { generateFakeUser } from '../utils/faker-utils';
import path from 'path';

export class FormsPage {
    readonly menu: Locator;
    readonly subMenu: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly userEmail: Locator;
    readonly userNumber: Locator;
    readonly dateBirthDay: Locator;
    readonly hobbies: Locator;
    readonly artifactFile: Locator;
    readonly currentAddress: Locator;
    readonly state: Locator;
    readonly city: Locator;
    readonly buttonSubmit: Locator;
    readonly modalSuccess: Locator;

    constructor( private readonly page: Page ) {
        this.menu = page.locator('h5', { hasText: 'Forms' });
        this.subMenu = page.locator('span', { hasText: 'Practice Form'});
        this.firstName = page.locator('div input#firstName');
        this.lastName = page.locator('div input#lastName');
        this.userEmail = page.locator('div input#userEmail');
        this.userNumber = page.locator('div input#userNumber');
        this.dateBirthDay = page.locator('div input#dateOfBirthInput');
        this.hobbies = page.locator('div input#hobbies-checkbox-3');
        this.artifactFile = page.locator('div input#uploadPicture');
        this.currentAddress = page.locator('div textarea#currentAddress');
        this.state = page.locator('div div#state');
        this.city = page.locator('div div#city');
        this.buttonSubmit = page.getByRole('button', { name: 'Submit' });
        this.modalSuccess = page.getByText('Thanks for submitting the form')
    }

    async subMenuPracticeForm() {
        await this.subMenu.click();
        await expect(this.page).toHaveURL(/automation-practice-form/);
    }

    async forms() {
        const user = generateFakeUser()

        await this.firstName.fill(user.firstName);
        await this.lastName.fill(user.lastName);
        await this.userEmail.fill(user.email.toLowerCase());
        await this.page.locator(`input[value="${user.gender}"]`).click({ force: true })
        await this.userNumber.fill(user.phone);
        await this.dateBirthDay.type(`${user.birthDate}`);
        await this.hobbies.click({ force: true });
        await this.artifactFile.setInputFiles(path.join(__dirname, '../fixtures/Teste_QA.txt'));
        await this.currentAddress.fill(user.address);
        await this.state.click();
        await this.page.getByText('Uttar Pradesh').click();
        await this.city.click();
        await this.page.getByText('Merrut').click();
    }
    
    async submitForms() {
        await this.buttonSubmit.click();
    }
    
    async validatedSuccess() {
        await expect(this.modalSuccess).toBeVisible();
    }

}