const tasteService = {
    get: function(fruitName) {
        return new Promise((resolve, reject) => {
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
        });
    }
};

export default tasteService;
