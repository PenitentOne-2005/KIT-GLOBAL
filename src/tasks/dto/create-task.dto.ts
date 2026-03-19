import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsArray,
  IsDate,
  IsMongoId,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: 'Название задачи' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ description: 'Описание задачи' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Статус задачи',
    enum: ['todo', 'in_progress', 'done'],
  })
  @IsOptional()
  @IsEnum(['todo', 'in_progress', 'done'])
  status?: 'todo' | 'in_progress' | 'done';

  @ApiPropertyOptional({
    description: 'ID пользователя, назначенного на задачу',
  })
  @IsOptional()
  @IsMongoId()
  assigneeId?: string;

  @ApiPropertyOptional({ description: 'ID родительской задачи' })
  @IsOptional()
  @IsMongoId()
  parentTaskId?: string;

  @ApiPropertyOptional({ description: 'Теги задачи', type: [String] })
  @IsOptional()
  @IsArray()
  tags?: string[];

  @ApiPropertyOptional({
    description: 'Срок выполнения задачи',
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @IsDate()
  deadline?: Date;

  @ApiPropertyOptional({ description: 'Геолокация задачи', type: Object })
  @IsOptional()
  location?: { coordinates: number[] };
}
