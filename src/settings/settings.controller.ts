import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller()
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('settings')
  getSettings() {
    return this.settingsService.getSettings();
  }

  @Get('testimonials')
  getTestimonials() {
    return this.settingsService.getApprovedTestimonials();
  }

  @Post('testimonials')
  createTestimonial(@Body() createTestimonialDto: CreateTestimonialDto) {
    return this.settingsService.createTestimonial(createTestimonialDto);
  }

  // --- Admin Endpoints ---

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'moderator')
  @Put('settings')
  updateSettings(@Body() updateSettingDto: UpdateSettingDto) {
    return this.settingsService.updateSettings(updateSettingDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'moderator')
  @Get('testimonials/all')
  getAllTestimonials() {
    return this.settingsService.getAllTestimonials();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'moderator')
  @Put('testimonials/:id/approve')
  approveTestimonial(@Param('id', ParseIntPipe) id: number) {
    return this.settingsService.approveTestimonial(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'moderator')
  @Delete('testimonials/:id')
  deleteTestimonial(@Param('id', ParseIntPipe) id: number) {
    return this.settingsService.deleteTestimonial(id);
  }
}
