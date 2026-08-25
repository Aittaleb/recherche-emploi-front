import { Competence } from './competences.model';

export type ProfilUtilisateur = {
  id?: number;
  nom?: string;
  prenom?: string;
  email?: string;
  localisation?: string;
  codePostal?: string;
  anneeExperience?: number;
  competences?: Competence[];
};
