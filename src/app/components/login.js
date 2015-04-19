import riot from 'riot';
import RiotControl from 'riotcontrol';

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

 </style>
 `,
 function(opts) {
    let store = opts.store;

    this.login = (e) => {
        console.log("Logging in with: ", this.username.value, "/", this.password.value);
        RiotControl.trigger("user_login", {
            username: this.username.value,
            password: this.password.value
        });
    }
});


