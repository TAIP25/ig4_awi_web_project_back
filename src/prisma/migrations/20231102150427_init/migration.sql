-- CreateTable
CREATE TABLE "Benevole" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "pseudo" TEXT NOT NULL,
    "tailleTShirt" TEXT,
    "vegetarien" BOOLEAN,
    "hebergement" TEXT,
    "gameFavori" INTEGER,
    "picture" INTEGER,
    "associationID" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Benevole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Benevole_email_key" ON "Benevole"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Benevole_pseudo_key" ON "Benevole"("pseudo");
