-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "roleName" TEXT NOT NULL DEFAULT 'user',
    "deleted" DATETIME,
    CONSTRAINT "User_roleName_fkey" FOREIGN KEY ("roleName") REFERENCES "Role" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserCredentials" (
    "email" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "deleted" DATETIME,
    CONSTRAINT "UserCredentials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserGoals" (
    "carbs" REAL NOT NULL,
    "proteins" REAL NOT NULL,
    "fats" REAL NOT NULL,
    "fiber" REAL NOT NULL,
    "salt" REAL NOT NULL,
    "calories" REAL,
    "deleted" DATETIME,
    "userId" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "UserGoals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserDetails" (
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "height" REAL NOT NULL,
    "birthdate" DATETIME NOT NULL,
    "sex" REAL NOT NULL,
    "email" TEXT NOT NULL,
    "goalWeight" REAL NOT NULL,
    "deleted" DATETIME,
    "userId" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "UserDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Role" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "canDeleteUsers" BOOLEAN NOT NULL DEFAULT false,
    "canPromoteUsers" BOOLEAN NOT NULL DEFAULT false,
    "canCUDOwnFood" BOOLEAN NOT NULL DEFAULT false,
    "canCUDAnyFood" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Food" (
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "calories" REAL NOT NULL,
    "proteins" REAL NOT NULL,
    "carbs" REAL NOT NULL,
    "fats" REAL NOT NULL,
    "fiber" REAL NOT NULL,
    "salt" REAL NOT NULL,
    "imageUrl" TEXT,
    "deleted" DATETIME,
    "creatorId" TEXT NOT NULL,
    CONSTRAINT "Food_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DiaryEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "foodId" TEXT NOT NULL,
    "grams" REAL NOT NULL,
    "date" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "mealType" TEXT NOT NULL,
    "deleted" DATETIME,
    CONSTRAINT "DiaryEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "DiaryEntry_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UserCredentials_userId_key" ON "UserCredentials"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserGoals_userId_key" ON "UserGoals"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserDetails_email_key" ON "UserDetails"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserDetails_userId_key" ON "UserDetails"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Food_name_key" ON "Food"("name");
