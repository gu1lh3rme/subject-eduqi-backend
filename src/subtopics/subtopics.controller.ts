import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { SubtopicsService } from './subtopics.service';
import { CreateSubtopicDto } from './dto/create-subtopic.dto';
import { UpdateSubtopicDto } from './dto/update-subtopic.dto';

@ApiTags('subtopics')
@Controller('subtopics')
export class SubtopicsController {
  constructor(private readonly subtopicsService: SubtopicsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new subtopic' })
  @ApiResponse({ status: 201, description: 'Subtopic created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createSubtopicDto: CreateSubtopicDto) {
    return this.subtopicsService.create(createSubtopicDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all subtopics' })
  @ApiResponse({ status: 200, description: 'List of all subtopics' })
  findAll() {
    return this.subtopicsService.findAll();
  }

  @Get('subject/:subjectId')
  @ApiOperation({ summary: 'Get all subtopics for a specific subject' })
  @ApiParam({ name: 'subjectId', type: 'number', description: 'Subject ID' })
  @ApiResponse({ status: 200, description: 'List of subtopics for the subject' })
  @ApiResponse({ status: 404, description: 'Subject not found' })
  findBySubject(@Param('subjectId') subjectId: string) {
    return this.subtopicsService.findBySubject(+subjectId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a subtopic by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Subtopic ID' })
  @ApiResponse({ status: 200, description: 'Subtopic found successfully' })
  @ApiResponse({ status: 404, description: 'Subtopic not found' })
  findOne(@Param('id') id: string) {
    return this.subtopicsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a subtopic' })
  @ApiParam({ name: 'id', type: 'number', description: 'Subtopic ID' })
  @ApiResponse({ status: 200, description: 'Subtopic updated successfully' })
  @ApiResponse({ status: 404, description: 'Subtopic not found' })
  update(
    @Param('id') id: string,
    @Body() updateSubtopicDto: UpdateSubtopicDto,
  ) {
    return this.subtopicsService.update(+id, updateSubtopicDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a subtopic' })
  @ApiParam({ name: 'id', type: 'number', description: 'Subtopic ID' })
  @ApiResponse({ status: 200, description: 'Subtopic deleted successfully' })
  @ApiResponse({ status: 404, description: 'Subtopic not found' })
  remove(@Param('id') id: string) {
    return this.subtopicsService.remove(+id);
  }
}
