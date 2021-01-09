import { TestBed } from '@angular/core/testing';

import { CustomerInterceptor } from './customer.interceptor';

describe('CustomerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CustomerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CustomerInterceptor = TestBed.inject(CustomerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
