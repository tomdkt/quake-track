import { expect } from 'chai';

import { InitGame } from '../../../../src/line-parsers/line-processors/init-game';
import { GameRepository } from '../../../../src/repository/game-repository';
import { instance, mock, verify } from 'ts-mockito';

describe('InitGame', () => {
  let component: InitGame;
  let gameRepository: GameRepository;

  before(() => {
    gameRepository = mock(GameRepository);

    component = new InitGame(instance(gameRepository));
  });

  describe('when the component is started', () => {
    it('should be defined and ok', () => {
      expect(component).to.be.ok;
    });
  });

  describe('when process line', () => {
    const input = 'some-input-line';

    before(async () => {
      component.processLine(input);
    });

    it('should call init game on repository', async () => {
      verify(gameRepository.initNewGame()).once();
    });
  });
});
