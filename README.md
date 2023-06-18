# QuakeTrack: Logfile Parsing for Enhanced Gaming Insights

QuakeTrack is a project aimed at parsing Quake log files to provide enhanced gaming insights and analytics. It allows users to extract valuable information from Quake game log files and analyze various aspects of gameplay, such as player statistics, weapon usage, match events, and more. This README provides an overview of the project, its features, and instructions for getting started.

## Running the app
1. Command to install: `npm i`
2. Start app: `npm run start -- ./src/assets/qgames.log :tada:`

### How it works?
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
