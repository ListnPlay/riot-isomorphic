import riot from 'riot';
import routes from '../routes';

riot.tag('login', `

  <form onsubmit="{ login }">
      <div>
        <span class="login-field">
            User Name: 
        </span>
        <span>
          <input type="text" name="username">
        </span>
      </div>
      <div>
        <span class="login-field">
            Password:
        </span>
        <span>
            <input type="password" name="password">
        </span>
      </div>
      <div>
          <span class="login-field">
             <input type="submit" value="Login">
          </span>
      </div>
  </form>
  <div if={errorMessage} class="login-error">
    {{errorMessage}}          
  </div>

  <p class="note"> * Default user/password: test/1234 * </p>

 <style>
     login {
         color: black;
     } 

     login .login-field {
         width: 100px;
         display: inline-block;
         margin: 5px;
     }

     login .note {
         font-size: 14px;
     }

     login .login-error {
         color: red;
         font-weight: bold;
     }

 </style>
 `,
 function(opts) {
    let store = opts.store;

    this.login = (e) => {
        console.log("Logging in with: ", this.username.value, "/", this.password.value);
        opts.dispatcher.trigger("user_login", {
            username: this.username.value,
            password: this.password.value
        });
    }

    store.observer.on("login_error", (message) => {
        console.log("Received login error message: ", message);        
        this.errorMessage = message;
        this.update();
    });

    store.observer.on("login_success", () => {
        console.log("Logged in");        
        routes.page.show("/");
    });
});


