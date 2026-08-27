import { Competence } from './competences.model';

export type Dashboard = {
  competencesADevelopper?: Competence[];
  matchMoyen?: number;
  nombreOffreAnalysees?: number;
  nombreOffreFavories?: number;
};
