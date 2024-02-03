import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient();


//===================================//
//========== POST REQUESTS ==========//
//===================================//

//=== Create Jeu ===//
export const createJeu = async (req:Request, res:Response) => {
   

    try{
        // Create jeu according to the model above
        const jeu = await prisma.jeu.create({
            data: {
                id: req.body.id,
                nom: req.body.nom,
                auteur: req.body.auteur,
                editeur: req.body.editeur,
                nombreJoueurs: req.body.nombreJoueurs,
                ageMin: req.body.ageMin,
                duree: req.body.duree,  
                type: req.body.type,
                notice: req.body.notice,
                recu: req.body.recu,
                aAnimer: req.body.aAnimer,
            },
        });
        res.status(201).json({jeu, message:`Jeu ${jeu.nom} créé`, severity: "success"});
    }catch(e){
        if(e.code === "P2002"){
            // Le jeu existe déjà, on le récupère
            const jeu = await prisma.jeu.findUnique({
                where: {
                    nom: req.body.nom
                }
            });
            res.status(400).json({jeu, error: `Jeu ${req.body.nom} déjà existant`, severity: "error"});
                
            
        }else{
            res.status(500).json({error: "Erreur lors de la création du jeu"});  
        }
    }
}


//=== Update Jeu ===//
export const updateJeu = async (req:Request, res:Response) => {
    try{
        const jeu = await prisma.jeu.update({
            where: {
                id: req.body.id,
            },
            data: {
                nom: req.body.nom,
                auteur: req.body.auteur,
                editeur: req.body.editeur,
                nombreJoueurs: req.body.nombreJoueurs,
                ageMin: req.body.ageMin,
                duree: req.body.duree,  
                type: req.body.type,
                notice: req.body.notice,
                recu: req.body.recu,
                aAnimer: req.body.aAnimer,
            },
        });
        res.status(200).json({jeu, message:`Jeu ${jeu.nom} modifié`, severity: "success"});
    }catch(e){
        res.status(500).json({error: "Erreur lors de la modification du jeu"});  
    }
}



