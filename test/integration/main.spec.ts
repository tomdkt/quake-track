import { expect } from 'chai';
import {
  expectedFileWithOneGameAnotherRound,
  expectedTheFileContainsOneGame,
  expectedTheFileContainsTwoGames,
  expectedOnFullFileProcessing,
  expectedOnUserSelfDestruct,
  expectedWhenUserNameIsChanged,
} from './fixture/expected-data';
import { GameStats } from '../../src/interfaces/game-stats';
import { Main } from '../../src/main';

describe('Main', () => {
  const baseFolder = 'src/assets';
  let app: Main;

  before(() => {
    app = new Main();
  });

  describe('when the app is started', () => {
    it('should be defined and ok', () => {
      expect(app).to.be.ok;
    });
  });

  describe('when parse log file', () => {
    const shouldExpectSpecificValues = 'should expect specific values';

    describe('when process the whole file', () => {
      const inputFile = 'qgames.log';
      const fullPath = `${baseFolder}/${inputFile}`;
      let output: GameStats;

      before(async () => {
        output = await app.run(fullPath);
      });

      it(shouldExpectSpecificValues, async () => {
        expect(output).to.be.eql(expectedOnFullFileProcessing);
      });
    });

    describe('when the user self destruct', () => {
      const inputFile = 'user-self-destruct.log';
      const fullPath = `${baseFolder}/${inputFile}`;
      let output: GameStats;

      before(async () => {
        output = await app.run(fullPath);
      });

      it(shouldExpectSpecificValues, async () => {
        expect(output).to.be.eql(expectedOnUserSelfDestruct);
      });
    });

    describe('when the user name is changed', () => {
      const inputFile = 'user-name-changed.log';
      const fullPath = `${baseFolder}/${inputFile}`;
      let output: GameStats;

      before(async () => {
        output = await app.run(fullPath);
      });

      it(shouldExpectSpecificValues, async () => {
        expect(output).to.be.eql(expectedWhenUserNameIsChanged);
      });
    });

    describe('when the file contains one game', () => {
      describe('one round', () => {
        const inputFile = 'one-game-one-round.log';
        const fullPath = `${baseFolder}/${inputFile}`;
        let output: GameStats;

        before(async () => {
          output = await app.run(fullPath);
        });

        it(shouldExpectSpecificValues, async () => {
          expect(output).to.be.eql(expectedTheFileContainsOneGame);
        });
      });

      describe('another round', () => {
        const inputFile = 'one-game-another-round.log';
        const fullPath = `${baseFolder}/${inputFile}`;
        let output: GameStats;

        before(async () => {
          output = await app.run(fullPath);
        });

        it(shouldExpectSpecificValues, async () => {
          expect(output).to.be.eql(expectedFileWithOneGameAnotherRound);
        });
      });
    });

    describe('when the file contains two games', () => {
      const inputFile = 'two-games-on-same-file.log';
      const fullPath = `${baseFolder}/${inputFile}`;
      let output: GameStats;

      before(async () => {
        output = await app.run(fullPath);
      });

      it(shouldExpectSpecificValues, async () => {
        expect(output).to.be.eql(expectedTheFileContainsTwoGames);
      });
    });
  });
});
