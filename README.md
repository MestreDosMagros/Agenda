# Agenda

### Simple didatict project developed in Angular and .NET Core

### API Rest

- .NET version 3.1
- In order to run this project you have to install .NET Core 3.1 from: https://dotnet.microsoft.com/download/dotnet-core/3.1
- Open API project on windows powershell and run dotnet restore, dotnet run, the API now should be running on ports 5000, 5001

### Web App

- Angular major version 8
- In order to run this project you have to install nodejs from: https://nodejs.org/en/
- You will need also install Angular 8 or higher executing npm install -g @angular/cli on windows powershell
- Open the App folder and run npm install, ng build, ng serve, now the App should be runnin on port 4200

## Features

- JWT Authentication using ASP.NET Core Identity and Entity Framework Core using in memory database
- Angular lazy load routing
- Angular material components
- App state managed with IndexedDB using ngx-indexed-db for abstractions see: https://github.com/assuncaocharles/ngx-indexed-db#readme
