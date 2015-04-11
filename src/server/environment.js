console.log("BaseURL: ", process.env.APP_BASE_PATH + "/build");

System.config({
    "baseURL": 'file:' + process.env.APP_BASE_PATH + "/build"
});
