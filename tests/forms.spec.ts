import { test } from '@playwright/test';
import { HomePage } from '../pages/Home-page';
import { FormsPage } from '../pages/Forms-page';

let homePage: HomePage;
let formsPage: FormsPage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  formsPage = new FormsPage(page);
  
  await homePage.gotoHome();
})

test('Preencher formulario Pratice Form', async ({ page }) => {
  await homePage.menuHome('Forms');  

  await formsPage.subMenuPracticeForm();

  await formsPage.forms();
  await formsPage.submitForms();
  await formsPage.validatedSuccess();
});