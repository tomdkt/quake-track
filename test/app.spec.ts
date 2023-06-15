import { expect } from 'chai';
import { App } from '../src/app';

describe('AppModule', () => {
  let app: App;

  before(() => {
    app = new App();
  });

  describe('when the module is started', () => {
    it('should be defined and ok', () => {
      expect(app).to.be.ok;
    });
  });

  describe('When the foo is called', () => {
    const input = 'some foo value';
    let output: string;
    before(() => {
      output = app.foo(input);
    });

    it('should return expected value', async () => {
      expect(output).to.be.eql(input);
    });
  });
});
