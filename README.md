#Express.JS Session Example

This litle project was maked with the main idea of test, the middleware in the framework Express.JS, using the following modules, sqlite3, json-parser, body-parser, Router to build a secure login and modules.

##MVC Pattern Implementation

The model has the following modules:

1. User database in SQLite.
2. DatabaseController class to connect and disconnect from database.
3. UserModel class that integrates the CRUD methods to operate in the database.
4. User Entity class to define the fields of one user.

The controller has the following modules:

1. UserLoginController: controller to auth the user into the application.
2. UserController: controller to manipulate the UserModel and use its CRUD methods.

**Diagram**
![mvc pattern](https://raw.githubusercontent.com/captaincode0/express-session-example/master/assets/mvc.jpg)

##Database

The database for this little project is really simple, just is one table that stores users.

```sql
    create table users (
        id integer primary key autoincrement,
        email varchar(45) not null,
        pass char(12) not null
    );

    insert into users values(null, "amy@nasa.gov", "mycat1234");
    insert into users values(null, "john@nasa.gov", "123456");
```


