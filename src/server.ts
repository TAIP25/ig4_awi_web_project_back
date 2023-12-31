import { NODE_ENV, PORT } from "./config";
import { PrismaClient } from "@prisma/client";


import app from "./app";

const prisma = new PrismaClient();

async function main() {
    await prisma.$connect();
    console.log("Database connected");
}

app.get('/', (_req: any, res: any) => {
    res.send(`Hello, we are in the ${NODE_ENV} environment`);
});

app.get('/test', async (_req: any, res: any) => {
    const benevoles = await prisma.benevole.findMany();
    res.json(benevoles);
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });