# repo-provas-api
This is a private REST API for the webpage [repo-provas](https://github.com/fe-sak/repo-provas).
The application manages school tests where users can create a test by providing a pdf url link. \

## Features

:green_circle: User authentication \
:green_circle: Retrieve all categories \
:green_circle: Retrieve all disciplines \
:green_circle: Retrieve all teachers \
:green_circle: Retrieve all tests \
:green_circle: Create a test \
:green_circle: Increment test views \
:white_circle: Upload a pdf file \
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
![drawSQL-export-2022-06-27_01 05](https://user-images.githubusercontent.com/92526601/175858045-e5b174a2-6e67-45b9-b187-20c7457c545a.png)


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
## How to install


