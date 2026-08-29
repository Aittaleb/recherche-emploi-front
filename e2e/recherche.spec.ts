import { test, expect } from '@playwright/test';

test.describe('Page recherche', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/login');
    // saisir login et mot de passe puis clique sur le bouton de connexion
    await page.getByLabel('Email').fill('abdel@gmail.com');
    await page.getByLabel('Mot de passe').fill('123456@@@@@');
    await page.getByRole('button', { name: 'Commencer' }).click();
  });

  test("Liste des résultats d'une recherche", async ({ page }) => {
    await page.getByRole('button', { name: 'Rechercher des offres' }).click()

    await expect(page.getByRole('heading', { name: 'Chercher une offre' })).toBeVisible();
    await expect(page.getByText("Recherche d'offres")).toBeVisible();

    await expect(page.getByRole('button', { name: 'Rechercher' })).toBeVisible();
    await expect(page.locator('[data-test="bouton-rechercher"]')).toHaveAttribute('disabled', '');
    await page.locator('[data-test="input-recherche"]').fill('Developpeur Java');
    await expect(page.locator('[data-test="bouton-rechercher"]')).not.toHaveAttribute('disabled', '');
    await page.locator('[data-test="bouton-rechercher"]').click();

    await expect(page.locator('div').filter({ hasText: 'Résultats de recherche' })).toBeVisible();
    await expect(page.getByText("Une liste d'offre qui")).toBeVisible();
    await expect(page.getByRole('button', { name: 'Revenir sur la recherche' })).toBeVisible();
    await expect(page.locator('[data-test="item-resultat-recherche"]')).toHaveCount(7);
    for(let i = 0; i < 7; i++) {
      await expect(page.locator('[data-test="item-resultat-recherche"]').nth(i).locator('[data-test="intitule-offre"]')).toBeVisible();
      await expect(page.locator('[data-test="item-resultat-recherche"]').nth(i).locator('[data-test="salaire-offre"]')).toBeVisible();
      await expect(page.locator('[data-test="item-resultat-recherche"]').nth(i).locator('[data-test="lieu-offre"]')).toBeVisible();
      await expect(page.locator('[data-test="item-resultat-recherche"]').nth(i).locator('[data-test="bouton-voir-details"]')).toBeVisible();
    }
  });

  test('Vue détaillée d\'une offre sur la recherche', async ({ page }) => {
    await page.getByRole('button', { name: 'Rechercher des offres' }).click();

    await page.locator('[data-test="input-recherche"]').fill('Developpeur Java');
    await page.locator('[data-test="bouton-rechercher"]').click();

    // ouverture de la vue details d'une offre
    await page.locator('[data-test="item-resultat-recherche"]').nth(0).locator('[data-test="bouton-voir-details"]').click();
    await expect(
      page.getByRole('heading', { name: 'Agent de Production (h/f) (H/' }),
    ).toBeVisible();
    await expect(page.locator('[data-test="titre-details"]')).toBeVisible();
    await expect(page.locator('[data-test="titre-details"]')).toHaveText('Agent de Production (h/f) (H/F)',);
    await expect(page.locator('[data-test="localisation-details"]')).toHaveText('57 - Basse-Ham - 57970',);
    await expect(page.locator('[data-test="bouton-fermer-details"]')).toBeVisible();
    await expect(page.locator('[data-test="type-contrat-details"]')).toHaveText('MIS');
    await expect(page.locator('[data-test="duree-travail-details"]')).toHaveText('35H/semaine Travail en journée');
    await expect(page.locator('[data-test="experience-libelle-details"]')).toHaveText('1 An(s)');
    await expect(page.locator('[data-test="salaire-details"]')).toHaveText('Horaire de 13.93 Euros sur 12.0 mois');
    await expect(page.locator('[data-test="description-details"]')).toBeVisible();

    // ajouter une offre en favoris
    await page.getByRole('button', { name: 'Ajouter aux favoris' }).click();
    await expect(page.getByText('Offre ajoutée aux favoris avec succès !')).toBeVisible();
  });

});
