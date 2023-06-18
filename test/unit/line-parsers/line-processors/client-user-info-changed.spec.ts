import { expect } from 'chai';

import { GameRepository } from '../../../../src/repository/game-repository';
import { deepEqual, instance, mock, reset, verify, when } from 'ts-mockito';
import { ClientUserInfoChanged } from '../../../../src/line-parsers/line-processors/client-user-info-changed';
import { inputIsgalami } from './fixture/client-user-info-changed-input-line';

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
    describe('when add', () => {
      const input = inputIsgalami;

      before(async () => {
        reset(gameRepository);
        when(gameRepository.doesPlayerNotExist('2')).thenReturn(true);
        component.handle(input);
      });

      it('should call doesPlayerNotExist', async () => {
        verify(gameRepository.doesPlayerNotExist('2')).once();
      });

      it('should addNewPlayer', async () => {
        verify(gameRepository.addNewPlayer('2', deepEqual('Isgalamido'))).once();
      });
    });
  });
});
