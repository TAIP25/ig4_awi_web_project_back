
const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction  } from 'express';

module.exports = (req: Request, res: Response, next: NextFunction) =>{
    try{
        // console.log(req.body);
        // const token = req.token;
        const token = req.headers.authorization?.replace('Bearer ', '');
        console.log('Le TOKEN : ');
        console.log(token);
        if(!token){
            return res.status(401).json({message: "Token d'authentification manquant !"})
        }
        console.log('Avant verify');
        req.body.token = jwt.verify(token, process.env.JWT_TOKEN);
        console.log('Après verify');
        next();
    }catch(error){
        res.status(401).json({message: "Token d'authentification invalide !", error})
    }

    return;
}