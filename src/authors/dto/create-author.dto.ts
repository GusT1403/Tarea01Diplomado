import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateAuthorDto {
    @IsNotEmpty({message: 'The name field is required'})
    @IsString({message: 'The name field must be a string'})
    @MaxLength(120, {message: 'The name field must be less than 120 characters'})
    name: string;

    @IsOptional()
    @IsString({message: 'The nationality field must be a string'})
    @MaxLength(60, {message: 'Nationality field must be less than 60 characters'})
    nationality: string;

    @IsOptional()
    @IsString({message: 'The birth_date field must be a string'})
    birth_date: Date;
}
