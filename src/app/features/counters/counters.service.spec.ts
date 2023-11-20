import {TestBed} from '@angular/core/testing';

import {CountersService} from './counters.service';

describe('CountersService', () => {
    let service: CountersService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CountersService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
