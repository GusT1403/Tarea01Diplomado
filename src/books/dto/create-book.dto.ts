import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Max, MaxLength } from "class-validator";

export class CreateBookDto {
    @IsNotEmpty({ message: 'Title cannot be empty' })
    @IsString({ message: 'Title must be a string' })
    @MaxLength(120, { message: 'Title must be less than 120 characters' })
    title: string;
    @IsNotEmpty({ message: 'ISBN cannot be empty' })
    @IsString({ message: 'ISBN must be a string' })
    @MaxLength(20, { message: 'ISBN must be less than 20 characters' })
    isbn: string;
    @IsOptional()
    @IsString({ message: 'Publisher must be a string' })
    @MaxLength(60, { message: 'Publisher must be less than 60 characters' })    
    publisher: string;
    @IsOptional()
    @IsNumber({}, { message: 'PublicationYear must be a date' })
    publication_year: number;
    @IsOptional()
    @IsString({ message: 'Genre must be a string' })
    @MaxLength(60, { message: 'Genre must be less than 60 characters' })
    genre: string;
    @IsNumber({}, { message: 'AuthorId must be a number' })
    @IsPositive({ message: 'AuthorId must be a positive number' })
    author_id: number;
}
