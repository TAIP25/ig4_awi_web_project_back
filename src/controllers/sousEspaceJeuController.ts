import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient();


//===================================//
//========== GET REQUESTS ==========//
//===================================//



//===================================//
//========== POST REQUESTS ==========//
//===================================//

//=== Create SousEspaceDeJeu ===//
export const createSousEspaceDeJeu = async (req:Request, res:Response) => {

    try{
        // Create sousEspaceDeJeu according to the model above
        const sousEspaceDeJeu = await prisma.sousEspacedeJeu.create({
            data: {
                id: req.body.id,
                nom: req.body.nom,
                description: req.body.description,
                nombreBenevoles: req.body.nombreBenevoles,
                espaceDeJeuID: req.body.espaceDeJeuID,
            },
        });
        res.status(201).json({sousEspaceDeJeu, message:`SousEspaceDeJeu ${sousEspaceDeJeu.nom} créé`, severity: "success"});
    }catch(e){
        if(e.code === "P2002"){
            // Le sousEspaceDeJeu existe déjà, on le récupère
            const sousEspaceDeJeu = await prisma.sousEspacedeJeu.findUnique({
                where: {
                    id: req.body.id
                }
            });
            res.status(400).json({ sousEspaceDeJeu,error: `SousEspaceDeJeu ${req.body.nom} déjà existant`, severity: "error"});
        }else{

            res.status(500).json({error: "Erreur lors de la création du sousEspaceDeJeu"});  
        }  
    } 
    
}