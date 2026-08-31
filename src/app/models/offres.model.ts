export type Offre = {
  id?: number | null;
  identifiantFt?: string;
  intituleOffre?: string;
  lieuTravail?: string;
  codePostal?: string | null;
  salaire?: string | null;
};

export type OffreDetails = Offre & {
  description?: string | null;
  typeContratLibelle?: string | null;
  natureContrat?: string | null;
  experienceLibelle?: string | null;
  dureeTravail?: string | null;
};
