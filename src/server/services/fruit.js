const fruitService = {
    get: function(fruitName) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("Fruit Service --> Get fruit ", fruitName);
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
            },1000);
        });
    }
};


export default fruitService;
