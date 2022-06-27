/*
  Warnings:

  - A unique constraint covering the columns `[teacherId,disciplineId]` on the table `disciplinesTeachers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "disciplinesTeachers_teacherId_disciplineId_key" ON "disciplinesTeachers"("teacherId", "disciplineId");
