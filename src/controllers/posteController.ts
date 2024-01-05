import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient();

//================ GET ================//
export const getPostes = async (_req:Request, res:Response) => {
    try{
        const poste = await prisma.poste.findMany();   
        res.status(200).json({poste, message:"Liste des postes", severity: "success"});
    } catch(e){
        res.status(500).json({error: "Erreur lors de la récupération des postes", severity: "error"});
    }
}

export const getPosteByName = async (req:Request, res:Response) => {
    if(req.params.nom == null){
        return res.status(400).json({error: "Champs manquants", severity: "error"});
    }
    try{
        const poste = await prisma.poste.findUnique({
            where: {
                nom: req.params.nom,
            },
        });
        return res.status(200).json({poste, message:"Liste des postes", severity: "success"});
    } catch(e){
        return res.status(500).json({error: "Erreur lors de la récupération des postes", severity: "error"});
    }
}

export const getPosteById = async (req:Request, res:Response) => {
    if(req.params.id == null){
        return res.status(400).json({error: "Champs manquants", severity: "error"});
    }
    try{
        const poste = await prisma.poste.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        });
        return res.status(200).json({poste, message:"Liste des postes", severity: "success"});
    } catch(e){
        return res.status(500).json({error: "Erreur lors de la récupération des postes", severity: "error"});
    }
}

//================ POST ================//
export const createPoste = async (req:Request, res:Response) => {
    if(req.body.description == null || req.body.nom == null){
        return res.status(400).json({error: "Champs manquants", severity: "error"});
    }
    try{
        const poste = await prisma.poste.create({
            data: {
                nom: req.body.nom,
                description: req.body.description,
            },
        });
        return res.status(200).json({poste, message:"Création du poste réussie", severity: "success"});
    }catch(e){
        return res.status(500).json({error: "Erreur lors de la création du poste", severity: "error"});  
    }
}

//================ PUT ================//
export const updatePoste = async (req:Request, res:Response) => {
    if(req.body.id == null || (req.body.description == null && req.body.nom == null)){
        return res.status(400).json({error: "Champs manquants", severity: "error"});
    }
    try{
        const poste = await prisma.poste.update({
            where: {
                id: parseInt(req.body.id),
            },
            data: {
                nom: req.body.nom,
                description: req.body.description,
            },
        });
        return res.status(200).json({poste, message:"Modification du poste réussie", severity: "success"});
    } catch(e){
        return res.status(500).json({error: "Erreur lors de la modification du poste", severity: "error"});
    }
}