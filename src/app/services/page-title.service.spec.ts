import { TestBed } from '@angular/core/testing';
import { PageTitleService } from './page-title.service';

describe('PageTitleService', () => {
  let service: PageTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageTitleService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('doit initialiser le titre a Dashboard', () => {
    expect(service.pageTitle()).toBe('Dashboard');
  });

  it('setPageTitle doit mettre a jour le signal pageTitle', () => {
    service.setPageTitle('Mes Offres');
    expect(service.pageTitle()).toBe('Mes Offres');
  });
});
