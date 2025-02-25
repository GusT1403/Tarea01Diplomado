import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { Book } from 'src/books/entities/book.entity';

@Injectable()
export class AuthorsService {

  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const existAuthor = await this.authorRepository.exists({
      where: { name: createAuthorDto.name}
    });
    if (existAuthor) {
      throw new ConflictException('Author already exists');
    }
    return this.authorRepository.save(createAuthorDto);
  }

async findAll(page = 1, limit = 10, relations = false): Promise<{ data: Author[], total: number, page: number, limit: number }> {
  const [data, total] = await this.authorRepository.findAndCount({
    skip: page > 0 ? (page - 1) * limit : 0,
    take: limit,
    select: { id: true, name: true, nationality: true, birth_date: true,
      books: { id: true, title: true, isbn: true, publisher: true, publication_year: true,   genre: true }},
    relations: { books: (relations ? true : false)}
  });
  return { data, total, page, limit };
}

private async findOneAuthor(id: number, relations = false): Promise<Author> {
  const author = await this.authorRepository.findOne({
    where: { id: id },
    relations: { books: (relations === true ? true : false) },
    select: { books: { id: true, title: true, isbn: true, publisher: true, publication_year: true, genre: true, } }
  });
  if (!author) {
    throw new NotFoundException('Author with Id ${id} not found');
  }
  return author;
}

  findOne(id: number, relations: boolean): Promise<Author> {
    return this.findOneAuthor(id, relations);
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const author = await this.findOneAuthor(id);
    if (updateAuthorDto.name != null) {
      author.name = updateAuthorDto.name;
    }
    if (updateAuthorDto.nationality != null) {
      author.nationality = updateAuthorDto.nationality;
    }
    if (updateAuthorDto.birth_date != null) {
      author.birth_date = updateAuthorDto.birth_date;
    }
    return this.authorRepository.save(author);
  }

  async remove(id: number, cascade: boolean) {//cascade is a boolean parameter that indicates whether to delete the author's books or not
    const author = await this.findOneAuthor(id);
    if (cascade) {
      await this.bookRepository.delete({ author });
      return this.authorRepository.delete(id);
    }
    else {
      const countBooks = await this.bookRepository.countBy({ author_id: id });
      if (countBooks > 0) {
        throw new ConflictException( { message: 'Author has books, cannot be deleted' } );
      }
      return this.authorRepository.delete(id);
    }
  }

  async findBooksByAuthor(id: number): Promise<Book[]> {
    const author = await this.findOneAuthor(id, true);
    return author.books;
  }
}
