import { Competence } from './competences.model';
import { Offre } from './offres.model';

export type Dashboard = {
  competencesADevelopper?: Competence[];
  matchMoyen?: number;
  nombreOffreAnalysees?: number;
  nombreOffreFavories?: number;
  offresProposees?: Offre[];
};
