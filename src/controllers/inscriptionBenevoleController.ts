import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient();

//================ GET ================//
// Get all inscriptions for a festival
export const getInscriptions = async (req:Request, res:Response) => {
    if(req.params.id == null){
        return res.status(400).json({error: "Champs manquants", severity: "error"});
    }
    try{
        const inscription = await prisma.inscriptionBenevole.findMany({
            where: {
                festivalID: parseInt(req.params.id),
            },
        });
        return res.status(200).json({inscription, message:"Liste des inscriptions", severity: "success"});
    } catch(e){
        return res.status(500).json({error: "Erreur lors de la récupération des inscriptions", severity: "error"});
    }
}

// Get all inscriptions for a festival and a benevole
export const getInscriptionsByBenevole = async (req:Request, res:Response) => {
    if(req.params.id == null || req.params.benevoleId == null){
        return res.status(400).json({error: "Champs manquants", severity: "error"});
    }
    try{
        const inscription = await prisma.inscriptionBenevole.findMany({
            where: {
                festivalID: parseInt(req.params.id),
                benevoleID: parseInt(req.params.benevoleId),
            },
        });
        return res.status(200).json({inscription, message:"Liste des inscriptions", severity: "success"});
    } catch(e){
        return res.status(500).json({error: "Erreur lors de la récupération des inscriptions", severity: "error"});
    }
}

// Get all inscriptions for a festival and a poste
export const getInscriptionsByPoste = async (req:Request, res:Response) => {
    if(req.params.id == null || req.params.posteId == null){
        return res.status(400).json({error: "Champs manquants", severity: "error"});
    }
    try{
        const inscription = await prisma.inscriptionBenevole.findMany({
            where: {
                festivalID: parseInt(req.params.id),
                posteID: parseInt(req.params.posteId),
            },
        });
        return res.status(200).json({inscription, message:"Liste des inscriptions", severity: "success"});
    } catch(e){
        return res.status(500).json({error: "Erreur lors de la récupération des inscriptions", severity: "error"});
    }
}

// Get all inscriptions for a festival and a creneauHoraire
export const getInscriptionsByCreneauHoraire = async (req:Request, res:Response) => {
    if(req.params.id == null || req.params.creneauHoraireId == null){
        return res.status(400).json({error: "Champs manquants", severity: "error"});
    }
    try{
        const inscription = await prisma.inscriptionBenevole.findMany({
            where: {
                festivalID: parseInt(req.params.id),
                creneauHoraireID: parseInt(req.params.creneauHoraireId),
            },
        });
        return res.status(200).json({inscription, message:"Liste des inscriptions", severity: "success"});
    } catch(e){
        return res.status(500).json({error: "Erreur lors de la récupération des inscriptions", severity: "error"});
    }
}

// Get all inscriptions for a festival and a creneauHoraire and a poste
export const getInscriptionsByCreneauHoraireAndPoste = async (req:Request, res:Response) => {
    if(req.params.id == null || req.params.creneauHoraireId == null || req.params.posteId == null){
        return res.status(400).json({error: "Champs manquants", severity: "error"});
    }
    try{
        const inscription = await prisma.inscriptionBenevole.findMany({
            where: {
                festivalID: parseInt(req.params.id),
                creneauHoraireID: parseInt(req.params.creneauHoraireId),
                posteID: parseInt(req.params.posteId),
            },
        });
        return res.status(200).json({inscription, message:"Liste des inscriptions", severity: "success"});
    } catch(e){
        return res.status(500).json({error: "Erreur lors de la récupération des inscriptions", severity: "error"});
    }
}

// Get by id
export const getInscriptionById = async (req:Request, res:Response) => {
	if(req.params.id == null){
		return res.status(400).json({error: "Champs manquants", severity: "error"});
	}
	try{
		const inscription = await prisma.inscriptionBenevole.findUnique({
			where: {
				id: parseInt(req.params.id),
			},
		});
		return res.status(200).json({inscription, message:"Inscription récupérée", severity: "success"});
	} catch(e){
		return res.status(500).json({error: "Erreur lors de la récupération des inscriptions", severity: "error"});
	}
}

//================ POST ================//

// Create an inscription
export const createInscription = async (req:Request, res:Response) => {
    if(req.body.benevoleID == null || req.body.festivalID == null || req.body.creneauHoraireID == null || req.body.posteID == null){
        return res.status(400).json({error: "Champs manquants", severity: "error"});
    }
    try{
        const inscription = await prisma.inscriptionBenevole.create({
            data: {
                benevoleID: req.body.benevoleID,
                festivalID: req.body.festivalID,
                creneauHoraireID: req.body.creneauHoraireID,
                posteID: req.body.posteID,
            },
        });
        return res.status(200).json({inscription, message:"Création de l'inscription réussie", severity: "success"});
    }catch(e){
        return res.status(500).json({error: "Erreur lors de la création de l'inscription", severity: "error"});  
    }
}

//================ PUT ================//

// Update an inscription
export const updateInscription = async (req:Request, res:Response) => {
	if(req.body.id == null || req.body.status == null){
		return res.status(400).json({error: "Champs manquants", severity: "error"});
	}
	try{
		const inscription = await prisma.inscriptionBenevole.update({
			where: {
				id: req.body.id,
			},
			data: {
				status: req.body.status,
			},
		});
		return res.status(200).json({inscription, message:"Modification de l'inscription réussie", severity: "success"});
	}catch(e){
		return res.status(500).json({error: "Erreur lors de la modification de l'inscription", severity: "error"});  
	}
}

//================ DELETE ================//

// Delete an inscription
export const deleteInscription = async (req:Request, res:Response) => {
	if(req.params.id == null){
		return res.status(400).json({error: "Champs manquants", severity: "error"});
	}
	try{
		const inscription = await prisma.inscriptionBenevole.delete({
			where: {
				id: parseInt(req.params.id),
			},
		});
		return res.status(200).json({inscription, message:"Suppression de l'inscription réussie", severity: "success"});
	} catch(e){
		return res.status(500).json({error: "Erreur lors de la suppression de l'inscription", severity: "error"});
	}
}