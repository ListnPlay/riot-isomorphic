import memory from 'feathers-memory';
import crypto from 'crypto';
import passport from 'passport'
import passportLocal from 'passport-local'

// An In-memory CRUD service
let userService = memory();

// Add a hook to the user service that automatically hashes the password before saving it
// From: https://github.com/feathersjs/feathers-passpo;

let sha1 = (string) => {
    var shasum = crypto.createHash('sha1');
    shasum.update(string);
    return shasum.digest('hex');
};

userService.insertHooks = (service) => {
    console.log("User service::Inserting Hooks")
    service.before({
        create: function(hook, next) {
            var password = hook.data.password;
            // Replace the data with the SHA1 hashed password
            hook.data.password = sha1(password);
            next();
        }
    });
}

userService.createTestUser = (service) => {
    // Test
    service.create({
        username: 'test',
        password: '1234'
    }, {}, function(error, user) {
        console.log('Created default user', user);
    });
}

userService.setupPassport = (service, app) => {
    // Passport authentictation
    // ----------------------------------

    // Use the id to serialize the user
    const LocalStrategy = passportLocal.Strategy;

    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    // Deserialize the user retrieving it form the user service
    passport.deserializeUser(function(id, done) {
      // Get the user service and then retrieve the user id
      service.get(id, {}, done);
    });

    // Attach the local strategy
    passport.use(new LocalStrategy(function(username, password, done) {
        var query = {
          username: username
        };

        service.find({ query: query }, function(error, users) {
          if(error) {
            return done(error);
          }

          var user = users[0];

          if(!user) {
            return done(new Error('User not found'));
          }

          // Compare the hashed password
          if(user.password !== sha1(password)) {
            return done(new Error('Password not valid'));
          }

          done(null, user);
        });
      }
    ));

    // RESTful Login service
    app.post('/login', async function(req, res, next) {
        console.log("Login service: ", req.body);

        let passportLogin = (req, res, next) => {
            return new Promise((resolve, reject) => {
                passport.authenticate('local', (err, user, info) => {
                  console.log("Passport authenticate result - err: ", err, " user: ", user, " info: ", info);
                  if (err) {
                      reject(err.toString());
                  } else {
                      req.logIn(user, function(err) {
                          if (err) {
                              reject(err.toString());
                          } else {
                              resolve(user);
                          }
                      });
                  }

                })(req, res, next);
            });
        }

        try {
            let user = await passportLogin(req, res, next);
            res.send({
                  status: "success",
                  data: {
                      user : user 
                  }
            })
        }
        catch (error) {
            res.send({
                status: "error",
                message: error
            })
        }
        
    });
}


export default userService;


