import { TestBed } from '@angular/core/testing';

import { StorageTimerService } from './storage-timer.service';

describe('StorageTimerService', () => {
  let service: StorageTimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageTimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
