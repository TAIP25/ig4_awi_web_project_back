import { Prisma } from '@prisma/client';

const poste: string[] = [ "Accueil", "Buvette", "Lotterie", "Animation", "Restauration" ];
const description: string = "No description";

// Produit cartésien de poste et description
const posteData: Prisma.PosteCreateInput[] = poste.map((nom) => ({ nom, description, nombreBenevoles: Math.floor(Math.random() * 10) + 1, festival: { connect: { id: 1 } } }));

export default posteData;