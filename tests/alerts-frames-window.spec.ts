import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/Home-page';
import { AlertsFramesWindow } from '../pages/alerts-frames-window-page';

let homePage: HomePage;
let alertsFramesWindow: AlertsFramesWindow;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    alertsFramesWindow = new AlertsFramesWindow(page)

    await homePage.gotoHome();
    await alertsFramesWindow.menuHome('Alerts, Frame & Windows');
});

test('Abrir nova janela e validar mensagem' , async ({ page }) => {
    await alertsFramesWindow.subMenuAlertsFramesWindow('Browser Windows');
    const newWindow = await alertsFramesWindow.buttonNewWindow();
    await alertsFramesWindow.validateNewWindow(newWindow);
    await newWindow.goBack();
    await expect(page).toHaveURL(/browser-windows/);

})

test('Abrir modal de dialogos' , async ({ page }) => {
    await alertsFramesWindow.subMenuAlertsFramesWindow('Modal Dialogs');
    await expect(page).toHaveURL(/modal-dialogs/);
    await alertsFramesWindow.smallModal();
    await alertsFramesWindow.validateSmallModal();
    await alertsFramesWindow.fecharModal();
    await alertsFramesWindow.validateModalClose();
});