import { Prisma } from '@prisma/client';

const day: string[] = ["Samedi", "Dimanche"];
const creneauHoraire: number[][] = [
	[9, 11],
	[11, 14],
	[14, 17],
	[17, 20],
	[20, 22]
];

// Produit cartésien de day et creneauHoraire
const creneauHoraireProd: { jour: string, heureDebut: number, heureFin: number }[] = day.flatMap((jour) =>
    creneauHoraire.map((horaire) => ({ jour, heureDebut: horaire[0], heureFin: horaire[1] }))
);

// Conversion en Input de CreneauHoraire
const creneauHoraireData: Prisma.CreneauHoraireCreateInput[] = creneauHoraireProd

//console.log(creneauHoraireData);

export default creneauHoraireData;