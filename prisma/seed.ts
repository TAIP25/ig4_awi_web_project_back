import { PrismaClient } from '@prisma/client'


import benevoleData from './data/benevoleData'
import creneauHoraireData from './data/creneauHoraireData';
import festivalData from './data/festivalData';
import posteData from './data/posteData';
import bcrypt from 'bcrypt';


const prisma = new PrismaClient()

async function addBenevole() {

    const startDate = new Date("2023-01-01");
    const endDate = new Date("2023-11-01");
    let error : number = 0;

    // Add the admin before the others
    try {
        await prisma.benevole.create({
            data: {
                nom: "NOEL",
                prenom: "Sam",
                email: "sam.noel@gmail.com",
                password: bcrypt.hashSync("admin", 10),
                pseudo: "Sam",
                statut: "Admin",
                createdAt: new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())),
            }
        })
    }catch (e) {
        error++;
    }

    const benevoleDataFinal = benevoleData.map((item: { nom: string; prenom: string; email: string; password: string; pseudo: string; }) => ({
        nom: item.nom,
        prenom: item.prenom,
        email: item.email,
        password: bcrypt.hashSync(item.password, 10),
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

async function addFestival() {
    let error : number = 0;

     // Liste des festivals initialisée vide
    let festivals = [];

    for (const f of festivalData) {
        try {
            const Festival = await prisma.festival.create({
                data: {
                    edition: f.edition,
                    dateDebut: new Date(f.dateDebut),
                    dateFin: new Date(f.dateFin),
                }
            })
            festivals.push(Festival);
        } catch (e) {
            error++;
        }
    }
    console.log(`Seeding of festival finished with ${error} errors and ${festivalData.length - error} success.`)
    return festivals;
}

async function addFestivalPoste(postes: any, festivals: any){

    // Pour chaque festival et pour chaque poste, on crée une association

    let error : number = 0;
    for (const f of festivals) {
        for (const p of postes) {
            try {
                await prisma.festivalPoste.create({
                    data: {
                        festivalID: f.id,
                        posteID: p.id,
                    }
                })
            } catch (e) {
                error++;
            }
        }
    }
}


async function addInsciptionBenevole() {
    
    let error : number = 0;

    try {
        await prisma.inscriptionBenevole.create({
            data: {
                benevoleID: 1,
                festivalID: 1,
                creneauHoraireID: 1,
                posteID: 1,
            },
        })
    } catch (e) {
        console.log(e);
        error++;
    }
    
    console.log(`Seeding of inscriptionBenevole finished with ${error} errors and ${1 - error} success.`)

}

async function addPoste() {
        
    let error : number = 0;

    // Liste des postes initialisée vide
    let postes = [];

    for (const p of posteData) {
        try {
            const Poste = await prisma.poste.create({
                data: p,
            })
            postes.push(Poste);
        } catch (e) {
            error++;
        }
    }
    console.log(`Seeding of poste finished with ${error} errors and ${posteData.length - error} success.`)
    return postes;
}


async function main() {
    console.log(`Start seeding ...`)

    await addCreneauHoraire();
    


    if(process.env.NODE_ENV === "development") {
        
        await addBenevole();

        const festivals =  await addFestival();

        const postes = await addPoste();

        await addFestivalPoste(postes, festivals);

        await addInsciptionBenevole();

    } else { console.log("\x1b[31m", "[WARNING] Skipping some seeds in production mode.") }

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