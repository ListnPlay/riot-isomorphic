const fruistService = {
    get: function(fruitName) {
        return new Promise((resolve, reject) => {
            if (fruitName == "apple") {
                resolve({
                    types: ["Pink Lady", "Gala", "Fuji","Granny Smith"]
                });
            }
            else if (fruitName == "banana") {
                resolve({
                    types: ["Cavendish", "Lady Finger", "Pisang Raja", "Williams"]
                });
            } else {
                reject("Unknown type of fruit");
            }
        });
    }
};


export default fruistService;
