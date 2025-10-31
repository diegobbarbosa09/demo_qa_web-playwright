import { test } from '@playwright/test';
import { HomePage } from '../pages/Home-page';
import { ElementsPage } from '../pages/Elements-page';
import { generateFakeUser } from '../utils/faker-utils';

let homePage: HomePage;
let elementsPage: ElementsPage

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    elementsPage = new ElementsPage(page);
    
    await homePage.gotoHome();
})

test.only('deve add novo usuario, editar e deletar', async ({ page }) => {
    const user = generateFakeUser();

    await homePage.menuHome('Elements');    

    await elementsPage.subMenuWebTables();    

    await elementsPage.addUser();
    await elementsPage.formsWebTables(user);
    await elementsPage.submit();

    await elementsPage.editarPerfil(user);
    await elementsPage.submit();
    await elementsPage.deleteProfile(user);
    await elementsPage.validateDeletedProfile(user);
})