
import { test, expect } from '@playwright/test';

test.describe('Ecrant de connexion', () => {

  test.beforeEach( async ({ page }) => {
    await page.goto('http://localhost:4200/login');
  });

  test('devrait afficher le formulaire de connexion', async ({ page }) => {
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Mot de passe')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Commencer' })).toBeVisible();
  });

  test('devrait se connecter avec un login/mot de passe', async ({ page }) => {

    // saisir login et mot de passe puis clique sur le bouton de connexion
    await page.getByLabel('Email').fill('abdel@gmail.com');
    await page.getByLabel('Mot de passe').fill('123456@@@@@');
    await page.getByRole('button', { name: 'Commencer' }).click();

    // attendre que la page de tableau de bord soit visible
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

});
