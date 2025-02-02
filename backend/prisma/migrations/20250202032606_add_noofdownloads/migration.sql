-- CreateTable
CREATE TABLE "UsersTable" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "lastvisit" TIMESTAMP(3) NOT NULL,
    "noofdownloads" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UsersTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedbackTable" (
    "id" SERIAL NOT NULL,
    "username" INTEGER NOT NULL,
    "fullname" TEXT NOT NULL,

    CONSTRAINT "feedbackTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedbackQueTable" (
    "id" SERIAL NOT NULL,
    "feedbackId" INTEGER NOT NULL,
    "que" TEXT NOT NULL,
    "outof" INTEGER NOT NULL,
    "scored" INTEGER,
    "feedback" TEXT,

    CONSTRAINT "feedbackQueTable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UsersTable_username_key" ON "UsersTable"("username");

-- AddForeignKey
ALTER TABLE "feedbackTable" ADD CONSTRAINT "feedbackTable_username_fkey" FOREIGN KEY ("username") REFERENCES "UsersTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedbackQueTable" ADD CONSTRAINT "feedbackQueTable_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "feedbackTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
