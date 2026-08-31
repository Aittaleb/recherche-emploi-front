# Job Matcher Front

Application front-end Angular pour la recherche d'emploi, le suivi des offres et l'analyse de correspondance (matching) entre un profil utilisateur et des offres.

## Description générale

Ce projet fournit une interface utilisateur pour :
- se connecter,
- consulter un tableau de bord,
- rechercher des offres,
- visualiser des résultats détaillés,
- gérer des offres sauvegardées,
- consulter son profil,
- afficher un rapport de matching.

L'application est organisée autour de routes protégées (`authGuard`) et peut fonctionner avec un backend réel (proxy local) ou un mock server intégré.

## Fonctionnalités principales

- Authentification via page de login.
- Tableau de bord utilisateur.
- Recherche d'offres d'emploi.
- Consultation de la liste de résultats.
- Gestion des offres favorites / sauvegardées.
- Consultation du profil utilisateur.
- Rapport de correspondance (matching) entre profil et offre.
- Gestion d'erreurs centralisée côté front.

## Versions compatibles

Les versions suivantes sont utilisées dans le projet :
- Angular CLI : `21.2.21`
- Angular (core/common/router/forms...) : `^21.2.0`
- TypeScript : `~5.9.2`
- npm (via `packageManager`) : `11.3.0`

Compatibilité Node.js recommandée pour Angular 21 :
- `>=20.19.0` (LTS recommandé),
- ou `>=22.12.0`,
- ou `>=24.0.0`.

> Note : `package.json` ne fixe pas explicitement `engines.node`. En cas d'écart de version, alignez Node sur une version compatible Angular 21.

## Prérequis

- Node.js compatible (voir section précédente).
- npm (la version `11.3.0` est attendue par le projet).

## Installation

```powershell
npm install
```

## Démarrage du projet

### 1) Démarrage standard

```powershell
npm run start
```

Puis ouvrir : `http://localhost:4200`

### 2) Démarrage avec proxy vers backend local (port 8080)

```powershell
npm run start:local
```

Utilise `proxy-conf/conf-local.json` (`/api/** -> http://localhost:8080`).

### 3) Démarrage avec proxy TI (port 3000)

```powershell
npm run start:ti
```

Utilise `proxy-conf/conf-ti.json` (`/api/** -> http://localhost:3000`).

### 4) Démarrage du mock server seul

```powershell
npm run start:mock-server
```

Le mock server répond sur : `http://localhost:3000`.

### 5) Démarrage TI + mock server en parallèle

```powershell
npm run start:ti:with-mock
```

Lance simultanément :
- l'application Angular (port 4200),
- le mock server (port 3000).

## Build

```powershell
npm run build
```

Build de production dans le dossier `dist/`.

Mode watch (développement) :

```powershell
npm run watch
```

## Tests

### Tests unitaires

Lance l'ensemble des tests unitaires :

```powershell
npm run test
```

Lance un fichier de test spécifique :

```powershell
npm run test:offres.service.spec.ts
```

### Tests d'intégration / end-to-end (Playwright)

Lance les tests e2e :

```powershell
npm run test:playwright
```

Mode UI Playwright (debug visuel) :

```powershell
npm run test:playwright:ui
```

Ouvre le rapport HTML Playwright :

```powershell
npm run test:playwright:report
```

> La configuration Playwright démarre automatiquement l'application avec `npm run start:ti:with-mock` avant les tests.

## Scripts disponibles (`package.json`)

- `npm run start` : serveur Angular standard.
- `npm run start:local` : Angular + proxy vers backend local `:8080`.
- `npm run start:ti` : Angular + proxy vers service TI/mock `:3000`.
- `npm run start:mock-server` : API mock Node.js.
- `npm run start:ti:with-mock` : Angular + mock en parallèle.
- `npm run build` : build de production.
- `npm run watch` : build en mode watch.
- `npm run test` : tests unitaires.
- `npm run test:offres.service.spec.ts` : test unitaire ciblé.
- `npm run test:playwright` : tests e2e.
- `npm run test:playwright:ui` : e2e en mode interactif.
- `npm run test:playwright:report` : visualisation du rapport e2e.

## Arborescence utile

- `src/app/app.routes.ts` : routes principales de l'application.
- `mock-server/` : serveur mock et jeux de données JSON.
- `e2e/` : scénarios Playwright.
- `proxy-conf/` : configuration de proxy selon l'environnement.

## Notes

- Si un port est déjà utilisé (`4200` ou `3000`), arrêtez le processus concerné avant de relancer.
- Pour un flux de dev sans backend, privilégiez `npm run start:ti:with-mock`.
