import { IsString, IsOptional, } from 'class-validator';

export class CreatePositionDto {
    
   
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  parentId?: string;
    
}
