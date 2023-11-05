import { PrismaClient } from '@prisma/client'

import benevoleData from './benevoleData'

const prisma = new PrismaClient()

async function main() {
    console.log(`Start seeding ...`)

    const startDate = new Date("2023-01-01");
    const endDate = new Date("2023-11-01");

    const benevoleDataFinal = benevoleData.map((item: { nom: string; prenom: string; email: string; password: string; pseudo: string; }) => ({
        nom: item.nom,
        prenom: item.prenom,
        email: item.email,
        password: item.password,
        pseudo: item.pseudo,
        createdAt: new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())),
    }));

    for (const b of benevoleDataFinal) {
            const benevole = await prisma.benevole.create({
            data: b,
        })
        console.log(`Created benevole with id: ${benevole.id}`)
    }
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