if (!window.env) {
    window.env = {};
}
window.env.SYSTEM_JS_PATH = "/"


console.log("BaseURL: ", window.env.SYSTEM_JS_PATH);

System.config({
  "baseURL": window.env.SYSTEM_JS_PATH
});
