import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseBoolPipe, HttpCode, Request } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { query } from 'express';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @ApiOperation({ summary: 'Create a new author' })
  @ApiResponse({ status: 201, description: 'The author has been successfully created.'})
  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto, @Request() request) {
    return this.authorsService.create(
      createAuthorDto,
      request.user.login,
      request.user.role,
    );
  }

  @ApiOperation({ summary: 'Get all authors' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
  @ApiQuery({ name: 'relations', required: false, type: Boolean, description: 'Include books' })
  @ApiResponse({ status: 200, description: 'Return all authors.'})
  @Get()
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('relations', new DefaultValuePipe(false), ParseBoolPipe) relations: boolean,
  ) {
    return this.authorsService.findAll(page, limit, relations);
  }

  @ApiOperation({ summary: 'Get author by id' })
  @ApiParam({ name: 'id', required: true, type: Number, description: 'Author id' })
  @ApiQuery({ name: 'relations', required: false, type: Boolean, description: 'Include books' })
  @ApiResponse({ status: 200, description: 'Return the author with the specified id.'})
  @ApiResponse({ status: 404, description: 'Author not found.'})
  @Get(':id')
  findOne(
    @Param('id') id: number,
    @Query('relations', new DefaultValuePipe(false), ParseBoolPipe) relations: boolean,
  ) {
    return this.authorsService.findOne(id, relations);
  }

  @ApiOperation({ summary: 'Update author by id' })
  @ApiParam({ name: 'id', required: true, type: Number, description: 'Author id' })
  @ApiResponse({ status: 200, description: 'The author has been successfully updated.'})
  @ApiResponse({ status: 404, description: 'Author not found.'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto, @Request() request) {
    return this.authorsService.update(+id, updateAuthorDto, request.user.login, request.user.role);
  }

  @ApiOperation({ summary: 'Delete author by id' })
  @ApiParam({ name: 'id', required: true, type: Number, description: 'Author id' })
  @ApiResponse({ status: 204, description: 'The author has been successfully deleted.'})
  @ApiResponse({ status: 404, description: 'Author not found.'})
  @Delete(':id')
  @HttpCode(204)
  async remove(
    @Param('id') id: number,
    @Query('cascade', new DefaultValuePipe(false), ParseBoolPipe) cascade: boolean, @Request() request
  ) {
    await this.authorsService.remove(id, cascade, request.user.role);
  }

  @ApiOperation({ summary: 'Get books by author id' })
  @ApiParam({ name: 'id', required: true, type: Number, description: 'Author id' })
  @ApiResponse({ status: 200, description: 'Return all books by the author with the specified id.'})
  @ApiResponse({ status: 404, description: 'Author not found.'})
  @Get(':id/books')
  findBooksByAuthor(@Param('id') id: number) {
    return this.authorsService.findBooksByAuthor(id);
  }
}