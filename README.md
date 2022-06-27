# repo-provas-api
This is a private REST API for the webpage [repo-provas](https://github.com/fe-sak/repo-provas).
The application manages school tests, where users can create a test by providing a PDF url link. \

## Features

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
:white_circle: Create a teacher \

Each test must have a teacher and be part of a category and a discipline.



## Endpoints

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

## Technologies used
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

## Prerequisites for running the project in your local machine

- Bash Shell or any kind of shell for running commands in your terminal (all commands seen in this document are run inside a shell). If you're using Linux, it is installed by default. If you're using Windows, I suggest you follow this [guide](https://itsfoss.com/install-bash-on-windows/)
- [Git](https://git-scm.com) installed for cloning the project and managing source code changes. You must also configure your git tool for connecting to GitHub using ssh. [The official GitHub guides](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- Nodejs installed. It is recommended to use a version manager, such as [nvm](https://github.com/nvm-sh/nvm)
- PostgreSQL for database service. Find your OS distribution and follow the [guides](https://www.postgresql.org/download/)

## Download project

Prerequisites met, clone the GitHub repository running:
```
git clone git@github.com:fe-sak/repo-provas-api.git
```
The project is already in your machine.

To access the downloaded folder, run:
```
cd repo-provas-api
```

## Setup environment variables

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

## Run the application

After setting up everything, start the development environment running:
```
npm run dev
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

Give it a try, sending a http request with method POST to route /signup. (url: http://localhost:5000/signup). If you get the error "422 - Unprocessable Entity", the application is working!
Observation: to send a http request, you need a REST API client. There are VS Code extensions, desktop applications and web applications.

- VS Code application: [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)
- Desktop application: [Insonmina](https://insomnia.rest/)
- A web application: [postman](https://www.postman.com/) \

These are suggestions, you may use any of your preference.
