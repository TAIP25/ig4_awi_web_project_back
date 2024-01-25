import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'


const prisma = new PrismaClient();

//=== Create Festival ===//
export const createFestival = async (req:Request, res:Response) => {
    try{
        const festival = await prisma.festival.create({
            data: {
                edition: req.body.edition,
                dateDebut: req.body.dateDebut,
                dateFin: req.body.dateFin
            }
        });
        res.status(201).json({festival, message:"Festival créé", severity: "success"});
    }catch(e){
        res.status(400).json({error: "Erreur lors de la création du festival"});  
    }
}

//===================================================================//
//=========================== GET REQUESTS ==========================//
//===================================================================//

//=== Get All Festivals ===//
export const getAllFestivals = async (_req:Request, res:Response) => {
    try{
        const festivals = await prisma.festival.findMany();
        res.status(200).json(festivals);
    }catch(e){
        res.status(400).json({error: "Erreur lors de la récupération des festivals"});  
    }
}

//=== Get One Festival ===//
export const getFestivalById = async (req:Request, res:Response) => {
    console.log("test");
    try{
        const festival = await prisma.festival.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });
        res.status(200).json(festival);
    }catch(e){
        res.status(400).json({error: "Erreur lors de la récupération du festival"});  
    }
}

//=== Get next Festival ===//
export const getNextFestival = async (_req:Request, res:Response) => {
    //console.log("test");
    try{
        // Get current date
        const currentDate = new Date();
        // Get next festival just after current date using gt (greater than) and order by dateDebut
        const festival = await prisma.festival.findFirst({
            where: {
                dateDebut: {
                    gt: currentDate
                }
            },
            orderBy: {
                dateDebut: "asc"
            }
        });

        res.status(200).json(festival);
    }catch(e){
        res.status(400).json({error: "Erreur lors de la récupération du festival"});  
    }
}

//===================================================================//
//=========================== PUT REQUESTS ==========================//
//===================================================================//

//=== Update Festival ===//
export const updateFestival = async (req:Request, res:Response) => {
    try{
        const festival = await prisma.festival.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                edition: req.body.edition,
                dateDebut: req.body.dateDebut,
            }
        });
        res.status(200).json({festival, message:"Festival modifié", severity: "success"});
    }catch(e){
        res.status(400).json({error: "Erreur lors de la modification du festival"});  
    }
}

//=== Delete Festival ===//
// Delete festival and all associations with benevoles (festivalBenevole)
export const deleteFestival = async (req:Request, res:Response) => {
    try{
        // Delete all associations with benevoles
        await prisma.festivalBenevole.deleteMany({
            where: {
                festivalID: Number(req.params.id)
            }
        });

        // Delete festival
        const festival = await prisma.festival.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        res.status(200).json({festival, message:"Festival supprimé", severity: "success"});
    }catch(e){
        res.status(400).json({error: "Erreur lors de la suppression du festival"});  
    }
}

                