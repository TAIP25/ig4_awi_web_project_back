import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient();


//===================================//
//========== GET REQUESTS ==========//
//===================================//

// GET - Récupérer tous les jeuxSousEspaceFestival
export const getAllJeuxSousEspaceFestival = async (_:Request, res:Response) => {
    try{
        const jeuxSousEspaceFestival = await prisma.jeuSousEspaceFestival.findMany();
        res.status(200).json(jeuxSousEspaceFestival);
    }catch(e){
        res.status(500).json({error: "Erreur lors de la récupération des jeuxSousEspaceFestival"});
    }
}

// GET - Récupérer tous les jeuxSousEspaceFestival d'un festival
export const getJeuxSousEspaceFestivalByFestival = async (req:Request, res:Response) => {
    try{
        const festivalID = parseInt(req.params.festivalID);
        const jeuxSousEspaceFestival = await prisma.jeuSousEspaceFestival.findMany({
            where: {
                festivalID: festivalID
            },
            include: {
                jeu: true,
                sousEspaceDeJeu: true
            }
        });
        res.status(200).json(jeuxSousEspaceFestival);
    }catch(e){
        res.status(500).json({error: "Erreur lors de la récupération des jeuxSousEspaceFestival"});
    }
}

//===================================//
//========== POST REQUESTS ==========//
//===================================//

export const createJeuSousEspaceFestival = async (req:Request, res:Response) => {
    try{
        const jeuSousEspaceFestival = await prisma.jeuSousEspaceFestival.create({
            data: {
                jeuID: req.body.jeuID,
                sousEspaceDeJeuID: req.body.sousEspaceDeJeuID,
                festivalID: req.body.festivalID,
            },
        });
        res.status(201).json({jeuSousEspaceFestival, message:`JeuSousEspaceFestival ${jeuSousEspaceFestival.jeuID} créé`, severity: "success"});
    }catch(e){
        if(e.code === "P2002"){
            res.status(400).json({error: `JeuSousEspaceFestival ${req.body.jeuID} déjà existant`, severity: "error"});
        }else{
            console.log(e);
            res.status(500).json({error: "Erreur lors de la création du jeuSousEspaceFestival"});  
        }  
    } 
}