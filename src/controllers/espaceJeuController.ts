import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient();


//===================================//
//========== GET REQUESTS ==========//
//===================================//

// GET - Récupérer tous les espacesDeJeu
export const getAllEspacesDeJeu = async (_:Request, res:Response) => {
    try{
        const espacesDeJeu = await prisma.espaceDeJeu.findMany();
        res.status(200).json(espacesDeJeu);
    }catch(e){
        res.status(500).json({error: "Erreur lors de la récupération des espaces de jeu"});
    }
}

// GET - Récupérer tous les espacesDeJeu d'un festival
export const getEspacesDeJeuByFestivalId = async (req:Request, res:Response) => {
    try{
        const espacesDeJeu = await prisma.espaceDeJeu.findMany({
            where: {
                festivalID: parseInt(req.params.id)
            }
        });
        res.status(200).json(espacesDeJeu);
    }catch(e){
        res.status(500).json({error: "Erreur lors de la récupération des espaces de jeu"});
    }
}

// GET - Récupérer un espaceDeJeu par son ID
export const getEspaceDeJeuById = async (req:Request, res:Response) => {
    try{
        const espaceDeJeu = await prisma.espaceDeJeu.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });
        res.status(200).json(espaceDeJeu);
    }catch(e){
        res.status(500).json({error: "Erreur lors de la récupération de l'espace de jeu"});
    }
}

//===================================//
//========== POST REQUESTS ==========//
//===================================//


//=== Create EspaceDeJeu ===//
export const createEspaceDeJeu = async (req:Request, res:Response) => {
    

    try{
        // Create espaceDeJeu according to the model above
        const espaceDeJeu = await prisma.espaceDeJeu.create({
            data: {
                nom: req.body.nom,
                description: req.body.description,
                festivalID: req.body.festivalID,
            },
        });
        res.status(201).json({espaceDeJeu, message:`Espace ${espaceDeJeu.nom} créé`, severity: "success"});
    }catch(e){
        if(e.code === "P2002"){
            // L'espace de jeu existe déjà, on le récupère
            const espaceDeJeu = await prisma.espaceDeJeu.findUnique({
                where: {
                    nom: req.body.nom
                }
            });

            res.status(400).json({espaceDeJeu , error: `Espace ${req.body.nom} déjà existant`, severity: "error"});
                
            
        }else{
            res.status(500).json({error: "Erreur lors de la création de l'espace de jeu"});  
        }  
    }
}


