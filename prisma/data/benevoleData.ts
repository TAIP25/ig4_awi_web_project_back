import { Prisma } from '@prisma/client'
import * as fs from 'fs';

// Ce json à été généré avec mockaroo.com
const rawData = fs.readFileSync('prisma/data/benevoleData.json', 'utf8');

const jsonData = JSON.parse(rawData);

const benevoleData: Prisma.BenevoleCreateInput[] = jsonData.map((item: { nom: string; prenom: string; email: string; password: string; pseudo: string; statut: string; }) => ({
    nom: item.nom,
    prenom: item.prenom,
    email: item.email,
    password: item.password,
    pseudo: item.pseudo,
    statut: item.statut,
}));

//console.log(benevoleData[0])

export default benevoleData;