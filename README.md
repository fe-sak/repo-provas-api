# repo-provas-api
This is a private REST API for the webpage [repo-provas](https://github.com/fe-sak/repo-provas).
The application manages school tests, where users can create a test by providing a PDF url link.

## Table of contents
<!--ts-->
   * [Features](#features)
   * [Endpoints](#endpoints)
   * [Database](#database)
   * [Technologies](#technologies)
   * [Prerequisites](#prerequisites)
   * [Setup](#setup)
   * [Tests](#tests)
   
<!--te-->

## Features
[(Return to table of contents)](#table-of-contents)

:green_circle: User authentication \
:green_circle: Retrieve all categories \
:green_circle: Retrieve all disciplines \
:green_circle: Retrieve all teachers \
:green_circle: Retrieve all tests \
:green_circle: Create a test \
:green_circle: Increment test views \
:white_circle: Upload a PDF file \
:white_circle: Create a category \
:white_circle: Create a discipline \
:white_circle: Create a teacher

Each test must have a teacher and be part of a category and a discipline.



## Endpoints

[(Return to table of contents)](#table-of-contents)

| Method /route       | expected body                                                                             | response          | Info                          |
|---------------------|-------------------------------------------------------------------------------------------|-------------------|-------------------------------|
| POST /signup        | {   name: string,   email: string,   password: string  }                                  | Ok                | Register a user               |
| POST /login         | {   email: string,   password: string  }                                                  | jwt token         | Log in a user                 |
| GET /categories     |                                                                                           | Categories array  | Retrieve all categories       |
| GET /disciplines    |                                                                                           | Disciplines array | Retrieve all disciplines      |
| GET /teachers       |                                                                                           | Teachers array    | Retrieve all reachers         |
| GET /tests          |                                                                                           | Tests array       | Retrieve all tests            |
| POST /tests         | {   name: string,   pdfUrl:string,   categoryId: number,   disciplineTeacherId: number }  | Ok                | Create a test                 |
| POST /tests/:testId |                                                                                           | Ok                | Increment a test's view count |

## Database 

[(Return to table of contents)](#table-of-contents)

The database diagram: 

![drawSQL-export-2022-06-27_01 05](https://user-images.githubusercontent.com/92526601/175858045-e5b174a2-6e67-45b9-b187-20c7457c545a.png)

Entities explained:
- users: used for authentication. Only authenticated users can create a test
- terms: school terms (e.g.: first quarter, second bimester, et cetera) 
- disciplines: disciplines lectured by a teacher (e.g.: JavaScript, SQL, React, et  cetera)
- teachers: teachers who give tests. (e.g: John, Mateus de Nardo, Iago, et cetera)
- disciplinesTeachers: relationship many-to-many between teachers and disciplines. This means that each teacher may lecture more than on discipline, and vice versa
- categories: categories a test might be a part of (e.g.: P1 means first test of the term, P2 means second test of the term, and so forth)
- tests: tests given by a teacher. Each is part of a discipline's class, has a category and is given by a teacher

## Technologies

[(Return to table of contents)](#table-of-contents)

![TypeScript](https://img.shields.io/badge/-TypeScript-black?style=flat&logo=typescript) 
![npm](https://img.shields.io/badge/-npm-black?style=flat&logo=npm) 
![Node.js](https://img.shields.io/badge/-Node.js-black?style=flat&logo=node.js) 
![Nodemon](https://img.shields.io/badge/-Nodemon-black?style=flat&logo=nodemon)
![Express](https://img.shields.io/badge/-Express-black?style=flat&logo=express) \
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-black?style=flat&logo=postgresql)
![Prisma](https://img.shields.io/badge/-Prisma-black?style=flat&logo=prisma) \
![ESLint](https://img.shields.io/badge/-ESLint-black?style=flat&logo=eslint&logoColor=3e2c9a)
![Prettier](https://img.shields.io/badge/-Prettier-black?style=flat&logo=prettier) \
![Jest](https://img.shields.io/badge/-Jest-black?style=flat&logo=jest&logoColor=C53C14)

The rest of the libs are in the [package.json](https://github.com/fe-sak/repo-provas-api/blob/main/package.json) file inside the dependencies and devDependencies keys.

## Prerequisites

[(Return to table of contents)](#table-of-contents)

- Bash Shell or any kind of shell for running commands in your terminal (all commands seen in this document are run inside a shell). If you're using Linux, it is installed by default. If you're using Windows, I suggest you follow this [guide](https://itsfoss.com/install-bash-on-windows/)
- [Git](https://git-scm.com) installed for cloning the project and managing source code changes. You must also configure your git tool for connecting to GitHub using ssh. [The official GitHub guides](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- Nodejs installed. It is recommended to use a version manager, such as [nvm](https://github.com/nvm-sh/nvm)
- PostgreSQL for database service. Find your OS distribution and follow the [guides](https://www.postgresql.org/download/)
- A IDE for coding. The most popular one is [VS Code](https://code.visualstudio.com/)

## Setup

[(Return to table of contents)](#table-of-contents)

Setup the development environment.
```
# Clone project: 
$ git clone git@github.com:fe-sak/repo-provas-api.git

# Access the downloaded folder:
$ cd repo-provas-api
```

Before running the application, it is needed to configure the environment variables. 
Inside the root of the downloaded folder ( /repo-provas-api) there is a .env.example file, and it's contents:
```
DATABASE_URL=postgres://postgres:123456@localhost:5432/repo-provas
PORT=5000
JWT_SECRET=SECRET
```
There are three variables:
- DATABASE_URL: this is a connection string used by the nodejs application to connect to the PostgreSQL server. It's anatomy is as follows: 
```
postgres://<POSTGRES_USERNAME>:<POSTGRES_PASSWORD><@<POSTGRES_HOST>:<POSTGRES_PORT>/<POSTGRES_DATABASE>
```
POSTGRES_USERNAME and POSTGRES_PASSWORD may be created by you when installing PostgreSQL. But, by default, there is already a user created by the PosgreSQL CLI, "postgres" with password "123456".  \
POSTGRES_HOST can be any IP or DNS address. But since we are running the PostgreSQL service inside our machine, that means the host is our own machine, and "localhost" is how we tell our machine to connect to itself. \
POSTGRES_PORT is the port where the PostgreSQL service is running. By default, the service runs at port 5432. \
POSTGRES_DATABASE is the name of the database inside the PostgreSQL service. You may choose any name. \
- PORT: port where the nodejs application runs (this is not the same port the PostgreSQL service runs). You can change it to any other port available in your machine.
- JWT_SECRET: used for jsonwebtoken library for cryptography and authentication. It can be any string you'd like. But, beware of changing it after a user've been created, for the authentication will fail. \

To proceed, it is needed to create a .env file. For that, you may copy the .env.example content to the .env file and tweak the environment variables to meet your needs. \

Setup Prisma ORM. ( Prisma is a [Object Relational Mapper](https://stackoverflow.com/questions/1279613/what-is-an-orm-how-does-it-work-and-how-should-i-use-one)):
```
# Create the development database:
$ npx prisma migrate dev

# Populate the database:
$ npx prisma db seed
```
This command uses a file seed. You can find it in [/prisma/seed.ts](https://github.com/fe-sak/repo-provas-api/blob/main/prisma/seed.ts). Tweak it if needed.

Start the development environment running:
```
$ npm run dev
```
If everything is ok, you'll probably see this in your terminal:
```
➜  repo-provas-api git:(main) ✗ npm run dev

> repo-provas-api@1.0.0 dev
> fuser -k 5000/tcp ; nodemon --ignore 'tests/*' src/server.ts

[nodemon] 2.0.15
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: ts,json
[nodemon] starting `ts-node src/server.ts`
Listening on 5000...
```
Awesome! The application is running locally. You can access it using the url:
```
http://localhost:<PORT>/
```

Give it a try, send a http request with method GET to route /health. (url: http://localhost:5000/health). It should return http response status 200.
Observation: to send a http request, you need a REST API client. There are VS Code extensions, desktop applications and web applications.
Suggestions:
- VS Code application: [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)
- Desktop application: [Insonmina](https://insomnia.rest/)
- A web application: [postman](https://www.postman.com/)

## Tests

[(Return to table of contents)](#table-of-contents)

First, setup the environment variables, creating a .env.test file:
```
DATABASE_URL=postgres://postgres:123456@localhost:5432/repo-provas_test
JWT_SECRET=SECRET
```
Notice the only difference between .env.test and .env is the database name. I suggest adding "\_test" at the end, but you may choose any name, as long as it is not the same as the development database name.

```
# Create the test database:
$ npm run create-test-db

# Run tests:
$ npm run test
```

You chould see something like this:
```
➜  repo-provas-api git:(tests) ✗ npm run test          

> repo-provas-api@1.0.0 test
> npx dotenv -e .env.test prisma migrate dev && NODE_OPTIONS=--experimental-vm-modules dotenv -e .env.test jest

Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "repo-provas_tests", schema "public" at "localhost:5432"

Already in sync, no schema change or pending migration was found.

✔ Generated Prisma Client (3.12.0 | library) to ./node_modules/@prisma/client in 395ms


(node:52658) ExperimentalWarning: VM Modules is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
 PASS  tests/index.test.ts (48.45 s)
  POST /login
    ✓ should answer with status code 200 when given valid credentials (1764 ms)
    ✓ should answer with status code 401 when given unregistered email (178 ms)
    ✓ should answer with status code 401 when given wrong password (434 ms)
  POST /signup
    ✓ should answer with status code 201 when given valid signup (209 ms)
    ✓ should answer with status code 409 when given an already registered email (148 ms)
    ✓ should answer with status code 422 when given an empty signup (80 ms)
    ✓ should answer with status code 422 when given an invalid email (24 ms)
  GET /categories
    ✓ should return status code 200 if given valid token (283 ms)
    ✓ should return status code 401 if given invalid token (29 ms)
  GET /disciplines
    ✓ should return status code 200 if given valid token (264 ms)
    ✓ should return status code 401 if given invalid token (29 ms)
  GET /teachers
    ✓ should return status code 200 if given valid token (262 ms)
    ✓ should return status code 401 if given invalid token (49 ms)
  GET /tests
    ✓ should return status code 200 if given valid token (280 ms)
    ✓ should return status code 401 if given invalid token (26 ms)
  GET /tests?byTeachers=true
    ✓ should return status code 200 if given valid token (265 ms)
    ✓ should return status code 401 if given invalid token (18 ms)
  POST /tests
    ✓ should answer with status code 201 when given valid body (354 ms)
    ✓ should answer with status code 401 when given invalid token (39 ms)
    ✓ should answer with status code 422 when given invalid body (239 ms)
    ✓ should answer with status code 404 when given non existing ids (239 ms)
  POST /tests/:testId
    ✓ should answer with status code 201 when given valid testId (292 ms)
    ✓ should answer with status code 404 when given invalid testId (299 ms)

Test Suites: 1 passed, 1 total
Tests:       23 passed, 23 total
Snapshots:   0 total
Time:        49.648 s
Ran all test suites.
```
If all test suites passes, you're good to go!
