import { Main } from './main';

const main = new Main();
void main.runFromEnv().then(console.log).catch(console.log);
