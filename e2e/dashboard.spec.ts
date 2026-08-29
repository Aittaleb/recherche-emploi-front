import { test, expect } from '@playwright/test';

test.describe('Ecran dashboard', () => {
  test.beforeEach( async ({ page }) => {
    await page.goto('http://localhost:4200/login');
    // saisir login et mot de passe puis clique sur le bouton de connexion
    await page.getByLabel('Email').fill('abdel@gmail.com');
    await page.getByLabel('Mot de passe').fill('123456@@@@@');
    await page.getByRole('button', { name: 'Commencer' }).click();
  });

  test('verifier l\'affichage des éléments du dashboard', async ({ page }) => {
    // affichage du titre de la page
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

    await expect(page.getByText('Bonjour Abdelhamid')).toBeVisible();
    await expect(page.getByText('Voici un aperçu de votre')).toBeVisible();
    await expect(page.getByText('Match moyen')).toBeVisible();
    await expect(page.locator('[data-test="match-moyen"]')).toHaveText('20');
    await expect(page.getByText('Offres analysees')).toBeVisible();
    await expect(page.locator('[data-test="offres-analysees"]')).toHaveText('23');
    await expect(page.getByText('Offres favorites')).toBeVisible();
    await expect(page.locator('[data-test="nombre-favories"]')).toHaveText('3');
    await expect(page.getByText('Competences les plus')).toBeVisible();
    await expect(page.locator('[data-test="competence-chip"]')).toHaveCount(3);
    await expect(page.getByRole('button', { name: 'Rechercher des offres' })).toBeVisible();
  });

});
