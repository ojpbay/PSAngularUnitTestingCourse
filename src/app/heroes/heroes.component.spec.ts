import { of } from 'rxjs/internal/observable/of';
import { Hero } from '../hero';
import { HeroesComponent } from './heroes.component';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let HEROES: Array<Hero>;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'SpiderDude', strength: 8 },
      { id: 2, name: 'Wonderful Woman', strength: 24 },
      { id: 3, name: 'SuperDude', strength: 55 },
    ];

    mockHeroService = jasmine.createSpyObj([
      'getHeroes',
      'addHero',
      'deleteHero',
    ]);

    component = new HeroesComponent(mockHeroService);
  });

  describe('delete', () => {
    it('should remove the indicated hero from the heroes list', () => {
      // return simplest observable as heroeService doesn't care what is in the observable
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      component.delete(HEROES[2]);

      const deletedHero = component.heroes.find(
        (h) => h.name === HEROES[2].name
      );
      expect(component.heroes.length).toBe(2);
      expect(deletedHero).toBeUndefined();
    });

    it('should call deleteHero with correct value', () => {
      // return simplest observable as heroeService doesn't care what is in the observable
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      component.delete(HEROES[2]);

      expect(mockHeroService.deleteHero).toHaveBeenCalledOnceWith(HEROES[2]);
    });
  });
});
