import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ServiceEnErreurStore } from './service-en-erreur.store';
import { inject } from '@angular/core';

export class AppInterceptor implements HttpInterceptor {
  private readonly serviceEnErreurStore = inject(ServiceEnErreurStore);
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const serviceName = req.params.get('serviceName');
    return next.handle(req).pipe(
      catchError((error, caught) => {
        if (serviceName) {
          console.log('ajouter servicename au services en erreurs:', serviceName);
          this.serviceEnErreurStore.ajouterServiceEnErreur(serviceName);
        }
        return throwError(() => error);
      }),
    );
  }
}
