## Creacion del proyecto con nest

    nest new tarea01

# Para poder formatear el proyecto con linter y pretier
```bash
$ npm run lint
```
    [^nota]: Ejecuta el linter para corregir el formato el codigo
```bash
$ npm run format
```
    [^nota]: Ejecuta pretier para identar de forma correcta el codigo


# Instalacion de TypeORM y dependencias para conexion con PostgreSQL
```bash
$ bun install @nestjs/typeorm typeorm pg
```
# Instalacion de dotenv para definir variables de entorno
```bash
$ bun install @nestjs/config
```
# Instalacion de herramientas para realizar validaciones
```bash
$ bun install class-validator class-transformer @nestjs/mapped-types
```
# creacion del modulo de autores en nestjs
```bash
$ nest g resource authors
```
# creacion del modulo de books en nestjs
```bash
$ nest g resource books
```
# SCRIPT de creacion de la base de datos library con las tablas para authors y books
```bash
CREATE DATABASE librarydb OWNER postgres
```
# *Authors*
- id: author ID (identificador único del autor)
- name: full name (nombre completo)
- nationality: nationality (nacionalidad)
- birth_date: birth date (fecha de nacimiento)
- created_at: created at (fecha de creación)
- updated_at: updated at (fecha de actualización) 
# *Books*
- id: book ID (identificador único del libro)
- title: title (título)
- isbn: ISBN (número ISBN)
- publisher: publisher (editorial)
- publication_year: publication year (año de publicación)
- genre: genre (género literario)
- author_id: author ID (identificador del autor, clave foránea)



## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).


## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
