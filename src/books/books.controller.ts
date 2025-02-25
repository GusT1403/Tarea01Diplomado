import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseBoolPipe, HttpCode } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('relations', new DefaultValuePipe(false), ParseBoolPipe) relations: boolean,
  ) {
    return this.booksService.findAll(page, limit, relations);
  }

  @Get(':id')
  findOne(
    @Param('id') id: number,
    @Query('relations', new DefaultValuePipe(false), ParseBoolPipe) relations: boolean,
  ) {
    return this.booksService.findOne(id, relations);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number) {
    return this.booksService.remove(id);
  }

  @Get(':id/author')
  findAuthor(@Param('id') id: number) {
    return this.booksService.findAuthor(id);
  }
}
