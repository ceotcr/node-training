import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';
import { Student } from './student/student.entity';
import { Course } from './course/course.entity';

@Module({
  imports: [UsersModule, AuthModule, TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'database.sqlite',
    autoLoadEntities: true,
    synchronize: true,
    entities: [Student, Course]
  }), StudentModule, CourseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
