import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'


const prisma = new PrismaClient();


//===================================//
//========== POST REQUESTS ==========//
//===================================//

//=== Create Association ===//
export const createAssociation = async (req:Request, res:Response) => {
    try{
        const association = await prisma.association.create({
            data: {
                nom: req.body.nom,
            }
        });
        res.status(201).json({association, message:"Association créée", severity: "success"});
    }catch(e){
        res.status(400).json({error: "Erreur lors de la création de l'association"});  
    }
}

//===================================//
//========== GET REQUESTS ===========//
//===================================//

//=== Get All Associations ===//
export const getAllAssociations = async (req:Request, res:Response) => {
    try{
        const associations = await prisma.association.findMany();
        res.status(200).json(associations);
    }catch(e){
        res.status(400).json({error: "Erreur lors de la récupération des associations"});  
    }
}

//=== Get One Association ===//
export const getAssociationById = async (req:Request, res:Response) => {
    try{
        const association = await prisma.association.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });
        res.status(200).json(association);
    }catch(e){
        res.status(400).json({error: "Erreur lors de la récupération de l'association"});  
    }
}

//===================================//
//========== PUT REQUESTS ===========//
//===================================//

//=== Update Association ===//
export const updateAssociation = async (req:Request, res:Response) => {
    try{
        const association = await prisma.association.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                nom: req.body.nom,
            }
        });
        res.status(200).json({association, message:"Association modifiée", severity: "success"});
    }catch(e){
        res.status(400).json({error: "Erreur lors de la modification de l'association"});  
    }
}

//===================================//
//========== DELETE REQUESTS ========//
//===================================//

//=== Delete Association ===//
// Delete association and all id from benevoles (benevole)
export const deleteAssociation = async (req:Request, res:Response) => {
    try{
        // Delete all id from benevoles
        await prisma.benevole.updateMany({
            where: {
                associationID: Number(req.params.id)
            },
            data: {
                associationID: null
            }
        });

        // Delete association
        const association = await prisma.association.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        res.status(200).json({association, message:"Association supprimée", severity: "success"});
    }catch(e){
        res.status(400).json({error: "Erreur lors de la suppression de l'association"});  
    }
}