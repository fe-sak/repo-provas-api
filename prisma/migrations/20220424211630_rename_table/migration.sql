/*
  Warnings:

  - You are about to drop the `DisciplineTeacher` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DisciplineTeacher" DROP CONSTRAINT "DisciplineTeacher_disciplineId_fkey";

-- DropForeignKey
ALTER TABLE "DisciplineTeacher" DROP CONSTRAINT "DisciplineTeacher_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "tests" DROP CONSTRAINT "tests_disciplineTeacherId_fkey";

-- DropTable
DROP TABLE "DisciplineTeacher";

-- CreateTable
CREATE TABLE "disciplinesTeachers" (
    "id" SERIAL NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "disciplineId" INTEGER NOT NULL,

    CONSTRAINT "disciplinesTeachers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "disciplinesTeachers" ADD CONSTRAINT "disciplinesTeachers_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplinesTeachers" ADD CONSTRAINT "disciplinesTeachers_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_disciplineTeacherId_fkey" FOREIGN KEY ("disciplineTeacherId") REFERENCES "disciplinesTeachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
