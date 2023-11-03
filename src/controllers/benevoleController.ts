import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const createBenevole = async (req, res, next) => {
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

export const getBenevole = async (req, res, next) => {
    const benevole = await prisma.benevole.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
    });
    res.json(benevole);
}

export const getBenevoles = async (req, res, next) => {
    const benevoles = await prisma.benevole.findMany();
    res.json(benevoles);
}

export const updateBenevole = async (req, res, next) => {
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

export const deleteBenevole = async (req, res, next) => {
    const benevole = await prisma.benevole.delete({
        where: {
            id: parseInt(req.params.id),
        },
    });
    res.json(benevole);
}