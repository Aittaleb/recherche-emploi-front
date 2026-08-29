import { test, expect } from '@playwright/test';

test.describe('Menu de navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/login');
    // saisir login et mot de passe puis clique sur le bouton de connexion
    await page.getByLabel('Email').fill('abdel@gmail.com');
    await page.getByLabel('Mot de passe').fill('123456@@@@@');
    await page.getByRole('button', { name: 'Commencer' }).click();
  });

  test('Navigation vers le dashboard', async ({ page }) => {
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('Navigation vers la recherche', async ({ page }) => {
    await page.getByRole('link', { name: 'Chercher une offre' }).click();
    await expect(page.getByRole('heading', { name: 'Chercher une offre' })).toBeVisible();
  });

  test('Navigation vers mes offres', async ({ page }) => {
    await page.getByRole('link', { name: 'Mes Offres' }).click();
    await expect(page.getByRole('heading', { name: 'Mes Offres' })).toBeVisible();
  });

  test('Navigation vers mon profil', async ({ page }) => {
    await page.getByRole('button', { name: 'User menu' }).click();
    await page.getByRole('menuitem', { name: 'Mon Profile' }).click();
    await expect(page.getByRole('heading', { name: 'Mon Profil' })).toBeVisible();
  });
});
