import { DataSource } from 'typeorm';
import { Student } from './student/student.entity';
import { Course } from './course/course.entity';
import { faker } from '@faker-js/faker';

const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [Student, Course],
    synchronize: true,
});

async function seed() {
    await AppDataSource.initialize();

    const studentRepo = AppDataSource.getRepository(Student);
    const courseRepo = AppDataSource.getRepository(Course);

    await courseRepo.clear();
    await studentRepo.clear();

    const students: Student[] = [];

    for (let i = 0; i < 5; i++) {
        const student = studentRepo.create({
            name: faker.person.fullName(),
        });
        students.push(await studentRepo.save(student));
    }

    for (let i = 0; i < 25; i++) {
        const course = courseRepo.create({
            title: faker.company.catchPhrase(),
            description: faker.lorem.sentence(),
            student: students[Math.floor(Math.random() * students.length)],
        });
        await courseRepo.save(course);
    }

    console.log('✅ Seed completed.');
    process.exit();
}

seed();
