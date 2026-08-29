import { test, expect } from '@playwright/test';

test.describe('Page Mes offres', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/login');
    // saisir login et mot de passe puis clique sur le bouton de connexion
    await page.getByLabel('Email').fill('abdel@gmail.com');
    await page.getByLabel('Mot de passe').fill('123456@@@@@');
    await page.getByRole('button', { name: 'Commencer' }).click();
  });

  test('Liste des offres favorites', async ({ page }) => {
    await page.getByRole('link', { name: 'Mes Offres' }).click();

    await expect(page.getByRole('heading', { name: 'Mes Offres' })).toBeVisible();
    await expect(page.getByText('Vos offres sauvegardees.')).toBeVisible();
    await expect(page.getByText('Consultez les details et')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Revenir sur la recherche' })).toBeVisible();
    await expect(page.locator('[data-test="tableau-offres-sauvegardees"]')).toBeVisible();
    await expect(page.locator('[data-test="tableau-offres-sauvegardees"]').locator('[data-test="data-row"]'),).toHaveCount(3);

  });



});
