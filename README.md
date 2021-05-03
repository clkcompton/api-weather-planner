# Weather Planner API

#### Description
Calls to the weather API and provides CRUD functionality in connection with the mysql database.

Please note, this project was built to function with the [ui-weather-planner repository](https://github.com/clkcompton/ui-weather-planner.git).

**Project Setup**
* Through Open Weather, request the [free One Call API key](https://openweathermap.org/full-price#current) (further instructions to come)
* Install global dependencies. These are the global dependencies I used along with the recommended versions:
  * npm@7.10.0
  * nodemon@2.0.7
* Create mysql database with two tables, `user` and `activity`; Further instructions and queries located in "Database Creation" section below
* Run `npm i` within the project directory to install project dependencies
* Run application with npm run start


**Database Creation**
Note: These instructions assume that you already have [MySQL](https://dev.mysql.com/doc/mysql-installation-excerpt/8.0/en/osx-installation.html) and [MySQL Workbench](https://www.mysql.com/products/workbench/) installed and working.

Create a new MySQL database called "weather-planner".

Under "Users and Privileges" in the Administration tab, create a new account named "weather" with the password set to "password" and "Limit to Hosts Matching" set to "localhost". Be sure to set Schema Privilages to "All".

<img src="https://user-images.githubusercontent.com/74030805/116909494-e44f0880-ac09-11eb-9089-58531c74b752.png" width="300">

<img src="https://user-images.githubusercontent.com/74030805/116909478-e0bb8180-ac09-11eb-8f69-9d1f476b1486.png" width="300">


The MySQL database is linked to the project in the service.js file: 
```
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'weather',
  password : 'password',
  database : 'weather-planner'
});
```
The password can be changed in this file and under the account details in "Users and Privileges"

The below images show the settings/structure of the user and activity tables.

User Table Settings:  
<img src="https://user-images.githubusercontent.com/74030805/116908354-6807f580-ac08-11eb-8822-e6a62f5d6a80.png" width="300">

Activity Table Settings:  
<img src="https://user-images.githubusercontent.com/74030805/116908363-6b9b7c80-ac08-11eb-8c26-2db78c31defc.png" width="300">

Activity Table Foriegn Key Settings:  
<img src="https://user-images.githubusercontent.com/74030805/116908289-532b6200-ac08-11eb-82fe-0327300086e2.png" width="300">



**Notes**
* endpoints are located in the endpointCollection.js file
