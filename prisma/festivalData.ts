import { Prisma } from '@prisma/client'
import * as fs from 'fs';

// Ce json à été généré avec mockaroo.com
const rawData = fs.readFileSync('prisma/festivalData.json', 'utf8');

const jsonData = JSON.parse(rawData);

const festivalData: Prisma.FestivalCreateInput[] = jsonData.map((item: { edition: string; dateDebut: string; dateFin: string;}) => ({
    edition: item.edition,
    dateDebut: item.dateDebut,
    dateFin: item.dateFin,
}));


export default festivalData;