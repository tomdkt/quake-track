import { expect } from 'chai';

import { InitGame } from '../../../../src/line-parsers/line-processors/init-game';
import { GameRepository } from '../../../../src/repository/game-repository';
import { instance, mock, verify } from 'ts-mockito';

describe('InitGame', () => {
  let initGame: InitGame;
  let gameRepository: GameRepository;

  before(() => {
    gameRepository = mock(GameRepository);

    initGame = new InitGame(instance(gameRepository));
  });

  describe('when the initGame is started', () => {
    it('should be defined and ok', () => {
      expect(initGame).to.be.ok;
    });
  });

  describe('when process line', () => {
    const input = 'qgames.log';

    before(async () => {
      initGame.processLine(input);
    });

    it('should call init game on repository', async () => {
      verify(gameRepository.initNewGame()).once();
    });
  });
});
