import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubjectsModule } from './subjects/subjects.module';
import { SubtopicsModule } from './subtopics/subtopics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SubjectsModule,
    SubtopicsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
