![Hapiness-SQL](https://github.com/sytango-technologies/Hapiness/blob/master/assets/images/logo2.png)

## Hapiness-SQL
Production ready Hapi boilerplate application with sequelize.

## Description
'Hapiness' boilerplate application serves as a great starting point for all the Hapi.js developers who were looking for a platform for their production server.

1) localhost:8000 - Serve web request <br />
2) localhost:8000/api - Serve rest api request

WEB and REST API both have their independent authentication mechanisms, the web application uses the cookie based authentication and the REST API uses the JWT authentication for access. The deployment and application management is done via 'Docker' & 'PM2' and there are different configurations/tasks for starting the app in the development vs the production environment. This application assumes the availability of 'MYSQL' installation on the localhost where the server will run.

The app contains basic user management with login, logout, password reset, profile view.
Forgot password implementation is done using 'nodemailer' (sends an email with reset password link with a unique token that expires in 1 hour).

For production, we have used 'PM2' as the process manager which spawns 4 servers for the application and takes care of the rest of application life cycle management. All the environment variables are managed using 'dotenv' node package for development, the same will need to be configured at the host server in the production environment.

If you are using 'Chrome' for unit testing the application, you can Hapi-ly use the 'node-inspector' chrome plugin pre-configured with this app for debugging purposes.

## SSL Support
SSL support has been provided using self signed certificates. Users may replace the certificates placed at config/ssl directory with their proprietary certificates.
The SSL support can be suppressed by commenting out the following lines in config/manifest.js : 
```
tls: Config.get('/tlsOptions')
```

## Requirements
- Node : 10.15.3
- Database : SQL database.

## Nodemailer Configuration
User may replace their gmail credentials in the .env file for debugging purpose on local environment.
However, for production the credentials should be set as environment variables.

## Technology

- **Hapi** - Server side framework
- **Docker** - Docker container support
- **Handlebar** - HTML templating engine
- **Sequelize** - Sequelize is a promise-based ORM for Node.js v4 and up.
- **SASS** - CSS preprocessor 
- **WebPack** - Asset pipeline
- **Dotenv** - Environment variable emulator
- **Good** - Logger mechanism
- **JWT** - Authentication mechanism for APIs
- **Config** - Configuration Handler
- **PM2** - Production process manager for Node.js apps
- **Nodemailer** - Module to send emails
- **Mocha** - Unit test framework

## Application Structure
```
├── app
│   ├── controllers
│   │   ├── api            // Controllers are organised by module names for rest api 
│   │   └── web            // Controllers are organised by module names for web api.
│   ├── helpers            // Helpers methods access by both api and web controllers.
│   ├── routes             // All app routes are defined here
│   │   ├── mobileApi      // RESTAPI routes for multiple versions V1 & V2.
│   │   │   ├── v1         // Routes for version1
│   │   │   └── v2         // Routes for version2
│   │   └── webApi         // WEB api routes.
│   └── templates          // Server-rendered handlebar templates,partials and helpers
├── assets                 // Contains all static resources 
│   ├── fonts              // Fonts used in application
│   ├── images             // Images used in application
│   ├── scripts            // Scripts used in application
│   │   ├── js             // User defined scripts
│   │   └── vendor         // Vendor scripts.
│   └── styles             // All SASS stylesheets
├──config                  // Contains all app configurations
│   ├── assets.js          // Assets configuration file
│   ├── config.js          // Application configuration. 
│   ├── default.json       // Configuration file.
│   ├── manifest.js        // App manifest file listing all plugins and load order.
│   ├── meta.js            // App metadata file.
│   └── ssl                // Contains ssl certificates
├── lib                    // Core application lib/plugins
├── logs                   // Contains app log file 
├──migrations              // All migration files are defined here
├──models                  // All sequelize models are defined here
└── test
    ├── testcases          // Testcases organised by module names.
    └── test.js            // Test file.
├──.gitignore              // standard git ignore file
├──.babelrc                // Babel config
├──pm2.config.js           // PM2 Configuration file
├──webpack.config.js       // Webpack config
├──.eslintrc               // Define eslint rules.
├──.eslintignore           // Ignores certain files for eslint rules
├──Dockerfile              // Standard docker file
├──docker-compose.yml      // Standard docker compose file 
├──server.js               // Contains all app configurations
├──package.js              // Node package file.
├──.env                    // dotenv configuration file for environment variable 

```
## Code

We're using semi-colons and comma-last. No rhyme or reason; and some of the hapi [code convention guidelines](http://hapijs.com/styleguide). All client-side js code is also in commonJS pattern packs using webpack. Check out `.eslintrc` for additional code conventions used.

## Sequelize
Sequelize is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations,read replication and more.

## Database
And one of the following databases with Sequelize

- npm install --save pg pg-hstore 
- npm install --save mysql2
- npm install --save sqlite3
- npm install --save tedious

## .env Configuration
To simulate environment variables in Dev environment, please create .env file at the root location and define the following properties -

```
DEBUGGER=false                                      // Enable/disable debug mode
NODE_ENV=development                                // Node Env development/production
PORT=8000                                           // Server Port
SERVER_HOST=0.0.0.0                                 // Hapi Server host
COOKIE_SECRET=This_Should_be_32_characters_long
YAR_COOKIE_SECRET=This_Should_be_32_characters_long
JWT_SECRET=This_Should_be_32_characters_long
DBHOST=localhost
DIALECT=mysql                                       // dialect for sql database.
DATABASE=hapiness
DB_USER=root
DB_PASS=systango
DB_PORT=3306
GMAIL_ID=Sender's Gmail Id
GMAIL_PASSWORD=Gmail password
GMAIL_SENDEREMAIL=Display email id for sender       // Could be same or different                                                            than GMAIL_ID
GMAIL_SENDERNAME=Sender's name to display in email
MAIL_HOST=smtp.gmail.com                            // Mail host
MAIL_PORT=465                                       // Mail Port
SWAGGER_HOST=localhost:8000                         // Host Url for Swagger

```

## Running the server locally

 - Install  `node`, `npm`
 - Define env configuration
 - Run these commands

```sh
# Install deps
$ npm install

# Required only when database not exist.
$ npm run db:create

# Required only when need to run database migration.
$ npm run db:migrate

# Install webpack-cli globally
$ npm install webpack-cli -g

# Run the node server in development mode
$ npm start

# Run the node server in production mode
$ npm run build
$ npm run prod
```
The servers should be running at: <br/> [localhost:8000](https://localhost:8000)

## Running the server in Docker Container

Prerequisite For Docker Configuration : Docker and docker compose must be installed on the system.

Steps to run app in docker container :
  1. CD to project dir
  2. Create build using cmd: $ docker-compose build
  3. Start the server in daemon thread using cmd: $ docker-compose up -d  
  4. Stop the server using cmd : $ docker-compose down

## REST API Versioning
 Hapiness now supports versioning out of the box. For sample purposes, v1 and v2 folders with appropriate route handlers are shared with this boilerplate. The versioning is done at the router's level only. Services are still placed at a single place with no support for versioning.

## Documentation

To view swagger API documentation

Visit [localhost:8000/documentation](http://localhost:8000/documentation) to view Swagger UI.

## Testing
Hapiness now supports writting unit test cases using 'Mocha' and 'Supertest' node packages.
- To execute the test cases please run the following command -

```sh
# Test the server
$ npm test

```

## Contributors
[Arpit Khandelwal](https://www.linkedin.com/in/arpitkhandelwal1984/)
[Vikas Patidar](https://www.linkedin.com/in/vikas-patidar-0106/)
