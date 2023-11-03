import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient();

export const createBenevole = async (req:Request, res:Response) => {
    const benevole = await prisma.benevole.create({
        data: {
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            password: req.body.password,
            pseudo: req.body.pseudo,
        },
    });
    res.json(benevole);
}

export const getBenevole = async (req:Request, res:Response) => {
    const benevole = await prisma.benevole.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
    });
    res.json(benevole);
}

export const getBenevoles = async (_req:Request, res:Response) => {
    const benevoles = await prisma.benevole.findMany();
    res.json(benevoles);
}

export const updateBenevole = async (req:Request, res:Response) => {
    const benevole = await prisma.benevole.update({
        where: {
            id: parseInt(req.params.id),
        },
        data: {
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            password: req.body.password,
            pseudo: req.body.pseudo,
        },
    });
    res.json(benevole);
}

export const deleteBenevole = async (req:Request, res:Response) => {
    const benevole = await prisma.benevole.delete({
        where: {
            id: parseInt(req.params.id),
        },
    });
    res.json(benevole);
}