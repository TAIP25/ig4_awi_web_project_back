import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import isemail from 'isemail';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';




const prisma = new PrismaClient();

//===================================//
//========== POST REQUESTS ==========//
//===================================//

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
        // Create benevole and add association id if in body
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
                associationID: req.body.associationID,
            },
        });
        res.status(201).json({benevole, message:"Inscription terminée", severity: "success"});
    }catch(e){
        res.status(500).json({error: "Erreur lors de la création du bénévole"});  
    }
}

//===================================//
//========== GET REQUESTS ===========//
//===================================//

//================ LOGIN ================//
export const login = async (req:Request, res:Response) => {
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

    if (!process.env.JWT_TOKEN) {
        res.status(500).json({ error: "JWT_TOKEN not configured", severity: "error" });
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

//===================================//
//========== PUT REQUESTS ===========//
//===================================//

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
            tailleTShirt: req.body.tailleTShirt,
            vegetarien: req.body.vegetarien,
            hebergement: req.body.hebergement,
            adresse: req.body.adresse,
            telephone: req.body.telephone,
            jeuFavoriId: req.body.jeuFavoriId,
        },
    });
    res.json(benevole);
}

//===================================//
//========== DELETE REQUESTS ========//
//===================================//

// Delete benevole and all associations with festivals (festivalBenevole)
export const deleteBenevole = async (req:Request, res:Response) => {

    try{
        // Delete all associations with festivals
        await prisma.festivalBenevole.deleteMany({
            where: {
                benevoleID: Number(req.params.id)
            }
        });

        // Delete benevole
        const benevole = await prisma.benevole.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        res.status(200).json({benevole, message:"Bénévole supprimé", severity: "success"});
    }
    catch(e){
        res.status(500).json({error: "Erreur lors de la suppression du bénévole", severity: "error"});  
    }
}