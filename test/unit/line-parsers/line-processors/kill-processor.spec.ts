import { expect } from 'chai';

import { GameRepository } from '../../../../src/repository/game-repository';
import { instance, mock, reset, verify, when } from 'ts-mockito';
import { newPlayerStats } from './fixture/new-player-stats-fixture';
import { KillProcessor } from '../../../../src/line-parsers/line-processors/kill-processor';
import {
  inputMakeOnePoint,
  inputSelfDestruction,
  inputWorldKills,
} from './fixture/kill-processor-input-line';

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
    describe('when the user self destruct', () => {
      const input = inputSelfDestruction;
      const playerStats = newPlayerStats({
        playerNames: { '2': 'Isgalamido' },
        kills: { Isgalamido: 0 },
      });

      before(async () => {
        reset(gameRepository);
        when(gameRepository.getPlayerStats()).thenReturn(playerStats);
        component.processLine(input);
      });

      it('should call getPlayerStats', async () => {
        verify(gameRepository.getPlayerStats()).called();
      });

      it('should change the playerStats', async () => {
        expect(playerStats).to.be.eql({
          total_kills: 1,
          players: [],
          playerNames: {
            '2': 'Isgalamido',
          },
          kills: {
            Isgalamido: -1,
          },
          kills_by_means: {
            MOD_ROCKET_SPLASH: 1,
          },
        });
      });
    });

    describe('when the world kills', () => {
      const input = inputWorldKills;
      const playerStats = newPlayerStats({
        playerNames: { '2': 'Isgalamido' },
        kills: { Isgalamido: 0 },
      });

      before(async () => {
        reset(gameRepository);
        when(gameRepository.getPlayerStats()).thenReturn(playerStats);
        component.processLine(input);
      });

      it('should call getPlayerStats', async () => {
        verify(gameRepository.getPlayerStats()).called();
      });

      it('should change the playerStats', async () => {
        expect(playerStats).to.be.eql({
          total_kills: 1,
          players: [],
          playerNames: {
            '2': 'Isgalamido',
          },
          kills: {
            Isgalamido: -1,
          },
          kills_by_means: {
            MOD_TRIGGER_HURT: 1,
          },
        });
      });
    });

    describe('when the user make point', () => {
      const input = inputMakeOnePoint;
      const playerStats = newPlayerStats({
        playerNames: { '3': 'Isgalamido' },
        kills: { Isgalamido: 0 },
      });

      before(async () => {
        reset(gameRepository);
        when(gameRepository.getPlayerStats()).thenReturn(playerStats);
        component.processLine(input);
      });

      it('should call getPlayerStats', async () => {
        verify(gameRepository.getPlayerStats()).called();
      });

      it('should change the playerStats', async () => {
        expect(playerStats).to.be.eql({
          total_kills: 1,
          players: [],
          playerNames: {
            '3': 'Isgalamido',
          },
          kills: {
            Isgalamido: 1,
          },
          kills_by_means: {
            MOD_RAILGUN: 1,
          },
        });
      });
    });
  });
});
