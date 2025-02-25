import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Author } from 'src/authors/entities/author.entity';
import { Repository } from 'typeorm';


@Injectable()
export class BooksService {

  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) {}

  private async findOneBook(id: number, relations = false): Promise<Book> {
    const book = await this.booksRepository.findOne({
      where: { id },
      relations: { author: relations ? true : false,},
      select: { author: { id: true, name: true}}
    });
    if (!book) {
      throw new NotFoundException(`Book #${id} not found`);
    }
    return book;
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const existsAuthor = await this.authorsRepository.exists({
      where: { id: createBookDto.author_id }
     });
    if (!existsAuthor) {
      throw new ConflictException(`Author #${createBookDto.author_id} not found`);
    }
    return this.booksRepository.save(createBookDto);
  }

  async findAll(page = 1, limit = 10, relations = false): Promise<{ data: Book[]; total: number; limit: number; page: number; }> {
    const [data, total] = await this.booksRepository.findAndCount({
      skip: page > 0 ? (page - 1) * limit : 0,
      take: limit,
      select: { id: true, title: true, isbn: true, publication_year: true, genre: true, author: { id: true, name: true } },
      relations: { author: relations ? true : false },
    });
    return { data, total, limit, page };
  }

  findOne(id: number, relations: boolean): Promise<Book> {
    return this.findOneBook(id, relations);
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOneBook(id);

    if (updateBookDto.title != null){
      book.title = updateBookDto.title;
    }
    if (updateBookDto.isbn != null){
      book.isbn = updateBookDto.isbn;
    }
    if (updateBookDto.publisher != null){
      book.publisher = updateBookDto.publisher;
    }
    if (updateBookDto.publication_year != null){
      book.publication_year = updateBookDto.publication_year;
    }
    if (updateBookDto.genre != null){
      book.genre = updateBookDto.genre;
    }
    if (updateBookDto.author_id != null){
      const existsAuthor = await this.authorsRepository.exists({
        where: { id: updateBookDto.author_id }
      });
      if (!existsAuthor) {
        throw new ConflictException(`Author #${updateBookDto.author_id} not found`);
      }
      book.author_id = updateBookDto.author_id;
    }
    return this.booksRepository.save(book);
  }

  async remove(id: number) {
    const book = await this.findOneBook(id);
    return this.booksRepository.delete(id);
  }

  async findAuthor(id: number): Promise<Author> {
    const book = await this.findOneBook(id, true);
    return book.author;
  }
}
