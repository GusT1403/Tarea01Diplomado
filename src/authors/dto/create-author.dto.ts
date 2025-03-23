import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateAuthorDto {
    @ApiProperty({
        description: 'Author name',
        example: 'J.R.R. Tolkien',
    })
    @IsNotEmpty({message: 'The name field is required'})
    @IsString({message: 'The name field must be a string'})
    @MaxLength(120, {message: 'The name field must be less than 120 characters'})
    name: string;

    @ApiProperty({
        description:'Authors nationality',
        example: 'British',
    })
    @IsOptional()
    @IsString({message: 'The nationality field must be a string'})
    @MaxLength(60, {message: 'Nationality field must be less than 60 characters'})
    nationality: string;

    @ApiProperty({
        description: 'Authors birth date',
        example: '1892-01-03',
    })
    @IsOptional()
    @IsString({message: 'The birth_date field must be a string'})
    birth_date: Date;
}
