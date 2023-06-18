import { expect } from 'chai';

import { GameRepository } from '../../../../src/repository/game-repository';
import { instance, mock, reset, verify } from 'ts-mockito';
import { KillProcessor } from '../../../../src/line-parsers/line-processors/kill-processor';
import {
  inputMakeOnePoint,
  inputSelfDestruction,
  inputWorldKills,
} from './fixture/kill-processor-input-line';
import { DeathCauses } from '../../../../src/interfaces/death-causes';

describe('KillProcessor', () => {
  let component: KillProcessor;
  let gameRepository: GameRepository;

  before(() => {
    gameRepository = mock(GameRepository);

    component = new KillProcessor(instance(gameRepository));
  });

  describe('when the component is started', () => {
    it('should be defined and ok', () => {
      expect(component).to.be.ok;
    });
  });

  describe('when process line', () => {
    describe('when the user make point', () => {
      const input = inputMakeOnePoint;

      before(async () => {
        reset(gameRepository);
        component.handle(input);
      });

      it('should call incrementPoints', async () => {
        verify(gameRepository.incrementPoints('3')).once();
      });
      it('should call incrementTotalKills', async () => {
        verify(gameRepository.incrementTotalKills()).once();
      });
      it('should call incrementKillsByMean', async () => {
        verify(gameRepository.incrementKillsByMean(String(DeathCauses.MOD_RAILGUN))).once();
      });
    });

    describe('when the user self destruct', () => {
      const input = inputSelfDestruction;

      before(async () => {
        reset(gameRepository);
        component.handle(input);
      });

      it('should call reducePoints', async () => {
        verify(gameRepository.reducePoints('2')).once();
      });
    });

    describe('when the world kills', () => {
      const input = inputWorldKills;

      before(async () => {
        reset(gameRepository);
        component.handle(input);
      });

      it('should call reducePoints', async () => {
        verify(gameRepository.reducePoints('2')).once();
      });
    });
  });
});
