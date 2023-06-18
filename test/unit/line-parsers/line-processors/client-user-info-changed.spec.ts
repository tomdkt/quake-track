import { expect } from 'chai';

import { GameRepository } from '../../../../src/repository/game-repository';
import { instance, mock, reset, verify, when } from 'ts-mockito';
import { ClientUserInfoChanged } from '../../../../src/line-parsers/line-processors/client-user-info-changed';
import { inputDonoDaBola, inputIsgalami } from './fixture/client-user-info-changed-input-line';
import { newPlayerStats } from './fixture/new-player-stats-fixture';

describe('ClientUserInfoChanged', () => {
  let component: ClientUserInfoChanged;
  let gameRepository: GameRepository;

  before(() => {
    gameRepository = mock(GameRepository);

    component = new ClientUserInfoChanged(instance(gameRepository));
  });

  describe('when the component is started', () => {
    it('should be defined and ok', () => {
      expect(component).to.be.ok;
    });
  });

  describe('when process line', () => {
    describe('when is Isgalamido', () => {
      const input = inputIsgalami;
      const playerStats = newPlayerStats();

      before(async () => {
        reset(gameRepository);
        when(gameRepository.getPlayerStats()).thenReturn(playerStats);
        component.processLine(input);
      });

      it('should call getPlayerStats', async () => {
        verify(gameRepository.getPlayerStats()).times(4);
      });

      it('should change the playerStats', async () => {
        expect(playerStats).to.be.eql({
          total_kills: 0,
          players: ['Isgalamido'],
          playerNames: {
            '2': 'Isgalamido',
          },
          kills: {
            Isgalamido: 0,
          },
          kills_by_means: {},
        });
      });
    });

    describe('when is "Dono da Bola"', () => {
      const input = inputDonoDaBola;
      const playerStats = newPlayerStats();

      before(async () => {
        reset(gameRepository);
        when(gameRepository.getPlayerStats()).thenReturn(playerStats);
        component.processLine(input);
      });

      it('should call getPlayerStats', async () => {
        verify(gameRepository.getPlayerStats()).times(4);
      });

      it('should change the playerStats', async () => {
        expect(playerStats).to.be.eql({
          total_kills: 0,
          players: ['Dono da Bola'],
          playerNames: {
            '3': 'Dono da Bola',
          },
          kills: {
            'Dono da Bola': 0,
          },
          kills_by_means: {},
        });
      });
    });
  });
});
