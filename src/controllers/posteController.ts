import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient();

//================ GET ================//
// Get all postes for a festival
export const getPostes = async (req:Request, res:Response) => {
    if(req.params.id == null){
        return res.status(400).json({error: "Champs manquants", severity: "error"});
    }
    try{
        const poste = await prisma.poste.findMany({
            where: {
                festivalID: parseInt(req.params.id),
            },
        }); 
        return res.status(200).json({poste, message:"Liste des postes", severity: "success"});
    } catch(e){
        return res.status(500).json({error: "Erreur lors de la récupération des postes", severity: "error"});
    }
}

// Get the poste with the given name and festival
export const getPosteByName = async (req:Request, res:Response) => {
    if(req.params.nom == null || req.params.id == null){
        return res.status(400).json({error: "Champs manquants", severity: "error"});
    }
    try{
        const poste = await prisma.poste.findUnique({
            where: {
                PosteUniqueWithFestivalName: {
                    nom: req.params.nom,
                    festivalID: parseInt(req.params.id),
                },
            },
        });
        return res.status(200).json({poste, message:"Poste récupéré", severity: "success"});
    } catch(e){
        return res.status(500).json({error: "Erreur lors de la récupération du poste", severity: "error"});
    }
}

// Get the poste with the given id
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
        return res.status(200).json({poste, message:"Poste récupéré", severity: "success"});
    } catch(e){
        return res.status(500).json({error: "Erreur lors de la récupération du poste", severity: "error"});
    }
}

//================ POST ================//
export const createPoste = async (req:Request, res:Response) => {
    if(req.body.festivalId == null || req.body.nom == null || req.body.description == null || req.body.nombreBenevoles == null){
        return res.status(400).json({error: "Champs manquants", severity: "error"});
    }
    try{
        const poste = await prisma.poste.create({
            data: {
                festivalID: parseInt(req.body.festivalId),
                nom: req.body.nom,
                description: req.body.description,
                nombreBenevoles: req.body.nombreBenevoles,
            },
        });
        return res.status(200).json({poste, message:"Création du poste réussie", severity: "success"});
    }catch(e){
        return res.status(500).json({error: "Erreur lors de la création du poste", severity: "error"});  
    }
}

//================ PUT ================//
export const updatePoste = async (req:Request, res:Response) => {
    if(req.body.id == null || req.body.nom == null || req.body.description == null || req.body.nombreBenevoles == null){
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
                nombreBenevoles: req.body.nombreBenevoles,
            },
        });
        return res.status(200).json({poste, message:"Modification du poste réussie", severity: "success"});
    } catch(e){
        return res.status(500).json({error: "Erreur lors de la modification du poste", severity: "error"});
    }
}