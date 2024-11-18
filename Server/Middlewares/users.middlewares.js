const { patch } = require("../Controllers/users.controller");
const usersValidation = require("../Validations/users.validation")


const userMiddlewares = {
    post : async (req,res,next) =>{
        const {value , error} = usersValidation.validate(req.body)
        if(!error){
            next() ;
        }
        else{
            res.status(400).send(
                {
                    message : error.details
                }
            )
        }
    },
    patch : async (req,res,next) =>{
        const {value , error} = usersValidation.validate(req.body)
        if(!error){
            next() ;
        }
        else{
            res.status(400).send(
                {
                    message : error.details
                }
            )
        }
    }
}

module.exports = userMiddlewares