import { expect } from 'chai';
import { DeathCausesArray, GameStats, ParseLogController } from '../src/app';

describe('AppModule', () => {
  let app: ParseLogController;

  before(() => {
    app = new ParseLogController();
  });

  describe('when the module is started', () => {
    it('should be defined and ok', () => {
      expect(app).to.be.ok;
    });
  });

  describe('when the user kill himself', () => {
    const inputFile = 'src/assets/kill-himself.log';
    let output: GameStats;

    before(async () => {
      output = await app.parseLogFile(inputFile);
    });

    it('should expect some values', async () => {
      expect(output).to.be.eql({
        game_1: {
          total_kills: 3,
          players: ['Isgalamido'],
          playerNames: {
            '2': 'Isgalamido',
          },
          kills: {
            Isgalamido: -3,
          },
          kills_by_means: {
            MOD_ROCKET_SPLASH: 2,
            MOD_TRIGGER_HURT: 1,
          },
        },
      });
    });
  });

  describe('When meansOfDeathBase', () => {
    it('should be MOD_TRIGGER_HURT when 22', async () => {
      expect(DeathCausesArray[22]).to.be.eql('MOD_TRIGGER_HURT');
    });

    it('should be MOD_RAILGUN when 10', async () => {
      expect(DeathCausesArray[10]).to.be.eql('MOD_RAILGUN');
    });

    it('should be MOD_ROCKET when 6', async () => {
      expect(DeathCausesArray[6]).to.be.eql('MOD_ROCKET');
    });
  });
});
