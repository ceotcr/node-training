// course.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private courseRepo: Repository<Course>,
    ) { }

    async findAll(query: any) {
        const { page = 1, limit = 10, search = '', sortBy = 'id', order = 'ASC', studentId } = query;

        const qb = this.courseRepo.createQueryBuilder('course')
            .leftJoinAndSelect('course.student', 'student');

        if (search) {
            qb.andWhere('course.title LIKE :search OR course.description LIKE :search', {
                search: `%${search}%`,
            });
        }

        if (studentId) {
            qb.andWhere('student.id = :studentId', { studentId });
        }

        qb.orderBy(sortBy.includes(".") ? sortBy : `course.${sortBy}`, order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC')
            .skip((page - 1) * limit)
            .take(limit);

        const [data, total] = await qb.getManyAndCount();

        return {
            data,
            total,
            page: +page,
            limit: +limit,
        };
    }
}
