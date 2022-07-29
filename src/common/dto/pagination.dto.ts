import { IsNumber, IsOptional, IsPositive, Max, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(300)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1)
  offset?: number;
}
