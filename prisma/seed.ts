import { PrismaClient } from '@prisma/client'

import benevoleData from './benevoleData'
import creneauHoraireData from './creneauHoraireData';

const prisma = new PrismaClient()

async function addBenevole() {

    const startDate = new Date("2023-01-01");
    const endDate = new Date("2023-11-01");
    let error : number = 0;

    const benevoleDataFinal = benevoleData.map((item: { nom: string; prenom: string; email: string; password: string; pseudo: string; }) => ({
        nom: item.nom,
        prenom: item.prenom,
        email: item.email,
        password: item.password,
        pseudo: item.pseudo,
        createdAt: new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())),
    }));

    for (const b of benevoleDataFinal) {
        try {
            await prisma.benevole.create({
                data: b,
            })
        }
        catch (e) {
            error++;
        }
    }
    console.log(`Seeding of benevole finished with ${error} errors and ${benevoleDataFinal.length - error} success.`)
}

async function addCreneauHoraire() {

    let error : number = 0;

    for (const c of creneauHoraireData) {
        try {
            await prisma.creneauHoraire.create({
                data: c,
            })
        } catch (e) {
            error++;
        }
    }
    console.log(`Seeding of creneauHoraire finished with ${error} errors and ${creneauHoraireData.length - error} success.`)
}

async function main() {
    console.log(`Start seeding ...`)
    await addBenevole();
    await addCreneauHoraire();
    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })