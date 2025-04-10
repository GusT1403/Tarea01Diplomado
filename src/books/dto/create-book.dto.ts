import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength } from "class-validator";

export class CreateBookDto {

    @ApiProperty({
        description: 'Book title',
        example: 'The Lord of the Rings',
    })
    @IsNotEmpty({ message: 'Title cannot be empty' })
    @IsString({ message: 'Title must be a string' })
    @MaxLength(120, { message: 'Title must be less than 120 characters' })
    title: string;
    @ApiProperty({
        description: 'Book ISBN',
        example: '978-3-16-148410-0',
    })
    @IsNotEmpty({ message: 'ISBN cannot be empty' })
    @IsString({ message: 'ISBN must be a string' })
    @MaxLength(20, { message: 'ISBN must be less than 20 characters' })
    isbn: string;

    @ApiPropertyOptional({
        description: 'Book publisher',
        example: 'George Allen & Unwin',
    })
    @IsOptional()
    @IsString({ message: 'Publisher must be a string' })
    @MaxLength(60, { message: 'Publisher must be less than 60 characters' })    
    publisher: string;

    @ApiPropertyOptional({
        description: 'Book publication year',
        example: 1954,
    })
    @IsOptional()
    @IsNumber({}, { message: 'PublicationYear must be a date' })
    publication_year: number;

    @ApiPropertyOptional({
        description: 'Book genre',
        example: 'Fantasy',
    })
    @IsOptional()
    @IsString({ message: 'Genre must be a string' })
    @MaxLength(60, { message: 'Genre must be less than 60 characters' })
    genre: string;

    @IsOptional()
    @IsString({ message: 'CreatedBy must be a string' })
    createdBy: string;

    @ApiProperty({
        description: 'Author ID',
        example: 1,
    })
    @IsNumber({}, { message: 'AuthorId must be a number' })
    @IsPositive({ message: 'AuthorId must be a positive number' })
    author_id: number;
}
