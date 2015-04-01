process.env.SYSTEM_JS_PATH = "file://home/avnerus/Projects/EQuala/avneriot/build";

console.log("BaseURL: ", process.env.SYSTEM_JS_PATH);

System.config({
  "baseURL": process.env.SYSTEM_JS_PATH
});
