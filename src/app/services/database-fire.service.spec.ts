import { TestBed } from '@angular/core/testing';

import { DatabaseFireService } from './database-fire.service';

describe('DatabaseFireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatabaseFireService = TestBed.get(DatabaseFireService);
    expect(service).toBeTruthy();
  });
});
