const tasteService = {
    get: function(fruitName, params) {
        return new Promise((resolve, reject) => {
            if (!params.user) {
                reject("Only logged in users are allowed to taste the fruit");
            } else {
                console.log("Taste Service --> Taste fruit ", fruitName);
                let taste;
                if (Math.random() > 0.5) {
                    taste = "Good!";
                } else {
                    taste = "Bad";
                }
                resolve({
                        result: taste
                });
            }
        });
    }
};

export default tasteService;
