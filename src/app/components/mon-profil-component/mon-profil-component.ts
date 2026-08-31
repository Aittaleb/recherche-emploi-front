import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserService } from '../../services/user.service';
import { ProfilService } from '../../services/profil.service';
import { ProfilUtilisateur } from '../../models/profil.utilisateur.model';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRemove, MatChipRow } from '@angular/material/chips';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Competence } from '../../models/competences.model';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CompetencesService } from '../../services/competences.service';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import { ToasterService } from '../../services/toaster.service';
import { BlocErreurComponent } from '../bloc-erreur-component/bloc-erreur-component';

@Component({
  selector: 'app-mon-profil-component',
  imports: [
    MatButton,
    MatProgressSpinner,
    MatSidenavContainer,
    MatIcon,
    MatSidenav,
    MatFormField,
    MatLabel,
    MatIconButton,
    ReactiveFormsModule,
    MatInput,
    MatChipGrid,
    MatChipRow,
    MatChipRemove,
    FormsModule,
    MatAutocompleteTrigger,
    MatChipInput,
    MatAutocomplete,
    MatOption,
    BlocErreurComponent,
  ],
  templateUrl: './mon-profil-component.html',
  styleUrl: './mon-profil-component.css',
})
export class MonProfilComponent implements OnInit {
  readonly profilUtilisateur: WritableSignal<ProfilUtilisateur> = signal({});
  readonly affichagePret = computed(() => {
    return this.profilService.serviceEstPret() || this.profilService.estServiceEnErreur();
  });
  readonly sidenavOpen: WritableSignal<boolean> = signal(false);

  private readonly userService = inject(UserService);
  private readonly profilService = inject(ProfilService);
  private readonly competencesService = inject(CompetencesService);
  private readonly toasterService = inject(ToasterService);
  readonly announcer = inject(LiveAnnouncer);

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  /** Toutes les compétences chargées une seule fois (depuis l'API ou le localStorage) */
  readonly allCompetences = signal<Competence[]>([]);

  /** Compétences sélectionnées dans le formulaire (pré-remplies depuis le profil) */
  readonly competencesSelectionnees = signal<Competence[]>([]);

  /**
   * Contrôle standalone pour la recherche de compétences.
   * Isolé du FormGroup principal pour survivre à sa réinitialisation.
   */
  readonly competencesSearchControl = new FormControl('');

  /**
   * Valeur de saisie debouncée (200ms) convertie en signal pour alimenter le computed.
   */
  private readonly competencesSearchValue = toSignal(
    this.competencesSearchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      distinctUntilChanged(),
    ),
    { initialValue: '' },
  );

  /**
   * Filtre côté front sur allCompetences : exclut les sélectionnées
   * et applique la recherche textuelle sur le libellé.
   */
  readonly filteredCompetences = computed(() => {
    const term = (this.competencesSearchValue() ?? '').toLowerCase().trim();
    const selected = this.competencesSelectionnees();
    const all = this.allCompetences();

    if (!term) return [];

    return all.filter(
      (c) => c.libelle?.toLowerCase().includes(term) && !selected.some((s) => s.code === c.code),
    );
  });

  protected profilForm = new FormGroup({
    nom: new FormControl(''),
    prenom: new FormControl(''),
    email: new FormControl(''),
    localisation: new FormControl(''),
    codePostal: new FormControl(''),
    anneeExperience: new FormControl<number | null>(null),
  });

  ngOnInit(): void {
    this.profilService.declarerServicePret(false);
    const idUtilisateur = this.userService.currentUser().id;
    if (idUtilisateur) {
      this.profilService.getProfilInformation(idUtilisateur).subscribe((data) => {
        this.profilUtilisateur.set(data);
      });
    }
    // Chargement unique : depuis le localStorage si disponible, sinon depuis l'API (puis mis en cache)
    this.competencesService.getCompetences().subscribe((competences) => {
      this.allCompetences.set(competences);
    });
  }

  public closeSidenav(): void {
    this.sidenavOpen.set(false);
  }

  protected ouvrirModificationProfil(): void {
    this.initierFormulaireModification();
    this.sidenavOpen.set(true);
  }

  private initierFormulaireModification(): void {
    const profil = this.profilUtilisateur();
    this.competencesSelectionnees.set([...(profil.competences ?? [])]);
    this.competencesSearchControl.setValue('');

    this.profilForm = new FormGroup({
      nom: new FormControl(profil.nom ?? '', [Validators.required]),
      prenom: new FormControl(profil.prenom ?? '', [Validators.required]),
      email: new FormControl(profil.email ?? '', [Validators.required, Validators.email]),
      localisation: new FormControl(profil.localisation ?? '', [Validators.required]),
      codePostal: new FormControl(profil.codePostal ?? '', [Validators.required]),
      anneeExperience: new FormControl<number | null>(profil.anneeExperience ?? null, [
        Validators.required,
      ]),
    });
  }

  protected onSubmit(): void {
    if (this.profilForm.invalid) return;
    const idUtilisateur = this.userService.currentUser().id;
    if (!idUtilisateur) return;

    const payload: ProfilUtilisateur = {
      nom: this.profilForm.value.nom ?? undefined,
      prenom: this.profilForm.value.prenom ?? undefined,
      email: this.profilForm.value.email ?? undefined,
      localisation: this.profilForm.value.localisation ?? undefined,
      codePostal: this.profilForm.value.codePostal ?? undefined,
      anneeExperience: this.profilForm.value.anneeExperience ?? undefined,
      competences: this.competencesSelectionnees(),
    };

    this.profilService.modifierProfil(idUtilisateur, payload).subscribe((data) => {
      this.profilUtilisateur.set(data);
      this.closeSidenav();
      this.toasterService.showToast('Profil mis à jour avec succès !');
    });
  }

  /** Supprime une compétence de la sélection */
  remove(competence: Competence): void {
    this.competencesSelectionnees.update((competences) => {
      const index = competences.findIndex((c) =>
        competence.code ? c.code === competence.code : c.libelle === competence.libelle,
      );
      if (index < 0) return competences;
      const updated = [...competences];
      updated.splice(index, 1);
      this.announcer.announce(`Removed ${competence.libelle}`);
      return updated;
    });
  }

  /** Vide l'input sur saisie libre (l'ajout se fait uniquement via l'autocomplete) */
  add(event: MatChipInputEvent): void {
    event.chipInput!.clear();
    this.competencesSearchControl.setValue('');
  }

  /** Ajoute la compétence sélectionnée via l'autocomplete et réinitialise l'input */
  selected(event: MatAutocompleteSelectedEvent): void {
    const competence: Competence = event.option.value;
    this.competencesSelectionnees.update((competences) => [...competences, competence]);
    this.competencesSearchControl.setValue('');
  }

  protected affichageEnErreur() {
    return this.profilService.estServiceEnErreur();
  }
}
