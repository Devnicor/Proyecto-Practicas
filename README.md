trip-trackig-api

## Before adding the first line of code

1. Search the entire project for the following string "[repository name]" and change it to the actual repository name. 
2. Change name and description values of package.json file 
3. Change principal title to README file (#NestJs Scaffold) to the repository name
4. Create .env file and use the environment variables that are in the .env.example file
5. Configure and change api keys values to API_KEY_1 and API_KEY_2
6. Configure and change mongo db string connection or remove environment variable to Dockerfile and ci-cd.yml workflow

## Database configuration

1. Please change provider value in datasource configuration to ./prisma/schema.prisma file
```prisma
// provider values available: mongodb, postgresql
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}
```

2. Leave only uncomment database service in docker-compose.yml file
```yaml
#  db:
#    image: mongo:latest
#    ...

  db:
    image: postgres:13.5
```

3. Use dabase connecton in .env file depending the service configuration in docker-compose.yml file
```dotenv
# MongoDB service connection
DATABASE_URL="mongodb://localhost:27017/nestjsScaffold"
# Postgres service connection
#DATABASE_URL="postgres://MiAguila:tR4#$p0rT3@localhost:5432/nestjsScaffold"
```

### Execute migrations
1. You can uncomment model example in schema.prisma file and run:
```shell
npx prisma db push
```


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

Use yarn as principal package manager. [more](https://yarnpkg.com/getting-started)

```bash
$ yarn
```

## Running the app

### With Docker Compose
[more](https://docs.docker.com/engine/reference/commandline/compose_up/)
```bash
$ docker-compose up --build
```

### Common
[more](https://docs.nestjs.com/first-steps)
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Swagger Documentation

Please open file ./src/main.ts and change parameters values to:
```
const options = new DocumentBuilder()
  .setTitle('')
  .setDescription('')
  .setVersion('1.0.0')
  .build();
```
To improve documentation, use tags and decorators in the controllers:
* [operations](https://docs.nestjs.com/openapi/operations)
* [decorators](https://docs.nestjs.com/openapi/decorators)


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).
