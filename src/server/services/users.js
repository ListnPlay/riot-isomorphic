import memory from 'feathers-memory';
import crypto from 'crypto';

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

// Test
userService.create({
    username: 'test',
    password: '1234'
}, {}, function(error, user) {
    console.log('Created default user', user);
});

export default userService;


