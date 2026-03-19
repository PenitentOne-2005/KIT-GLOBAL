import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateCommentDto {
  @IsMongoId()
  taskId!: string;

  @IsString()
  @IsNotEmpty()
  text!: string;
}
