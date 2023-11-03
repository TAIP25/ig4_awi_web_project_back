import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const benevoleData: Prisma.BenevoleCreateInput[] = [
    {
        nom: 'Doe',
        prenom: 'John',
        email: 'deo.john@email.com',
        password: '1234',
        pseudo: 'JohnDoe1234',
    },
    {
        nom: 'Zack',
        prenom: 'Jack',
        email: 'zack.jack@email.com',
        password: '1234',
        pseudo: 'JackZack1234',
    },
    {
        nom: 'Aveline',
        prenom: 'Robin',
        email: 'aveline.robin@email.com',
        password: '1234',
        pseudo: 'Yasagi1234',
    },
]

async function main() {
    console.log(`Start seeding ...`)
    for (const b of benevoleData) {
            const benevole = await prisma.benevole.create({
            data: b,
        })
        console.log(`Created user with id: ${benevole.id}`)
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