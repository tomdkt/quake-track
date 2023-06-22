# QuakeTrack: Logfile Parsing for Enhanced Gaming Insights

QuakeTrack is a project aimed at parsing Quake log files to provide enhanced gaming insights and analytics. It allows users to extract valuable information from Quake game log files and analyze various aspects of gameplay, such as player statistics, weapon usage, match events, and more. This README provides an overview of the project, its features, and instructions for getting started.

## Running the app
1. Command to install: `npm i`
2. Start app: `npm run start -- ./src/assets/qgames.log :tada:`

## output
```json
{
  "total_kills": 29,
  "kills":
  {
    "Fasano Again": 8,
    "Isgalamido": 3,
    "Zeh": 7,
    "Dono da Bola": 2,
    "UnnamedPlayer": 0,
    "Assasinu Credi": 1
  },
  "kills_by_means":
  {
    "MOD_ROCKET": 5,
    "MOD_RAILGUN": 2,
    "MOD_SHOTGUN": 4,
    "MOD_ROCKET_SPLASH": 13,
    "MOD_TRIGGER_HURT": 3,
    "MOD_FALLING": 1,
    "MOD_MACHINEGUN": 1
  }
}
```

### Codebase Architecture Overview?
 ```mermaid
classDiagram
  class Main {
  }
  class parseLogController {
  }
  interface Reader 
  class FileReader {
  }
  class LineProcessorManager {
  }
  interface LineProcessor 
  class gameRepository {
  }
  Main --> parseLogController

  parseLogController *-- FileReader
  parseLogController *-- LineProcessorManager

  FileReader ..|> Reader

  LineProcessorManager *-- InitGame
  LineProcessorManager *-- KillProcessor
  LineProcessorManager *-- ClientUserInfoChanged
  
  class KillProcessor {
  }
  KillProcessor ..|> LineProcessor
  KillProcessor --> gameRepository

  class InitGame {
  }
  InitGame ..|> LineProcessor
  InitGame --> gameRepository

  class ClientUserInfoChanged {
  }
  ClientUserInfoChanged ..|> LineProcessor
  ClientUserInfoChanged --> gameRepository

```


## Testing

```bash
npm run test
```

## Linting

```bash
npm run lint
```
