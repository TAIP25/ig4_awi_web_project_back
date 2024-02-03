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

// Get all inscriptions with status at null
export const getInscriptionsWithStatusNull = async (_req:Request, res:Response) => {
    try{
        const inscriptions = await prisma.inscriptionBenevole.findMany({
            where: {
                status: "En attente",
            },
            include: {
                creneauHoraire: true,
                poste: true,
                benevole: true,
            },
        });
        return res.status(200).json({inscriptions, message:"Liste des inscriptions", severity: "success"});
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

// Get all number of inscriptions for a festival
export const getNbInscriptions = async (req:Request, res:Response) => {
    if(req.params.id == null){
        return res.status(400).json({error: "Champs manquants", severity: "error"});
    }
    try{
        const inscription = await prisma.inscriptionBenevole.groupBy({
            by: ['posteID', 'creneauHoraireID'],
            where: {
                festivalID: parseInt(req.params.id),
                status: {
                    in: ["En attente", "Accepté"],
                },
            },
            _count: {
                id: true,
            },
        });

        return res.status(200).json({inscription, message:"Nombre d'inscriptions récupéré", severity: "success"});
    } catch(e){
        return res.status(500).json({error: "Erreur lors de la récupération du nombre d'inscriptions", severity: "error"});
    }
}

//================ POST ================//

// Create an inscription
export const createInscription = async (req:Request, res:Response) => {
    // Check if the parameters are correctly set
    if(req.body.benevoleID == null || req.body.festivalID == null || req.body.creneauHoraireID == null || req.body.posteID == null){
        return res.status(400).json({error: "Champs manquants", severity: "error"});
    }
    // Check if the benevole has not already been accepted for this creneauHoraire and this festival
    try {
        const inscription = await prisma.inscriptionBenevole.findFirst({
            where: {
                benevoleID: req.body.benevoleID,
                festivalID: req.body.festivalID,
                creneauHoraireID: req.body.creneauHoraireID,
                status: "Accepté",
            },
        });
        if(inscription != null){
            return res.status(400).json({error: "Inscription à ce créneau à déjà été acceptée", severity: "error"});
        }
    } catch(e){
        return res.status(500).json({error: "Erreur lors de la récupération des inscriptions", severity: "error"});
    }
    // Check if the poste is not already full for this creneauHoraire and this festival
    try{
        const inscription = await prisma.inscriptionBenevole.groupBy({
            by: ['posteID', 'creneauHoraireID', 'festivalID'],
            where: {
                posteID: req.body.posteID,
                creneauHoraireID: req.body.creneauHoraireID,
                festivalID: req.body.festivalID,
            },
            _count: {
                id: true,
            },
        });

        // If the inscription is null, it means that there is no inscription for this poste at this creneauHoraire
        if(inscription[0] != null){
            const poste = await prisma.poste.findUnique({
                where: {
                    id: req.body.posteID,
                },
            });

            if(poste && poste.nombreBenevoles && inscription[0]._count.id >= poste.nombreBenevoles){
                return res.status(400).json({error: "Le poste est déjà complet", severity: "error"});
            }
        }
    } catch(e){
        return res.status(500).json({error: "Erreur lors de la récupération des inscriptions", severity: "error"});
    }
    // Create the inscription
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
        if(e.code == "P2002"){
            return res.status(400).json({error: "Inscription déjà existante", severity: "error"});
        } else {
            return res.status(500).json({error: "Erreur lors de la création de l'inscription", severity: "error"});
        }
    }
}

//================ PUT ================//

// Update an inscription
export const updateInscription = async (req:Request, res:Response) => {
	if(req.body.id == null || req.body.status == "En Attente"){
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