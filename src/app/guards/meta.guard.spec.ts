import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { metaGuard } from './meta.guard';

describe('metaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => metaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
