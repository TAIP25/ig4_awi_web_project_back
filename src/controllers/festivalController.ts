import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'


const prisma = new PrismaClient();

//=== Create Festival ===//
export const createFestival = async (req:Request, res:Response) => {
    try{
        const festival = await prisma.festival.create({
            data: {
                edition: req.body.edition,
            }
        });
        res.status(201).json({festival, message:"Festival créé", severity: "success"});
    }catch(e){
        res.status(400).json({error: "Erreur lors de la création du festival"});  
    }
}

                