import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';


const __dirname = dirname(fileURLToPath(import.meta.url));

export const routes = [
  // Dashboard
  {
    regex: /^\/api\/dashboard\/user\/\d+$/,
    file: join(__dirname, 'mocks/dashboard.json'),
  },
  // Referentiel competences
  { prefix: '/api/rome/competences', file: join(__dirname, 'mocks/competences.json') },
  // Offres
  { regex: /^\/api\/offres$/, file: join(__dirname, 'mocks/offres.json') },
  { regex: /^\/api\/offres\/[A-Z0-9]+$/, file: join(__dirname, 'mocks/offre-details.json') },
  // Matching
  {
    regex: /^\/api\/profil\/\d+\/offre\/[A-Z0-9]+\/matching$/,
    file: join(__dirname, 'mocks/matching.json'),
  },
  // Profil
  {
    regex: /^\/api\/profil\/\d+$/,
    file: join(__dirname, 'mocks/profil.json'),
  },
  // Offres favorites
  {
    regex: /^\/api\/offres\/favorites\/[A-Z0-9]+\/user\/\d+$/,
    file: join(__dirname, 'mocks/favorites.json'),
  },
  {
    regex: /^\/api\/offres\/favorites\/user\/\d+$/,
    file: join(__dirname, 'mocks/favorites.json'),
  },
];
