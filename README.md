## Description
Backend de um sistema de listas feito em NestJS, para estudo. Com suporte a Docker.

# Docker support
Docker is now supported! To use it you need to manually build the image, first clone this repo, access the cloned folder, after that run:

docker build -t claulist .
And it's done! The image is built in your local docker repo. You can run using:

docker run -d --name teste claulist

## Installation

```bash
$ npm install
```

## Running the app

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

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

  Nest is [MIT licensed](LICENSE).
