import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'


const prisma = new PrismaClient();

//===================================//
//========== POST REQUESTS ==========//
//===================================//

//=== Create association between festival and benevole ===//
export const createFestivalBenevole = async (req:Request, res:Response) => {
    try{
        const festivalBenevole = await prisma.festivalBenevole.create({
            data: {
                festivalID: req.body.festivalId,
                benevoleID: req.body.benevoleId,
            }
        });
        res.status(201).json({festivalBenevole, message:"Association créée", severity: "success"});
    }catch(e){
        res.status(400).json({error: "Erreur lors de la création de l'association"});  
    }
}

//===================================//
//========== GET REQUESTS ===========//
//===================================//

//=== Get All associations between festival and benevole ===//
export const getAllFestivalsBenevoles = async (_req:Request, res:Response) => {
    try{
        const festivalsBenevoles = await prisma.festivalBenevole.findMany();
        res.status(200).json(festivalsBenevoles);
    }catch(e){
        res.status(400).json({error: "Erreur lors de la récupération des associations"});  
    }
}



//===================================//
//========== PUT REQUESTS ===========//
//===================================//



//===================================//
//========== DELETE REQUESTS ========//
//===================================//

//=== Delete association between festival and benevole ===//
export const deleteFestivalBenevole = async (req:Request, res:Response) => {
    try{
        const festivalBenevole = await prisma.festivalBenevole.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        res.status(200).json({festivalBenevole, message:"Association supprimée", severity: "success"});
    }catch(e){
        res.status(400).json({error: "Erreur lors de la suppression de l'association"});  
    }
}

