import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
const isemail = require("isemail");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

//=== Signup ===//
export const createBenevole = async (req:Request, res:Response) => {

    //Vérification validité email
    if (!isemail.validate(req.body.email)) {
        res.status(400).json({error: "Email invalide", severity: "error"});
        return;
    }

    //Vérification si email déjà utilisé
    const checkBenevole = await prisma.benevole.findUnique({
        where: {
            email: req.body.email,
        },
    });
    if (checkBenevole != null) {
        res.status(400).json({error: "Email déjà utilisé", severity: "error"});
        return;
    }

    
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const benevole = await prisma.benevole.create({
            data: {
                nom: req.body.nom,
                prenom: req.body.prenom,
                email: req.body.email,
                password: hashedPassword,
                pseudo: req.body.pseudo,
                tailleTShirt: req.body.tailleTShirt,
                vegetarien: req.body.vegetarien,
                hebergement: req.body.hebergement,
            },
        });
        res.status(201).json({benevole, message:"Inscription terminée", severity: "success"});
    }catch(e){
        res.status(400).json({error: "Erreur lors de la création du bénévole"});  
    }
}

//================ LOGIN ================//
exports.login = async (req:Request, res:Response) => {
    const benevole = await prisma.benevole.findUnique({
        where: {
            email: req.body.email,
        },
    });
    if (benevole == null) {
        res.status(400).json({error: "Email ou mot de passe invalide", severity: "error"});
        return;
    }
    const match = await bcrypt.compare(req.body.password, benevole.password);
    if (!match) {
        res.status(400).json({error: "Email ou mot de passe invalide", severity: "error"});
        return;
    }
    const token = jwt.sign({id_benevole: benevole.id}, process.env.JWT_TOKEN, {expiresIn: "24h"});
    res.status(200).json({benevole, message:"Connexion réussie", token,  severity: "success"});
}
//=============================//

export const getBenevole = async (req:Request, res:Response) => {
    const benevole = await prisma.benevole.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
    });
    res.json(benevole);
}

export const getBenevoles = async (_req:Request, res:Response) => {
    const benevoles = await prisma.benevole.findMany();
    res.json(benevoles);
}

export const updateBenevole = async (req:Request, res:Response) => {
    const benevole = await prisma.benevole.update({
        where: {
            id: parseInt(req.params.id),
        },
        data: {
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            password: req.body.password,
            pseudo: req.body.pseudo,
        },
    });
    res.json(benevole);
}

export const deleteBenevole = async (req:Request, res:Response) => {
    const benevole = await prisma.benevole.delete({
        where: {
            id: parseInt(req.params.id),
        },
    });
    res.json(benevole);
}