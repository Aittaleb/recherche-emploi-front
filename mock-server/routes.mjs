import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';


const __dirname = dirname(fileURLToPath(import.meta.url));

export const routes = [
  { prefix: '/api/offres?query=test', file: join(__dirname, 'mocks/offres.json') },
  { regex: /^\/api\/offres\/[A-Z0-9]+$/, file: join(__dirname, 'mocks/offre-details.json') },
  {
    regex: /^\/api\/profil\/\d+$/,
    file: join(__dirname, 'mocks/profil.json'),
  },
  {
    regex: /^\/api\/profil\/\d+\/offre\/[A-Z0-9]+\/matching$/,
    file: join(__dirname, 'mocks/matching.json'),
  },
  { prefix: '/api/rome/competences', file: join(__dirname, 'mocks/competences.json') },
  {
    regex: /^\/api\/dashboard\/user\/\d+$/,
    file: join(__dirname, 'mocks/user.json'),
  },
  {
    regex: /^\/api\/offres\/favorites\/user\/\d+$/,
    file: join(__dirname, 'mocks/favorites.json'),
  },
];
