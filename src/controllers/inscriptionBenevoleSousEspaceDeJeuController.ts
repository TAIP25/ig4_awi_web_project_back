import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient();

//================ GET ================//
// Get all inscriptionBenevoleSousEspaceDeJeu with the inscription id
export const getInscriptionsBenevoleSousEspaceDeJeu = async (req: Request, res: Response) => {
    if(req.params.id === null){
        return res.status(400).json({error: "Champs manquants", severity: "error"});
    }
    try {
        const inscriptionID = parseInt(req.params.id);
        const inscriptionBenevoleSousEspaceDeJeu = await prisma.inscriptionBenevoleSousEspaceDeJeu.findMany({
            where: {
                inscriptionBenevoleID: inscriptionID
            }
        });
        return res.status(200).json(inscriptionBenevoleSousEspaceDeJeu);
    } catch (e) {
        return res.status(500).json({ message: "Error to get inscriptionBenevoleSousEspaceDeJeu" });
    }
}

//================ POST ================//
// Create a new inscriptionBenevoleSousEspaceDeJeu
export const createInscriptionBenevoleSousEspaceDeJeu = async (req: Request, res: Response) => {
    // Check if the parameters are correctly set
    if(req.body.inscriptionBenevoleID === null || req.body.sousEspaceJeuID === null){
        return res.status(400).json({error: "Champs manquants", severity: "error"});
    }
    try {
        const { inscriptionBenevoleID, sousEspaceJeuID } = req.body;
        const newInscriptionBenevoleSousEspaceDeJeu = await prisma.inscriptionBenevoleSousEspaceDeJeu.create({
            data: {
                inscriptionBenevoleID: parseInt(inscriptionBenevoleID),
                sousEspaceDeJeuID: parseInt(sousEspaceJeuID)
            }
        });
        return res.status(201).json(newInscriptionBenevoleSousEspaceDeJeu);
    } catch (e) {
        return res.status(500).json({ message: "Error to create inscriptionBenevoleSousEspaceDeJeu" });
    }
}

//================ DELETE ================//
// Delete a inscriptionBenevoleSousEspaceDeJeu
export const deleteInscriptionBenevoleSousEspaceDeJeu = async (req: Request, res: Response) => {
    if(req.params.id === null){
        return res.status(400).json({error: "Champs manquants", severity: "error"});
    }
    try {
        const id = parseInt(req.params.id);
        await prisma.inscriptionBenevoleSousEspaceDeJeu.delete({
            where: {
                id: id
            }
        });
        return res.status(200).json({ message: `InscriptionBenevoleSousEspaceDeJeu ${id} is deleted` });
    } catch (e) {
        return res.status(500).json({ message: "Error to delete inscriptionBenevoleSousEspaceDeJeu" });
    }
}
