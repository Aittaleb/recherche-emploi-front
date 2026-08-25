import { Competence } from './competences.model';

export type RapportCorrespondance = {
  score?: number;
  competencesTrouvees?: Competence[];
  competencesManquantes?: Competence[];
}
