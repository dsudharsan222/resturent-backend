import { Controller, Get, Post, Put, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  // --- Admin Endpoints ---

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'moderator')
  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'moderator')
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.servicesService.update(id, updateServiceDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'moderator')
  @Patch(':id/basic-info')
  updateBasicInfo(
    @Param('id') id: string,
    @Body() basicInfo: any,
  ) {
    return this.servicesService.updateBasicInfo(id, basicInfo);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'moderator')
  @Patch(':id/benefits')
  updateBenefits(
    @Param('id') id: string,
    @Body('benefits') benefits: string[],
  ) {
    return this.servicesService.updateBenefits(id, benefits);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'moderator')
  @Patch(':id/menu-options')
  updateMenuOptions(
    @Param('id') id: string,
    @Body('menu_options') menuOptions: string[],
  ) {
    return this.servicesService.updateMenuOptions(id, menuOptions);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'moderator')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }
}
