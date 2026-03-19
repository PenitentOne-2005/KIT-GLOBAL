import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import ProjectsService from './projects.service';
import ProjectsController from './projects.controller';
import { Project, ProjectSchema } from './project.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    AuthModule,
  ],
  providers: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
