import { Prisma } from '@prisma/client';

const festivalData: Prisma.FestivalCreateInput[] = [
    {
        edition: "festival du jeu 2024",
        dateDebut: new Date("2024-03-01")
    },
    {
        edition: "festival du jeu 2025",
        dateDebut: new Date("2025-03-01")
    },
    {
        edition: "festival du jeu 2026",
        dateDebut: new Date("2026-03-01")
    }
];

export default festivalData;