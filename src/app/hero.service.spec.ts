import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';

describe('HeroService', () => {
  let mockMessageServie;
  let httpTestingController: HttpTestingController;
  let service: HeroService;

  beforeEach(() => {
    mockMessageServie = jasmine.createSpyObj(['add']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageServie },
      ],
    });

    // get instance of a service inside testing module - can also inject on the it instead (see below in comments)
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HeroService);
  });

  describe('getHero', () => {
    // it('should call get with the correct URL', inject(
    //   [HeroService, HttpTestingController],
    //   (service: HeroService, controller: HttpTestingController) => {
    //     service.getHero(4).subscribe();
    //   }
    // ));

    it('should call get with the correct URL', () => {
      const testResponse: Hero = {
        id: 4,
        name: 'SuperDude',
        strength: 100,
      };

      service.getHero(4).subscribe((val) => {
        expect(val).toEqual(testResponse);
      });

      // will fail if request doesn't equal 1 time.
      const req = httpTestingController.expectOne('api/heroes/4');

      // send testdata back.
      req.flush(testResponse);

      /* verify we get the exact url and at the specified number of times.
      without this 2 requests, one to a different url wouldn't cause the test to fail
      */
      httpTestingController.verify();
    });
  });
});
