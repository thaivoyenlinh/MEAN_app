# Online Shopping Web Application

# Environtment setup

## Install Node.js and Angular in Window OS

1. Node.js
- Download Node.js here (choose Windows Installer): https://nodejs.org/en/download/
- Check the installation . Open yhe terminal and run the following command:

```
node --version # or node -v
npm --version # or npm -v
```

2. Angular
- Install angular-cli: `npm install -g @angular/cli@8.1.0`
- Check the installation: `ng --version`


## Install MongoDB Server
- Download here (choose Platform Windows): https://www.mongodb.com/try/download/community
- Add Mongo’s bin folder to the Path Environment Variable: https://dangphongvanthanh.wordpress.com/2017/06/12/add-mongos-bin-folder-to-the-path-environment-variable/
- Check the installation: in the terminal and run command: `mongo`

# Run the project

## Preparing

- Open the terminal and run: `npm install`
- Rename `.env_example` file to `.env`
- Create a new folder named "data" in server directory for MongoDB data store directory. Then, run the command in your terminal: `mongod --dbpath 
[your_absolute_path_to_project/server/data]`. Example: `mongod --dbpath "D:\MEAN-stack\server\data"`

## Running

### Server side
Open terminal and run 

```
cd server
nodemon index.js
```

### Client side
Open the second terminal

1. Development server

Run `ng serve -o` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. 
* Note: If there is error occur like "system limit for number of file watchers reached"
* Fix: run the command in your terminal 
`echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`

2. Code scaffolding

- Run `ng generate component component-name` or `ng g c component-name` to generate a new component. 
- You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

3. Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

4. Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

5. Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

6. Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Create a new workspace

## Create a new project

```
cd your-dir
ng new your-project-name
```

1. Dependencies for Node.js

```
npm install express
npm install mongoose
npm install dotenv
npm install cors
npm install morgan
npm install -g nodemon
```

2. Dependencies for Angular

```
    ng add @angular/material
    ng add @angular/localize
    npm install @ngx-translate/core@12.x --save
    npm install @ngx-translate/http-loader@4.x --save
    npm install chart.js@2.9.4 ng2-charts@2.4.2
```