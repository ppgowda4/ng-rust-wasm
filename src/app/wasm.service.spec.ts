import { TestBed, inject } from '@angular/core/testing';

import { WasmService } from './wasm.service';

describe('WasmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WasmService]
    });
  });

  it('should be created', inject([WasmService], (service: WasmService) => {
    expect(service).toBeTruthy();
  }));
});
