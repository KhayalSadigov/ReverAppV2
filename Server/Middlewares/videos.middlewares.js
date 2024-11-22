const videoMiddlewares = {
    post : async (req,res,next) => {
        next() ;
    }
}

module.exports = videoMiddlewares