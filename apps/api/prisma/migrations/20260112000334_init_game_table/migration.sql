-- CreateTable
CREATE TABLE "GameModel" (
    "id" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "attempts" TEXT NOT NULL,
    "lives" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameModel_pkey" PRIMARY KEY ("id")
);
