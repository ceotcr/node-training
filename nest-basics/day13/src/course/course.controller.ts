// course.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('courses')
export class CourseController {
    constructor(private readonly courseService: CourseService) { }

    @Get()
    getCourses(@Query() query: any) {
        return this.courseService.findAll(query);
    }
}
