
import { test, expect } from '@playwright/test';

test.describe('Ecran mon profil', () => {

  test.beforeEach( async ({ page }) => {
    await page.goto('http://localhost:4200/login');
    // saisir login et mot de passe puis clique sur le bouton de connexion
    await page.getByLabel('Email').fill('abdel@gmail.com');
    await page.getByLabel('Mot de passe').fill('123456@@@@@');
    await page.getByRole('button', { name: 'Commencer' }).click();
    await page.getByRole('button', { name: 'User menu' }).click();
    await page.getByRole('menuitem', { name: 'Mon Profile' }).click();
  });

  test('Affichage des informations du profil', async ({ page }) => {

    await expect(page.getByRole('heading', { name: 'Mon Profil' })).toBeVisible();
    await expect(page.locator('[data-test="identite-section"]')).toBeVisible();
    await expect(page.locator('[data-test="localisation-section"]')).toBeVisible();
  });

  test('Modification du profil utilisateur', async ({ page }) => {
    await page.locator('[data-test="modifier-profil-button"]').click();
    await expect(page.locator('[data-test="titre-modal-modification-profil"]')).toBeVisible();

    // remplir le formulaire de modification du profil$
    await page.locator('[data-test="input-nom"]').fill('Nom modifié');
    await page.locator('[data-test="input-prenom"]').fill('Prenom modifié');
    await page.locator('[data-test="input-email"]').fill('adress@gmail.com');
    await page.locator('[data-test="input-localisation"]').fill('Nouvelle localisation');
    await page.locator('[data-test="input-code-postal"]').fill('75000');
    await page.locator('[data-test="input-annee-experience"]').fill('5');

    // enlever une compétence
    await page.getByRole('button', { name: 'Supprimer React.js' }).click();

    await page.getByRole('button', { name: 'Enregistrer' }).click();
    await expect(page.getByText('Profil mis à jour avec succès !')).toBeVisible();
  });


});
