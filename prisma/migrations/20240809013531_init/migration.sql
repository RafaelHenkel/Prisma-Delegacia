-- CreateTable
CREATE TABLE "criminals" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "criminals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crimes" (
    "id" UUID NOT NULL,
    "description" VARCHAR NOT NULL,
    "criminals_id" UUID NOT NULL,

    CONSTRAINT "crimes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guns" (
    "id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "crimes_id" UUID NOT NULL,

    CONSTRAINT "guns_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "crimes" ADD CONSTRAINT "crimes_criminals_id_fkey" FOREIGN KEY ("criminals_id") REFERENCES "criminals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guns" ADD CONSTRAINT "guns_crimes_id_fkey" FOREIGN KEY ("crimes_id") REFERENCES "crimes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
