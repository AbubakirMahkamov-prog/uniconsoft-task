## About project
Developed with the requirement of a vacancy at Uniconsoft

## Features

### Roles
- **Admin**
  - Create, read, update, delete (CRUD) organizations.
  - Manage users within an organization.
  
- **Organization Manager**
  - Manage projects and tasks.
  - Assign tasks to employees with deadlines.
  - View all tasks filtered by projects.

- **Organization Employee**
  - View assigned tasks by project and status.

### Core Functionalities
- **CRUD Operations** for:
  - Organizations
  - Users (with role selection)
  - Projects
  - Tasks (with deadlines and status tracking)
  
- **Task Assignment**: Managers can assign tasks to employees and set due dates.
- **Status Tracking**: Tasks progress through three statuses - `CREATED`, `IN_PROCESS`, `DONE`.
- **Project-Based Filtering**: Filter tasks by project or status.

### Admin Statistics (Optional)
- **Organization-level Stats**: Total number of projects and tasks.
- **Project-level Stats**: Task count per project.
- **Overall Stats**: Total organizations, projects, and tasks in the system.



## Project setup

```bash
$ npm install
```

## Configure PostgreSQL connection in `.env` file:
  ```bash
    DB_HOST=localhost
    DB_USER=postgres
    DB_NAME=DB
    DB_PASSWORD=123
    DB_PORT=5432
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

### Swagger Authentication
The Swagger UI is protected with basic authentication. Use the following credentials to access the API documentation:

- **Username**: `unicon`
- **Password**: `123`

Access Swagger UI at:
```bash
http://localhost:3000/docs


## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.

## Stay in touch

- Author - [Abubakir Mahkamov](https://t.me/mahkamov_abubakir)