-- CreateEnum
CREATE TYPE "Type" AS ENUM ('INCOME', 'EXPENSE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetBook" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "BudgetBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "Type" NOT NULL DEFAULT 'EXPENSE',
    "budgetBookId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Month" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Month_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemsInMonths" (
    "itemId" TEXT NOT NULL,
    "monthId" TEXT NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "ItemsInMonths_pkey" PRIMARY KEY ("itemId","monthId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Month_slug_key" ON "Month"("slug");

-- AddForeignKey
ALTER TABLE "BudgetBook" ADD CONSTRAINT "BudgetBook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_budgetBookId_fkey" FOREIGN KEY ("budgetBookId") REFERENCES "BudgetBook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemsInMonths" ADD CONSTRAINT "ItemsInMonths_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemsInMonths" ADD CONSTRAINT "ItemsInMonths_monthId_fkey" FOREIGN KEY ("monthId") REFERENCES "Month"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
