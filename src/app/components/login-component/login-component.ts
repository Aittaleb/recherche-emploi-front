import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { CompetencesService } from '../../services/competences.service';

@Component({
  selector: 'ngm-dev-block-login-email-password',
  templateUrl: './login-component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatCard,
    MatCardContent,
    MatCardActions,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    NgOptimizedImage,
  ],
})
export class LoginComponent {
  private readonly router = inject(Router);
  private readonly loginService = inject(LoginService);
  private readonly userService = inject(UserService);
  private readonly competenceService = inject(CompetencesService);
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  onSubmit() {
    if (this.form.valid) {
      this.loginService.setLogged(true);
      this.router.navigate(['/app/dashboard']).then(() => {
        // profil par défaut pour l'instant, à remplacer par le profil de l'utilisateur connecté
        this.userService.setUser({
          id: 1,
          nom: 'AIT TALEB',
          prenom: 'Abdelhamid',
        });
        this.competenceService.getCompetences().subscribe((competences) => {
          console.log('Compétences ROME chargées :');
        });
      });
    }
  }
}
