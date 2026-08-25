import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, UseGuards, Delete } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteStatusDto } from './dto/update-quote-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get('config')
  getConfig() {
    return this.quotesService.getConfig();
  }

  @Post()
  create(@Body() createQuoteDto: CreateQuoteDto) {
    return this.quotesService.create(createQuoteDto);
  }

  // --- Admin Endpoints ---

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'moderator')
  @Get()
  findAll() {
    return this.quotesService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'moderator')
  @Put(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuoteStatusDto: UpdateQuoteStatusDto,
  ) {
    return this.quotesService.updateStatus(id, updateQuoteStatusDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'moderator')
  @Post('config/event-types')
  createEventType(@Body() data: any) {
    return this.quotesService.createEventType(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'moderator')
  @Delete('config/event-types/:id')
  deleteEventType(@Param('id') id: string) {
    return this.quotesService.deleteEventType(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'moderator')
  @Post('config/guest-counts')
  createGuestCount(@Body() data: any) {
    return this.quotesService.createGuestCount(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'moderator')
  @Delete('config/guest-counts/:id')
  deleteGuestCount(@Param('id') id: string) {
    return this.quotesService.deleteGuestCount(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'moderator')
  @Post('config/food-preferences')
  createFoodPreference(@Body() data: any) {
    return this.quotesService.createFoodPreference(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'moderator')
  @Delete('config/food-preferences/:id')
  deleteFoodPreference(@Param('id') id: string) {
    return this.quotesService.deleteFoodPreference(id);
  }
}
