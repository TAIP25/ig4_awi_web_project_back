import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient();

//================ GET ================//
export const getCreneauHoraires = async (_req:Request, res:Response) => {
    try{
        const creneauHoraire = await prisma.creneauHoraire.findMany();   
        res.status(200).json({creneauHoraire, message:"Liste des créneaux horaires", severity: "success"});
    } catch(e){
        res.status(500).json({error: "Erreur lors de la récupération des créneaux horaires", severity: "error"});
    }
}

export const getCreneauHoraireById = async (req:Request, res:Response) => {
    if(req.params.id == null){
        return res.status(400).json({error: "Champs manquants", severity: "error"});
    }
    try{
        const creneauHoraire = await prisma.creneauHoraire.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        });
        return res.status(200).json({creneauHoraire, message:"Liste des créneaux horaires", severity: "success"});
    } catch(e){
        return res.status(500).json({error: "Erreur lors de la récupération des créneaux horaires", severity: "error"});
    }
}