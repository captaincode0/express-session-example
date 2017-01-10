#Express.JS Session Example

![js banner](https://raw.githubusercontent.com/captaincode0/express-session-example/master/assets/banner.jpg)

This litle project was maked with the main idea of test, the middleware in the framework Express.JS, using the following modules, sqlite3, json-parser, body-parser, Router to build a secure login and modules.

##Project structure
- assets
- controllers
    + Controller.js
    + UserController.js
    + UserLoginController.js
- entities
    + User.js
- model
    + usersdb.sql
    + usersdb
    + DatabaseController.js
    + Model.js
    + UserModel.js
- routes
    + middleware
        * auth-middleware.js
    + index.js
    + userpanel-adminusers.js
    + userpanel.js
- .gitignore
- README.md
- package.json
- server.js

##Run the project

```bash
    user@shell:~node server.js
```

##Routes

- /:home page
    + /about [get]
    + /contact [get]
    + /login [get]
    + /login [post]
- /userpanel: user administrative section [this sections uses the middleware to access into restricted zone]
    + /profile [get]
    + /stats [get]
    + /galery [get]
    + /logout [get]

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

##Testing

The application tests was really simple, with curl, firefox trying to do get and post requests at `127.0.0.1:4444`.

Test list:
- Middleware test.
- Login and logout test.

**Middleware test**

The middleware in auth.js check if the session is active. and then pass to the next route, but in other case send one message that says forbidden.

```javascript
    //auth.js
    var auth = function(req, res, next){
        if(req.session.userlogged)
            next();
        else
            res.status(403).send("Forbidden");
    }

    module.exports = auth;
```

To make that middleware executes before serve data, just do the next thing:

```javascript
    router.get("/private", middleware_callback, function(req, res){
        //do something after middleware execution
    });
```

The result is in the following image:
![middleware test](https://raw.githubusercontent.com/captaincode0/express-session-example/master/assets/middleware-test.jpg)

**Login and logout test**

I did this test with curl and urlencoded data to make post requests, with the default user `amy@nasa.gov:mycat1234`

```bash
    user@shell:~curl http://localhost:4444/login -d "email=amy@nasa.gov&pass=mycat1234"
```

The results are on the following image:
![login test](https://raw.githubusercontent.com/captaincode0/express-session-example/master/assets/login-test.png)