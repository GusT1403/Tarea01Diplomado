import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseBoolPipe, HttpCode, Request } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({ status: 201, description: 'The books information has been successfully created.' })
  @Post()
  create(@Body() createBookDto: CreateBookDto, @Request() request) {
    return this.booksService.create({...createBookDto, createdBy: request.user.login});
  }

  @ApiOperation({ summary: 'Get all books' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'relations', required: false, type: Boolean })
  @ApiResponse({ status: 200, description: 'Return all books.' })
  @Get()
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('relations', new DefaultValuePipe(false), ParseBoolPipe) relations: boolean,
  ) {
    return this.booksService.findAll(page, limit, relations);
  }

  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiParam({ name: 'id', required: true, type: Number })
  @ApiQuery({ name: 'relations', required: false, type: Boolean })
  @ApiResponse({ status: 200, description: 'Return a book by ID.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  @Get(':id')
  findOne(
    @Param('id') id: number,
    @Query('relations', new DefaultValuePipe(false), ParseBoolPipe) relations: boolean,
  ) {
    return this.booksService.findOne(id, relations);
  }

  @ApiOperation({ summary: 'Update a book by ID' })
  @ApiParam({ name: 'id', required: true, type: Number })
  @ApiResponse({ status: 200, description: 'The book information has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto, @Request() request) {
    return this.booksService.update(+id, {...updateBookDto, updatedBy: request.user.login});
  }

  @ApiOperation({ summary: 'Remove a book by ID' })
  @ApiParam({ name: 'id', required: true, type: Number })
  @ApiResponse({ status: 204, description: 'The book has been successfully removed.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number) {
    return this.booksService.remove(id);
  }

  @ApiOperation({ summary: 'Get the author of a book by ID' })
  @ApiParam({ name: 'id', required: true, type: Number })
  @ApiResponse({ status: 200, description: 'Return the author of a book by ID.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  @Get(':id/author')
  findAuthor(@Param('id') id: number) {
    return this.booksService.findAuthor(id);
  }
}
