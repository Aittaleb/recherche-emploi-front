import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { RechercheOffre } from './recherche-offre';

describe('RechercheOffre', () => {
  let component: RechercheOffre;
  let fixture: ComponentFixture<RechercheOffre>;

  const routerMock = {
    navigate: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [RechercheOffre],
      providers: [{ provide: Router, useValue: routerMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(RechercheOffre);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('rechercherParMotCle doit naviguer avec query param', () => {
    component.rechercherParMotCle('developpeur');

    expect(routerMock.navigate).toHaveBeenCalledWith(['/app/tableau-des-offres'], {
      queryParams: { query: 'developpeur' },
    });
  });

  it('onKeydown doit lancer la recherche sur Enter', () => {
    component['query'] = 'java';
    const spy = vi.spyOn(component, 'rechercherParMotCle');

    component.onKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(spy).toHaveBeenCalledWith('java');
  });

  it('onKeydown ne doit rien faire pour une autre touche', () => {
    const spy = vi.spyOn(component, 'rechercherParMotCle');

    component.onKeydown(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(spy).not.toHaveBeenCalled();
  });
});
