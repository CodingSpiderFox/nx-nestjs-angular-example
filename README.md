# angular-nestjs-nx-example

A sample of a full-stack `monorepo` using `Nx` , `Nest.js` and `Angular` Project.

`Nx` と `Nest.js` と `Angular` を使ったフルスタックな `モノレポ` のサンプルプロジェクトです。

## Features

* Monorepo
    * [Nx](https://nx.dev/angular)
    * [TypeScript](https://www.typescriptlang.org/)
* Backend
    * [Nest.js](https://nestjs.com/) (With Nx)
    * [TypeORM](https://typeorm.io/)
    * [Passport](http://www.passportjs.org/)
    * [Handlebars](https://handlebarsjs.com/)
    * [GraphQL](https://graphql.org/)
* Frontend
    * [Angular](https://angular.io/) (With Nx)
    * [@ngrx/store](https://ngrx.io/guide/store)
    * [@ngrx/router-store](https://ngrx.io/guide/router-store)
    * [@ngrx/store-devtools](https://ngrx.io/guide/store-devtools)
    * [@ngrx/entity](https://ngrx.io/guide/entity)
    * [@ngrx/effect](https://ngrx.io/guide/effects)
    * [Apollo Client](https://www.apollographql.com/client/)
* Datastore
    * [Docker](https://www.docker.com/)
    * [MySQL](https://www.mysql.com/) (Data Store on Docker)
    * [Redis](https://redis.io/) (Session Store on Docker)
    * [RedisInsight](https://redislabs.com/redisinsight/)
* Others
    * [Postman](https://www.postman.com/)
    * [Swagger](https://swagger.io/)

## Project Structure

| Parent | Child       | Port | Type
|--------|-------------|------|--------------
| libs   |             |      | Shared 
|        | admin       | 3000 | Nest.js 
|        | restful-api | 3100 | Nest.js 
|        | graphql-api | 3200 | Nest.js 
|        | fromt       | 4200 | Angular 

## URL

### Application URL

| project | description            | method | url
|---------|------------------------|--------|----------------------------------------
| admin   | Top page               | GET    | http://localhost:4000/admin
|         | Encrypt page           | GET    | http://localhost:4000/admin/encrypt
|         | Encrypt result page    | POST   | http://localhost:4000/admin/encrypt
|         | User list page         | GET    | http://localhost:4000/admin/user
|         | User registration page | GET    | http://localhost:4000/admin/user/register
|         | User edit page         | GET    | http://localhost:4000/admin/user/edit/:id
|         | User management page   | GET    | http://localhost:4000/admin/user/delete/:id
| api     | Login                  | POST   | http://localhost:4200/login
|         | Fetch todos            | GET    | http://localhost:4200/todo
|         | Fetch todo             | GET    | http://localhost:4200/todo/:id
|         | Register todo          | POST   | http://localhost:4200/todo/:id
|         | Edit todo              | PUT    | http://localhost:4200/todo/:id
|         | Delete todo            | DELETE | http://localhost:4200/todo/:id
|         | Toggle todo status     | PATCH  | http://localhost:4200/todo/:id/toggle-status
| front   | Top                    | -      | http://localhost:4200/
|         | Login page             | -      | http://localhost:4200/login
|         | Logout link            | -      | http://localhost:4000/logout
|         | Todo list page         | -      | http://localhost:4000/restful/todo
|         | Todo registration page | -      | http://localhost:4200/restful/todo/register
|         | Todo edit page         | -      | http://localhost:4200/restful/todo/edit/:id
|         | Redux page             | -      | http://localhost:4200/redux

### Tool URL

 project     | description        | url
-------------|--------------------|-------------------------------
 graphql-api | GraphQL Playground | http://localhost:3200/graphql
 restful-api | Swagger UI         | http://localhost:3100/swagger/
 docker      | RedisInsight       | http://localhost:8001/

## Usage

### Start docker containers

```sh
./start-docker.sh
```

### Install node_modules

```sh
npm i
```

### Start applications

```sh
# Start restful-api only
npm run nx serve restful-api
# Start graphql-api only
npm run nx serve graphql-api
# Start admin only
npm run nx serve admin
# Start front only
npm run nx serve front
# Start all projects asynchronously
nx run-many --target=serve --all --parallel=true
# Start api and front projects asynchronously
nx run-many --target=serve --projects=restful-api,graphql-api,front --parallel=true
```

### Initial data registration

 username | password
----------|----------
 admin    | admin

```sql
truncate user;
insert into user(username, password) values
(
  'admin',
  '8937207e71f718226a121e02304c750e783b9a51d84aee2639e0b8c225d3df420fe421b4b4a416db7c01de53466691eee975d849afc10f2471dfd447016a81a8'
);
```

### Output dependencies graph

```sh
npm run dep-graph
```

### Build applications

```sh
npm run nx build restful-api -- --prod
npm run nx build graphql-api -- --prod
npm run nx build admin -- --prod
npm run nx build front -- --prod
```

### Test applications

```sh
npm run nx test front
npm run nx e2e front-e2e
```

## Setup postman

### Install Postman

https://www.postman.com/downloads/

### Import postman settings

1. Launch Postman.
1. Click `Import` button
1. Click `File` tab
1. Click `Upload Files` button -> Choose `postman-settings.json` -> Click `Import` button
1. Enjoy api !!
